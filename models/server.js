const express = require('express');
const cors = require('cors');
const { ClientRequest } = require('http');
const { log } = require('console');
 const {sockectController} = require('../sockets/controller')

class Server {
    constructor() {
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.port = process.env.PORT;
        this.paths = {}
        // middleware
        this.middleware();
        //rutas de mi aplicación
        this.routes(); // para que configure mis rutas cuando se instancia
        // sockets
        this.sockets();
    }
    sockets() {
        this.io.on('connection', sockectController)
    }

    middleware() {
        //CORS para que todos puedan acceder y no les bloquee
        this.app.use(cors())
        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth.route'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}
module.exports = Server;