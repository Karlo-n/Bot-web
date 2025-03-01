// Modifica tu función de envío de formulario así:
const formularioContacto = document.getElementById('contactForm');  
if (formularioContacto) {  
    formularioContacto.addEventListener('submit', function(e) {  
        e.preventDefault(); // Evitamos que el formulario se envíe normalmente  
          
        // Obtenemos los valores de los campos  
        const nombre = document.getElementById('nombre').value;  
        const email = document.getElementById('email').value;  
        const asunto = document.getElementById('asunto').value;  
        const mensaje = document.getElementById('mensaje').value;  
          
        // Construimos el mensaje para Discord  
        const data = {  
            // Contenido simple para asegurar que funciona
            content: `Nueva consulta de ${nombre} (${email})`,
            // Mantén los embeds para información detallada
            embeds: [{  
                title: 'Nueva consulta: ' + asunto,  
                color: 10181046, // Color púrpura en decimal  
                fields: [  
                    {  
                        name: 'Nombre',  
                        value: nombre,  
                        inline: true  
                    },  
                    {  
                        name: 'Email',  
                        value: email,  
                        inline: true  
                    },  
                    {  
                        name: 'Mensaje',  
                        value: mensaje  
                    }  
                ],  
                footer: {  
                    text: 'Enviado desde la Tienda de Bots Premium'  
                },  
                timestamp: new Date().toISOString()  
            }]  
        };  
        
        // SOLUCIÓN 1: Usar una API proxy gratuita para evitar problemas de CORS
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        
        // Enviamos el mensaje al webhook a través del proxy  
        fetch(proxyUrl + webhookURL, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest', // Necesario para algunos servicios proxy
            },  
            body: JSON.stringify(data),  
        })  
        .then(response => {  
            if (response.ok) {  
                // Mensaje enviado correctamente  
                alert('¡Mensaje enviado correctamente! Pronto nos pondremos en contacto contigo.');  
                formularioContacto.reset(); // Limpiamos el formulario  
            } else {  
                // Error al enviar
                console.error('Error en la respuesta:', response.status);
                // Intentar con solución alternativa
                usarSolucionAlternativa(data);
            }  
        })  
        .catch(error => {  
            // Error de red  
            console.error('Error:', error);  
            // Intentar con solución alternativa
            usarSolucionAlternativa(data);  
        });  
    });  
}

// SOLUCIÓN 2: Alternativa si el proxy falla
function usarSolucionAlternativa(data) {
    // Alternativa: Usar un servidor intermediario propio
    // Puedes mostrar esto como forma de depuración
    console.log("Intentando solución alternativa");
    console.log("Datos que se enviarían:", JSON.stringify(data, null, 2));
    
    // Opciones:
    // 1. Redirigir a una página de procesamiento
    // const formData = new URLSearchParams();
    // formData.append('payload_json', JSON.stringify(data));
    // window.location.href = 'send-to-discord.php?' + formData.toString();
    
    // 2. Mostrar instrucciones al usuario
    alert('Estamos experimentando problemas para enviar tu mensaje. Por favor, contáctanos directamente por Discord o WhatsApp (los enlaces están en el pie de página).');
}
