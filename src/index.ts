import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'

import Npm from './npm'
import Yarn from './yarn'

//
;(async () => {
  try {
    await yargs(hideBin(process.argv))
      .scriptName('update-packages')
      .command(Npm.getCommand())
      .command(Yarn.getCommand()).argv
  } catch (err: unknown) {
    console.error(err)
    process.exit(1)
  }
})()
