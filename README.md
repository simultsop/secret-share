# secret-share

A simple use case example using CloudFlare platform as the backend for a SPA made developed Vue 3 in Vite.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run pages:dev
```

### Deploy to cloudflare instantly

Considering you have already installed ```wrangler``` and did log in into your CloudFlare account using ```wrangler login```.

```sh
npm run pages:deploy
```

### Binding KV into the page functions

In order that functions to be able to reach a CloudFlare KV, you would need to bind it like explained here: https://developers.cloudflare.com/pages/functions/bindings/, in this project we bound with namespace kv, as it was used ```env.get(publickey)```.
