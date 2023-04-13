
<div align="center">
<h1>  Nx SizeLimit Plugin </h1>
An easy way to plug 
<a href="https://github.com/ai/size-limit">size-limit</a>
into your nx powered projects.
  <p dir="auto">
    <a href="https://www.npmjs.org/package/nx-size-limit">
      <img src="https://img.shields.io/npm/v/nx-size-limit?style=flat" alt="Nx Ngrok package on NPM" />
    </a>
    <a href="https://www.npmjs.org/package/nx-size-limit">
      <img src="https://img.shields.io/npm/dm/nx-size-limit" alt="Nx Ngrok package downloads on NPM" aria-hidden="true" />
    </a>

[//]: # (    <a href="https://sonarcloud.io/summary/new_code?id=domjtalbot_nx-size-limit">)

[//]: # (      <img src="https://sonarcloud.io/api/project_badges/measure?project=domjtalbot_nx-size-limit&metric=alert_status" alt="SonarCloud Quality Gate Status" aria-hidden="true" />)

[//]: # (    </a>)
  </p>

</div>

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
