import fs from 'fs-extra'
import path from 'path'

import config from './util/e2e-config'
import executeAsync from '../../src/exec-async'
import { DependencyType, E2ePackageJson, replace, rimraf } from './util/e2e-packages'

describe('Npm', () => {
  describe('implicit install option', () => {
    describe('no later version', () => {
      it('does not change package json or install if regular dependency does not have updates', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.latest,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
          },
          expectedInstall: false,
        })
      })
      it('does not change package json or install if dev dependency does not have updates', async () => {
        await testNpm({
          dependencies: {
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.latest,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          expectedInstall: false,
        })
      })
      it('does not change package json or install if regular and dev dependency do not have updates', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.latest,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.latest,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          expectedInstall: false,
        })
      })
    })
    describe('update available', () => {
      it('changes package json and installs if regular dependency has updates', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.older,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
          },
          expectedInstall: true,
        })
      })
      it('changes package json and installs if dev dependency has updates', async () => {
        await testNpm({
          dependencies: {
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.older,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          expectedInstall: true,
        })
      })
      it('changes package json and installs if regular and dev dependencies have updates', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.older,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.older,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          expectedInstall: true,
        })
      })
    })
  })
  describe('explicit install option false', () => {
    const options = '--install=false'
    describe('no later version', () => {
      it('does not change package json or install if regular dependency does not have update and install option is false', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.latest,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
          },
          options,
          expectedInstall: false,
        })
      })
      it('does not change package json or install if dev dependency does not have update and install option is false', async () => {
        await testNpm({
          dependencies: {
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.latest,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          options,
          expectedInstall: false,
        })
      })
      it('does not change package json or install if regular and dev dependency do not have updates and install option is false', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.latest,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.latest,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          options,
          expectedInstall: false,
        })
      })
    })
    describe('update available', () => {
      it('changes package json but does not install if regular dependency has update and install option is false', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.older,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.older,
              },
            ],
          },
          options,
          expectedInstall: false,
        })
      })
      it('changes package json but does not install if dev dependency has update and install option is false', async () => {
        await testNpm({
          dependencies: {
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.older,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.older,
              },
            ],
          },
          options,
          expectedInstall: false,
        })
      })
      it('changes package json but does not install if regular and dev dependencies have update and install option is false', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.older,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.older,
              },
            ],
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.older,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.older,
              },
            ],
          },
          options,
          expectedInstall: false,
        })
      })
    })
  })
  describe('explicit install option true', () => {
    const options = '--install=true'
    describe('no later version', () => {
      it('does not change package json or install if regular dependency does not have update and install option is true', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.latest,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
          },
          options,
          expectedInstall: false,
        })
      })
      it('does not change package json or install if dev dependency does not have update and install option is true', async () => {
        await testNpm({
          dependencies: {
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.latest,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          options,
          expectedInstall: false,
        })
      })
      it('does not change package json or install if regular or dev dependencies do not have updates and install option is true', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.latest,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.latest,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          options,
          expectedInstall: false,
        })
      })
    })
    describe('update available', () => {
      it('changes package json and installs if regular dependency has update and install option is true', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.older,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
          },
          options,
          expectedInstall: true,
        })
      })
      it('changes package json and installs if dev dependency has update and install option is true', async () => {
        await testNpm({
          dependencies: {
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.older,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          options,
          expectedInstall: true,
        })
      })
      it('changes package json and installs if regular and dev dependencies have updates and install option is true', async () => {
        await testNpm({
          dependencies: {
            regular: [
              {
                ...replace,
                initialVersion: replace.older,
                expectedPackageVersion: replace.latest,
                expectedInstalledVersion: replace.latest,
              },
            ],
            dev: [
              {
                ...rimraf,
                initialVersion: rimraf.older,
                expectedPackageVersion: rimraf.latest,
                expectedInstalledVersion: rimraf.latest,
              },
            ],
          },
          options,
          expectedInstall: true,
        })
      })
    })
  })
})

