# egg-swagger-ui

[swagger-ui](https://github.com/swagger-api/swagger-ui) plugin for egg.

## Information

+ swagger-ui 3.0.6

## Usage

First, install it:

```sh
npm install -S egg-swagger-ui
```

Import it via `config/plugin.js`:

```js
module.exports = {
  ...

  'swagger-ui': {
    enable: true,
    package: 'egg-swagger-ui'
  }

  ...
}
```

Configure it via `config/config.<env>.js`:

```js
module.export = {
  swaggerUi: {
    mountPath: '<routePath>'
    swaggerFile: '/path/to/swaggerFile'
  }
}
```

Default value:

+ `routePath`: `/docs`
+ `swaggerFile`: `assets/default-swagger.yaml` the example swagger file bundled with egg-swagger-ui

## License

MIT
