# update-node-packages

Tool used to update npm or yarn packages

## Use

To be documented.

## Development

### Prerequisites

- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [VSCode](https://code.visualstudio.com/)

  - To enable [Editor SDK](https://yarnpkg.com/getting-started/editor-sdks), run

    ```sh
    yarn dlx @yarnpkg/sdks vscode
    ```

    Then in TypeScript file, simultaneously press

    `ctrl` + `shift` + `p`

    and choose option

    `Select TypeScript Version`

    then select value

    `Use Workspace Version`

### Install

To install dependencies, run

```sh
yarn install
```

### Start

To run code from non-built source code, run

```sh
yarn start
```

### Watch

To automatically restart the app on file changes, run

```sh
yarn watch
```

### Build

To build the source code into transpiled javascript, run

```sh
yarn build
```

### Clean

To remove any previously built code, run

```sh
yarn clean
```

### Run

To run transpiled javascript bundles, run:

```sh
yarn run-built
```

or directly with

```sh
node executable.js
```

Or through the `bin` command with

```sh
update-packages
```

### Lint

to check code for programmatic or stylistic problems, run

```sh
yarn lint
```

To automatically fix problems, run

```sh
yarn lint-fix
```

### Upgrade Yarn

To upgrade the version of yarn used in the project, run

```sh
yarn set version latest
```

then [install](#install) to have the change picked up.
