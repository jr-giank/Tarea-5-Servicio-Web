import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCPAQS2YarepWLcrfjN1ySC2XZ_XuXbW78",
    authDomain: "servicio-web-f899f.firebaseapp.com",
    databaseURL: "https://servicio-web-f899f-default-rtdb.firebaseio.com",
    projectId: "servicio-web-f899f",
    storageBucket: "servicio-web-f899f.appspot.com",
    messagingSenderId: "293685390158",
    appId: "1:293685390158:web:606540ec2e4aff10078c1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getAllData = async () => {
    const dbRef = ref(db);
    var data = [];
    const principal = document.getElementById('contactos');

    await get(child(dbRef, 'contactos')).then((snapshot) => {

        snapshot.forEach(element => {
            data.push(element.val());
        });
    });

    data.map((resultado) => {
        if (resultado.telefono !== '') {
            const nombreText = document.createElement('h4');
            const apellidoText = document.createElement('h4');
            const telefonoText = document.createElement('h4');
            const nombre = document.createElement('input');
            const apellido = document.createElement('input');
            const telefono = document.createElement('input');
            const titulo = document.createElement('h3');
            const contenedor = document.createElement('div');
            const info1 = document.createElement('div');
            const info2 = document.createElement('div');
            const info3 = document.createElement('div');

            nombreText.innerText = 'Nombre: ';
            apellidoText.innerText = 'Apellido: ';
            telefonoText.innerText = 'Telefono: ';
            nombre.value = resultado.nombre;
            apellido.value = resultado.apellido;
            telefono.value = resultado.telefono;
            titulo.innerText = 'Contacto';

            info1.appendChild(nombreText);
            info2.appendChild(apellidoText);
            info3.appendChild(telefonoText);
            info1.appendChild(nombre);
            info2.appendChild(apellido);
            info3.appendChild(telefono);
            contenedor.appendChild(titulo);
            contenedor.appendChild(info1);
            contenedor.appendChild(info2);
            contenedor.appendChild(info3);
            
            contenedor.classList.add('contenedor');
            info1.classList.add('info')
            info2.classList.add('info')
            info3.classList.add('info')

            principal.appendChild(contenedor);
        }
    })
};

window.onload = getAllData();