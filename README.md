# Crear Música

Ingresá las notas musicales y los patrones transforma el archivo .mid a .mp3 utilizando el emulador Yamaha Opl3

### Actualizaciones al 28/09/2018

- [Agregado] Libreria Emulador Yamaha Opl3

- [Agregado] Borrar de la base de datos y tambien borra los archivos generados (.mid y .mp3)

- [Agregado] Tasa de muestreo. Ejemplo: 49700Hz

### Instalación

Libreria utilizada [Scribbletune](https://scribbletune.com/)

Tener instalado [Node.js](https://nodejs.org/). [MongoDb](https://www.google.com) y [Node-GYP](https://github.com/nodejs/node-gyp)

Instalar las dependencias, tener ejecutado instancia mongod y ejecutar el server:

```sh
$ npm install -g node-gyp
$ crear carpeta public/
$ npm install
$ npm start
```

#### Base de Datos

```
notes
pattern
arch
```

### Demo

![Imgur](https://i.imgur.com/XAwjL06.png)

![Imgur](https://i.imgur.com/XZ0gKbG.png)

![Imgur](https://i.imgur.com/xWjfU3w.png)