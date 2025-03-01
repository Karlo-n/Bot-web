// Precios para cada producto (en euros)
const precios = {
    'Bot de Moderación': 24.99,
    'Bot de Música': 19.99,
    'Bot Personalizado': 49.99,
    'Bot Mini-Moderación': 9.99,
    'Bot de Eventos': 14.99,
    'Bot de Niveles': 12.99
};

// URL de la página de instrucciones post-pago
const paginaInstrucciones = 'instrucciones.html';

// URL base de PayPal
const basePayPalUrl = 'https://www.paypal.me/BaciliaAlvarez/';

// URL del webhook de Discord
const webhookURL = 'https://discord.com/api/webhooks/1345247192151232562/GR_ZBmWUZUqU9_6Z4bD43dJDOeuPmEXj9hyyxEOnda7iJVh9b0Y2mTEZyl3nFt2z9FKI';

// Función para enviar mensajes al webhook de Discord
function enviarADiscord(data) {
    return fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar el mensaje a Discord');
        }
        return response;
    });
}

// Documento cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tienda de Bots cargada correctamente');

    // Animaciones al hacer scroll  
    const observer = new IntersectionObserver((entries) => {  
        entries.forEach(entry => {  
            if (entry.isIntersecting) {  
                entry.target.classList.add('visible');  
            }  
        });  
    }, {threshold: 0.1});  

    document.querySelectorAll('.animate-on-scroll, .animate-in-left, .animate-in-right').forEach(el => {  
        observer.observe(el);  
    });  
    
    // Verificar si hay una compra pendiente  
    if (localStorage.getItem('redirigirAInstrucciones') === 'true') {  
        // Recuperar información de la compra  
        const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra') || '{}');  
        
        if (ultimaCompra.producto) {  
            // Crear un modal de confirmación  
            const modal = document.createElement('div');  
            modal.style.position = 'fixed';  
            modal.style.top = '0';  
            modal.style.left = '0';  
            modal.style.width = '100%';  
            modal.style.height = '100%';  
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';  
            modal.style.display = 'flex';  
            modal.style.justifyContent = 'center';  
            modal.style.alignItems = 'center';  
            modal.style.zIndex = '9999';  
            
            const contenido = document.createElement('div');  
            contenido.style.backgroundColor = '#1a1a1a';  
            contenido.style.padding = '30px';  
            contenido.style.borderRadius = '15px';  
            contenido.style.maxWidth = '500px';  
            contenido.style.textAlign = 'center';  
            contenido.style.boxShadow = '0 0 20px rgba(255, 0, 255, 0.8)';  
            
            contenido.innerHTML = `  
                <h2 style="color:#ff00ff;margin-bottom:20px;">Confirmación de Pago</h2>  
                <p style="margin-bottom:15px;font-size:18px;">¿Has completado el pago de <strong>${ultimaCompra.producto}</strong> por <strong>${ultimaCompra.precio}</strong>?</p>  
                <button id="confirmar-pago" style="background:linear-gradient(135deg,#ff00ff,#0000ff);color:white;border:none;padding:10px 20px;border-radius:5px;margin-right:15px;cursor:pointer;">Sí, he pagado</button>  
                <button id="cancelar-pago" style="background:#333;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;">No, cancelar</button>  
            `;  
            
            modal.appendChild(contenido);  
            document.body.appendChild(modal);  
            
            // Evento para el botón de confirmación  
            document.getElementById('confirmar-pago').addEventListener('click', function() {  
                localStorage.removeItem('redirigirAInstrucciones');  
                
                // Enviar notificación de pago confirmado a Discord
                const datosCompra = {
                    embeds: [{
                        title: '¡Nueva compra completada!',
                        color: 3066993, // Color verde en decimal
                        fields: [
                            {
                                name: 'Producto',
                                value: ultimaCompra.producto,
                                inline: true
                            },
                            {
                                name: 'Precio',
                                value: ultimaCompra.precio,
                                inline: true
                            },
                            {
                                name: 'Fecha',
                                value: new Date().toLocaleString('es-ES'),
                                inline: true
                            }
                        ],
                        footer: {
                            text: 'Compra realizada en la Tienda de Bots Premium'
                        },
                        timestamp: new Date().toISOString()
                    }]
                };
                
                enviarADiscord(datosCompra)
                    .then(() => {
                        console.log('Notificación de compra enviada a Discord');
                        document.body.removeChild(modal);
                        // Redireccionar a la página de instrucciones
                        window.location.href = paginaInstrucciones;
                    })
                    .catch(error => {
                        console.error('Error al enviar notificación a Discord:', error);
                        // Continuar con la redirección a pesar del error
                        document.body.removeChild(modal);
                        window.location.href = paginaInstrucciones;
                    });
            });  
            
            // Evento para el botón de cancelación  
            document.getElementById('cancelar-pago').addEventListener('click', function() {  
                localStorage.removeItem('redirigirAInstrucciones');  
                localStorage.removeItem('ultimaCompra');  
                document.body.removeChild(modal);  
            });  
        }  
    }  
    
    // Manejo del formulario de contacto  
    const formularioContacto = document.getElementById('contactForm');  
    if (formularioContacto) {  
        formularioContacto.addEventListener('submit', function(e) {  
            e.preventDefault(); // Evitamos que el formulario se envíe normalmente  
            
            // Obtenemos los valores de los campos  
            const nombre = document.getElementById('nombre').value;  
            const email = document.getElementById('email').value;  
            const asunto = document.getElementById('asunto').value;  
            const mensaje = document.getElementById('mensaje').value;  
            
            // Verificamos que todos los campos necesarios estén completados
            if (!nombre || !email || !mensaje) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Mostramos indicador de carga
            const botonEnviar = formularioContacto.querySelector('button[type="submit"]');
            if (botonEnviar) {
                botonEnviar.disabled = true;
                botonEnviar.textContent = 'Enviando...';
            }
            
            // Construimos el mensaje para Discord  
            const data = {  
                embeds: [{  
                    title: 'Nueva consulta: ' + (asunto || 'Sin asunto'),
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
            
            // Enviamos el mensaje al webhook usando nuestra función
            enviarADiscord(data)
                .then(() => {
                    // Mensaje enviado correctamente  
                    alert('¡Mensaje enviado correctamente! Pronto nos pondremos en contacto contigo.');  
                    formularioContacto.reset(); // Limpiamos el formulario
                })  
                .catch(error => {  
                    // Error de red  
                    console.error('Error:', error);  
                    alert('Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');  
                })
                .finally(() => {
                    // Restauramos el botón
                    if (botonEnviar) {
                        botonEnviar.disabled = false;
                        botonEnviar.textContent = 'Enviar Mensaje';
                    }
                });  
        });  
    }

});

// Funciones para los botones
function comprarBot(boton) {
    // Encontrar la tarjeta padre
    const card = boton.closest('.bot-card');
    if (!card) {
        console.error('No se encontró la tarjeta de bot');
        return;
    }

    // Obtener el título del bot
    const titulo = card.querySelector('h2')?.textContent;
    if (!titulo) {
        console.error('No se encontró el título del bot');
        return;
    }
    
    console.log('Comprando: ' + titulo);

    // Obtener el precio  
    const precio = precios[titulo];  
    if (!precio) {  
        console.error('No se encontró precio para:', titulo);  
        alert('Error al procesar la compra. Por favor, inténtalo de nuevo o contáctanos.');  
        return;  
    }  
    
    // Enviar notificación de intento de compra a Discord
    const datosIntento = {
        embeds: [{
            title: '¡Nuevo intento de compra!',
            color: 16750848, // Color naranja en decimal
            fields: [
                {
                    name: 'Producto',
                    value: titulo,
                    inline: true
                },
                {
                    name: 'Precio',
                    value: precio + '€',
                    inline: true
                },
                {
                    name: 'Estado',
                    value: 'Redirigido a PayPal',
                    inline: true
                }
            ],
            footer: {
                text: 'Intento de compra en la Tienda de Bots Premium'
            },
            timestamp: new Date().toISOString()
        }]
    };
    
    // Enviar la notificación
    enviarADiscord(datosIntento)
        .then(() => {
            console.log('Notificación de intento de compra enviada a Discord');
        })
        .catch(error => {
            console.error('Error al enviar notificación de intento:', error);
        })
        .finally(() => {
            // Guardar información del producto  
            localStorage.setItem('ultimaCompra', JSON.stringify({  
                producto: titulo,  
                precio: precio + '€',  
                timestamp: new Date().toISOString()  
            }));  
            
            // Redireccionar a PayPal  
            window.location.href = basePayPalUrl + precio;  
            
            // Marcar para mostrar la confirmación al regresar  
            localStorage.setItem('redirigirAInstrucciones', 'true');
        });
}

function consultarBot(boton) {
    const card = boton.closest('.bot-card');
    if (!card) return;
    
    const titulo = card.querySelector('h2')?.textContent || 'Producto desconocido';
    console.log('Consultando sobre: ' + titulo);

    // Enviar notificación de consulta a Discord
    const datosConsulta = {
        embeds: [{
            title: 'Nueva consulta de producto',
            color: 3447003, // Color azul en decimal
            fields: [
                {
                    name: 'Producto consultado',
                    value: titulo
                },
                {
                    name: 'Acción',
                    value: 'Usuario redirigido a página de contacto personalizado'
                }
            ],
            footer: {
                text: 'Consulta desde la Tienda de Bots Premium'
            },
            timestamp: new Date().toISOString()
        }]
    };
    
    // Enviar la notificación y luego redireccionar
    enviarADiscord(datosConsulta)
        .then(() => {
            console.log('Notificación de consulta enviada a Discord');
        })
        .catch(error => {
            console.error('Error al enviar notificación de consulta:', error);
        })
        .finally(() => {
            // Redireccionar a la página de contacto personalizado  
            window.location.href = 'contacto-personalizado.html';
        });
}

function verInfo(boton) {
    const card = boton.closest('.bot-card');
    if (!card) return;
    
    const titulo = card.querySelector('h2')?.textContent || 'Producto desconocido';
    alert('Información sobre ' + titulo + '\nPróximamente más detalles sobre este bot.');
}

function verDemo(boton) {
    const card = boton.closest('.bot-card');
    if (!card) return;
    
    const titulo = card.querySelector('h2')?.textContent || 'Producto desconocido';
    
    // Enviar notificación de solicitud de demo a Discord
    const datosSolicitudDemo = {
        embeds: [{
            title: 'Nueva solicitud de demostración',
            color: 10181046, // Color púrpura en decimal
            fields: [
                {
                    name: 'Producto',
                    value: titulo
                }
            ],
            footer: {
                text: 'Solicitud de demo desde la Tienda de Bots Premium'
            },
            timestamp: new Date().toISOString()
        }]
    };
    
    // Enviar la notificación
    enviarADiscord(datosSolicitudDemo)
        .then(() => {
            console.log('Notificación de solicitud de demo enviada a Discord');
            alert('Demo de ' + titulo + '\nContacta con nosotros para programar una demostración en vivo.');
        })
        .catch(error => {
            console.error('Error al enviar notificación de demo:', error);
            alert('Demo de ' + titulo + '\nContacta con nosotros para programar una demostración en vivo.');
        });
}

function verOfertas() {
    alert('Próximamente: Catálogo de ofertas especiales\nUsa el código PREMIUM25 al realizar tu compra para obtener un 20% de descuento.');
}

function verPaquetes() {
    alert('Próximamente: Paquetes con descuentos especiales\nCombina varios bots y ahorra hasta un 35%.');
}
