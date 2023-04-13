import fs from 'fs-extra'

import config from './e2e-config'
import E2ePackages, { getLatestVersion, Package } from './e2e-packages'

/**
 * Scoped to test files (suites)
 * beforeAll -> runs at the beginning of each test file (suite)
 * beforeEach -> runs at the beginning of each test in each test file (suite)
 * afterEach -> runs at the end of each test in each test file (suite)
 * afterAll -> runs at the end of each test file (suite)
 */

beforeAll(async () => {
  for (const packageName of Object.keys(E2ePackages)) {
    const e2ePackage: Package = (E2ePackages as any)[packageName] // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!e2ePackage.latest) {
      e2ePackage.latest = await getLatestVersion(e2ePackage.name)
    }
  }
})

beforeEach(async () => {
  await fs.remove(config.TEMP_WORK_DIR)
  await fs.ensureDir(config.TEMP_WORK_DIR)
})

afterEach(async () => {
  await fs.remove(config.TEMP_WORK_DIR)
})
