import { Arguments, CommandModule } from 'yargs'

import Base, { BaseOptions } from './base'
import executeAsync, { ExecuteResponse, instanceOfExecutionResponse } from './exec-async'

// TODO: have "default" auto-detect npm/yarn
// TODO: have "directory" be configurable
// TODO: change repo name to "node-update-dependencies"

export default class Npm extends Base {
  static getCommand(): CommandModule {
    return {
      command: ['$0', 'npm'], // TODO: make the default "auto" (determines npm/yarn based on lock file presence - package-lock.json vs yarn.lock)
      describe: 'Update packages for a project with NPM as the package manager',
      handler: async (argv: Arguments) => {
        const directory = process.cwd()
        const packageJson = await Npm.getPackageJson(directory)
        const outdatedDependencies = await Npm.getOutdatedDependencies(directory)
        for (const packageName in outdatedDependencies) {
          const info: OutdatedDependency = outdatedDependencies[packageName]
          const currentFirstDigit = info.current.split('.')[0]
          const latestFirstDigit = info.latest.split('.')[0]
          if (latestFirstDigit > currentFirstDigit) {
            console.warn(`Major version bump for "${packageName}" - "${info.current}" to "${info.latest}"`)
          }
          if (packageJson.dependencies && packageJson.dependencies[packageName]) {
            packageJson.dependencies[packageName] = info.latest
          }
          if (packageJson.devDependencies && packageJson.devDependencies[packageName]) {
            packageJson.devDependencies[packageName] = info.latest
          }
        }
        await Npm.setPackageJson(directory, packageJson)
        const install = Npm.getBooleanArgument(argv, BaseOptions.Install)
        if (install && Object.keys(outdatedDependencies).length > 0) {
          await executeAsync({
            command: 'npm install',
          })
        }
      },
    }
  }

  static async getOutdatedDependencies(directory: string): Promise<OutdatedDependenciesList> {
    let response: ExecuteResponse
    try {
      response = await executeAsync({
        command: 'npm outdated --json',
        options: {
          cwd: directory,
        },
        outputToConsoleLive: true,
      })
    } catch (err: unknown) {
      if (instanceOfExecutionResponse(err) && err.stderr === '' && err.stdout) {
        // due to "npm outdated" exiting with non-zero exit code if there are outdated packages
        // see https://github.com/npm/rfcs/issues/473
        response = err
      } else {
        throw new Error(`Error executing 'npm outdated --json' command: ${err}`)
      }
    }
    if (response.stderr) {
      throw new Error(`Error executing 'npm outdated --json' command: ${JSON.stringify(response, null, 2)}`)
    }
    let outdatedJson
    try {
      outdatedJson = JSON.parse(response.stdout)
    } catch (err: unknown) {
      throw new Error(`Error parsing outdated as JSON: ${err}`)
    }
    return outdatedJson
  }
}

interface OutdatedDependenciesList {
  [key: string]: OutdatedDependency
}

interface OutdatedDependency {
  current: string
  wanted: string
  latest: string
  location: string
}
