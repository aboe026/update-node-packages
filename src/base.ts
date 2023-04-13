import { Arguments } from 'yargs'
import fs from 'fs/promises'
import path from 'path'

import Option, { GROUP } from './option'

export default class Base {
  static async getPackageJson(directory: string): Promise<PackageJson> {
    const file = Base.getPackageJsonFilePath(directory)
    const contents = await fs.readFile(file)
    let packageJson
    try {
      packageJson = JSON.parse(contents.toString())
    } catch (err: unknown) {
      throw Error(`Could not parse "${file}" as JSON: ${err}`)
    }
    return packageJson
  }

  static async setPackageJson(directory: string, packageJson: PackageJson): Promise<void> {
    const filePath = Base.getPackageJsonFilePath(directory)
    await fs.writeFile(filePath, JSON.stringify(packageJson, null, 2))
  }

  private static getPackageJsonFilePath(directory: string): string {
    return path.join(directory, 'package.json')
  }

  static getBooleanArgument(argv: Arguments, option: Option): boolean | undefined {
    let argument
    if (option.value && option.value.alias) {
      for (const alias of option.value.alias) {
        const potentialArg = argv[alias]
        if (potentialArg !== undefined && typeof potentialArg === 'boolean') {
          argument = potentialArg
        }
      }
    }
    if (option.key) {
      const potentialArg = argv[option.key]
      if (potentialArg !== undefined && typeof potentialArg === 'boolean') {
        argument = potentialArg
      }
    }
    return argument
  }
}

export const BaseOptions = {
  Install: new Option({
    key: 'install',
    value: {
      alias: 'i',
      description: 'Whether or not package updates should be installed',
      type: 'boolean',
      default: true,
      demandOption: false,
      requiresArg: false,
      group: GROUP.Globals,
    },
  }),
}

export interface PackageJson {
  dependencies?: {
    [key: string]: string
  }
  devDependencies?: {
    [key: string]: string
  }
  [key: string]: object | string | boolean | undefined
}
