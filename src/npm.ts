import { Arguments, CommandModule } from 'yargs'

export default class Npm {
  static getCommand(): CommandModule {
    return {
      command: ['$0', 'npm'],
      describe: 'Update packages for an npm repository',
      handler: async (argv: Arguments) => {
        console.log('TEST NPM!')
      },
    }
  }
}
