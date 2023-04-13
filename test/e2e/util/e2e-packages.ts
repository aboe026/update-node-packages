import executeAsync from '../../../src/exec-async'
import { PackageJson } from '../../../src/base'

export const rimraf: Package = {
  name: 'rimraf',
  older: '4.4.1',
  latest: '',
  versionScript: 'rimraf --help',
  versionRegex: /rimraf version (\S+)/,
}

export const replace: Package = {
  name: 'replace-in-file',
  older: '6.3.4',
  latest: '',
  versionScript: 'replace-in-file --version',
  versionRegex: /^(\d+.\d+.\d+)$/m,
}

export default {
  rimraf,
  replace,
}

export interface Package {
  name: string
  latest: string
  older: string
  versionScript: string
  versionRegex: RegExp
}

export async function getLatestVersion(packageName: string): Promise<string> {
  const response = await executeAsync({
    command: `npm view ${packageName} version`,
  })
  return response.stdout.trim()
}

export interface E2ePackageJson extends PackageJson {
  scripts?: {
    [key: string]: string
  }
}

export enum DependencyType {
  Regular = 'regular',
  Dev = 'dev',
}