async function testNpm({
  dependencies,
  options,
  expectedInstall = false,
}: {
  dependencies: TestDependencies
  options?: string
  expectedInstall: boolean
}): Promise<void> {
  const packageName = 'e2e-dummy-project'
  const packageVersion = {
    old: '0.1.0',
    new: '0.1.1',
  }
  const packageJsonPath = path.join(config.TEMP_WORK_DIR, 'package.json')
  const packageJson: E2ePackageJson = {
    name: packageName,
    version: packageVersion.old,
    scripts: {
      update: 'update-packages',
    },
  }
  if (dependencies.regular && packageJson.scripts) {
    packageJson.dependencies = {}
    for (const dependency of dependencies.regular) {
      packageJson.dependencies[dependency.name] = dependency.initialVersion
      packageJson.scripts[`${dependency.name}-${DependencyType.Regular}-version`] = dependency.versionScript
    }
  }
  if (dependencies.dev && packageJson.scripts) {
    packageJson.devDependencies = {}
    for (const dependency of dependencies.dev) {
      packageJson.devDependencies[dependency.name] = dependency.initialVersion
      packageJson.scripts[`${dependency.name}-${DependencyType.Dev}-version`] = dependency.versionScript
    }
  }
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))

  await executeAsync({
    command: 'npm install',
    options: {
      cwd: config.TEMP_WORK_DIR,
    },
  })

  // update package.json version to be able to tell if "npm install" happens (would update package-lock.json "version" property)
  packageJson.version = packageVersion.new
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))

  await verifyPackageJsonVersions(packageJson)
  await verifyInstalledVersions(dependencies, true)
  await verifyLockfileVersion(packageVersion.old)

  await executeAsync({
    command: `npm run update${options ? ` -- ${options}` : ''}`,
    options: {
      cwd: config.TEMP_WORK_DIR,
    },
  })

  // update packageJson object with new expected dependency versions to pass of to verification method
  if (dependencies.regular && packageJson.dependencies) {
    for (const dependency of dependencies.regular) {
      packageJson.dependencies[dependency.name] = dependency.expectedPackageVersion
    }
  }
  if (dependencies.dev && packageJson.devDependencies) {
    for (const dependency of dependencies.dev) {
      packageJson.devDependencies[dependency.name] = dependency.expectedPackageVersion
    }
  }

  await verifyPackageJsonVersions(packageJson)
  await verifyInstalledVersions(dependencies, false)
  await verifyLockfileVersion(expectedInstall ? packageVersion.new : packageVersion.old)
}

async function verifyPackageJsonVersions({
  dependencies,
  devDependencies,
}: {
  dependencies?: {
    [key: string]: string
  }
  devDependencies?: {
    [key: string]: string
  }
}): Promise<void> {
  const file = path.join(config.TEMP_WORK_DIR, 'package.json')
  const contents = await fs.readFile(file)
  let json
  try {
    json = JSON.parse(contents.toString())
  } catch (err: unknown) {
    throw Error(`Could not read "${file}" as JSON: ${err}`)
  }
  if (dependencies) {
    for (const packageName in dependencies) {
      expect(json).toHaveProperty(`dependencies.${packageName}`, dependencies[packageName])
    }
  }
  if (devDependencies) {
    for (const packageName in devDependencies) {
      expect(json).toHaveProperty(`devDependencies.${packageName}`, devDependencies[packageName])
    }
  }
}

async function verifyInstalledVersions(dependencies: TestDependencies, initial: boolean) {
  if (dependencies.regular) {
    for (const dependency of dependencies.regular) {
      await verifyInstalledVersion(
        dependency,
        DependencyType.Regular,
        initial ? dependency.initialVersion : dependency.expectedInstalledVersion
      )
    }
  }
  if (dependencies.dev) {
    for (const dependency of dependencies.dev) {
      await verifyInstalledVersion(
        dependency,
        DependencyType.Dev,
        initial ? dependency.initialVersion : dependency.expectedInstalledVersion
      )
    }
  }
}

async function verifyInstalledVersion(
  dependency: TestDependency,
  type: DependencyType,
  expectedVersion: string
): Promise<void> {
  const response = await executeAsync({
    command: `npm run ${dependency.name}-${type}-version`,
    options: {
      cwd: config.TEMP_WORK_DIR,
    },
  })
  const installedVersion = response.stdout.match(dependency.versionRegex)
  if (!installedVersion || installedVersion.length < 2) {
    throw Error(
      `Could not get installed version of package "${dependency.name}" from "${response.stdout}" using regex "${dependency.versionRegex}"`
    )
  }
  expect(installedVersion[1]).toEqual(expectedVersion)
}

async function verifyLockfileVersion(expectedVersion: string): Promise<void> {
  const file = path.join(config.TEMP_WORK_DIR, 'package-lock.json')
  const contents = await fs.readFile(file)
  let json
  try {
    json = JSON.parse(contents.toString())
  } catch (err: unknown) {
    throw Error(`Could not read "${file}" as JSON: ${err}`)
  }
  expect(json).toHaveProperty('version', expectedVersion)
}

interface TestDependencies {
  regular?: TestDependency[]
  dev?: TestDependency[]
}

interface TestDependency {
  name: string
  initialVersion: string
  expectedPackageVersion: string
  expectedInstalledVersion: string
  versionScript: string
  versionRegex: RegExp
}
