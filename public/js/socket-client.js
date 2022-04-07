//referencias HTML
const idOnline = document.querySelector('#idOnline');
const idOffline = document.querySelector('#idOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
    console.log('Conectado');
    idOffline.hidden = true;
    idOnline.hidden = false;

})

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    idOffline.hidden = false;
    idOnline.hidden = true;
    // idOffline.style.display = '';
    // idOnline.style.display = 'none';
})

socket.on('enviar-mensaje-desde-servidor', (mensaje) => {
    console.log(mensaje);
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '12jncsnd',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload, (objeto) => {
        console.log('Respuesta directa desde el servidor:', objeto);
    })
})