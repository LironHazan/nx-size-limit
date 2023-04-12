# Nx SizeLimit Plugin

An easy way to plug [size-limit](https://github.com/ai/size-limit) into your nx powered projects.

Size Limit is a performance budget tool for JavaScript. It checks every commit on CI, calculates the real cost of your JS for end-users and throws an error if the cost exceeds the limit.

## install

```
npm install -D nx-size-limit
```

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

### Run a limit check
```
nx run your-project:size-limit
```
