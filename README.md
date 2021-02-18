# suzzhome

## Project setup
```
yarn install
```
or
```
npm install
```
If you from mainland China , you may need to modify the config for faster speed.

### Compiles and hot-reloads for development
If you don't have a static server , but you want to try the SuServe right now, try this:
```
yarn serve
```
then copy the address printing in terminal to broswer and have fun. Remember that you should run suzzhomeserve to make sure there the valid files you need.

### Compiles and minifies for production
```
yarn build
```
This step can lead you to deploy production environment. For normal situation, you should run this way as fronted-end static resource. And besides suzzhomeserve , you also need to prepare a pure static server . By default , suzzhome use 'history' mode for fronted-end router. You should always keep the static server send 'index.html' for every static ask.

