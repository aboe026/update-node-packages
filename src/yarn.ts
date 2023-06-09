import { Arguments, CommandModule } from 'yargs'

export default class Yarn {
  static getCommand(): CommandModule {
    return {
      command: ['yarn'],
      describe: 'Update packages for a project with Yarn as the package manager',
      handler: async (argv: Arguments) => {
        console.log('TEST Yarn!')
      },
    }
  }
}
