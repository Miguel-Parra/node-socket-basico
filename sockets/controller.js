
// esta funcion se ejecuta cuando un cliente se conecta
const sockectController = cliente => {
    console.log('Cliente conectado', cliente.id); //el id es propio de la informacion del socket
    
    cliente.on('disconnect', () => {
        console.log('El cliente se desconecto', cliente.id);
    })

    cliente.on('enviar-mensaje', (payload, callbackFront) => {
        const id = '123456'
        callbackFront({ id, fechaGrabacion: new Date().getTime() });
        cliente.broadcast.emit('enviar-mensaje-desde-servidor', payload)
    })
}


module.exports = {
    sockectController
}