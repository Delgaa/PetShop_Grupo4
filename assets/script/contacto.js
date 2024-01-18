const buttonEnviar = document.getElementById('buttonEnviar');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const telefono = document.getElementById('telefono');
const mascotaSelect =document.getElementById('mascota')

buttonEnviar.addEventListener('click', e => {
    if (nombre.value === "" || apellido.value === "" || telefono.value === "" || mascotaSelect.value === "") {
        alert("Por favor, complete con sus datos de contacto.");
    } else {
        alert("Enviamos correctamente la información proporcionada. En breve nos pondremos en contacto con usted. ¡Gracias, que tenga buen día!");
    }
});