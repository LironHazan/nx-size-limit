# Nx SizeLimit Plugin

An easy way to plug [size-limit](https://github.com/ai/size-limit) into your nx powered projects.

> Size Limit is a performance budget tool for JavaScript. It checks every commit on CI, calculates the real cost of your JS for end-users and throws an error if the cost exceeds the limit.

### install plugin

```
npm install -D nx-size-limit
```

### Install size-limit presets

```
npm install -D size-limit @size-limit/preset-app
```

** [Read Usage section](https://github.com/ai/size-limit#usage)

## Usage

### Configure size-limit

```
nx g nx-size-limit:add --name=your-project
```
A new `.size-limit.json` config will be generated in your project root folder:

```json
[{ "path": ["../../dist/apps/your-project/main*.js"], "limit": "300 kB" }]
```

Read more on the configuration options [here](https://github.com/ai/size-limit#limits-config).

Additional executor will be added to project.json config:

```json
    "size-limit": {
      "executor": "nx-size-limit:size-limit"
    }
```
### Run a limit check
```
nx run your-project:size-limit
```

## Credits

This plugin wouldn't be possible without the great teams behind these projects:

- [size-limit](https://github.com/ai/size-limit) - Calculate the real cost to run your JS app or lib to keep good performance. Show error in pull request if the cost exceeds the limit.
- [Nrwl](https://github.com/nrwl) - The team behind [Nx](https://github.com/nrwl/nx)

Please show them your support! ❤️
