# Italo App (teste-italo)

Desafio técnico Vue.js + Quasar da Italo

## Deploy

Available on [Vercel](https://teste-italo.vercel.app/#/)

## Run docker image

```bash
docker run -d --name my-container -p 8081:80 diegobeker/italo
```

Check it out on localhost/8081

## Build docker image from this project

Clone this repository an run

```bash
docker build -t myusername/myimage:tag .
```

```bash
docker run -d --name my-container -p 8080:80 myusername/myimage:tag
```

Check it out on localhost/8080

# Run with docker compose

Clone this repository an run

```bash
docker compose up
```

To stop run

```bash
docker compose down
```


## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
```



### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
