Thanks for your interest in contributing to this project. As an open source project, we'd appreciate any help and contributions!

## Development

Development server runs the *webpack-dev-server* which compiles assets in-memory and serve them.

```sh
  npm run dev
```
## Adding an exercise (Need to automate this process)

- Add a file to _content_ directory naming it as _exercise-name_.html
- Update _exercise-details.js_ in config directory with exercise name and its meta-data
- Run ```npm run update-dom-skeleton```
- Add a link to index.html for this exercise

## Production

It is important to build for source before releasing to production.

### Build server
```sh
  npm run build
```

### Run server
```sh
  npm run start
```

## Pull Requests

- We use [standardjs](https://standardjs.com/) style guide. This is implemented only for frontend code for now. Please follow the same style guide for server code too.
- ES6+ is used at frontend (which is transpiled using babel) but server code is still using ES5ish and Promise API (need to implement build process for this) because not everyone will have latest node version installed on their machines.
