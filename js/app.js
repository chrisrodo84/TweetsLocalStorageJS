//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Llamados por acción
eventListeners();
function eventListeners() {
    //Agregar tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cargar contenido de local storage
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();
    
    //Tomar contenido del tweet
    const tweet = document.querySelector('#tweet').value;
    //Validar contenido
    if (tweet === '') {
        mostrarError('El tweet no puede publicarse sin contenido');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Si hay contenido se agrega el tweet al arreglo
    tweets = [...tweets, tweetObj];
    
    //Crear HTML y reiniciar el formulario
    crearHTML();
    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}