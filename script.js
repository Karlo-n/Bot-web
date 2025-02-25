// Archivo script.js para manejar las redirecciones de compra

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de compra
    const botonesCompra = document.querySelectorAll('button:contains("Comprar")');
    const botonesCarta = document.querySelectorAll('button:contains("Consultar")');
    
    // PayPal URLs - Reemplaza con tus enlaces de PayPal reales
    const urlsPayPal = {
        'Bot de Moderación': 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TU_ID_MODERACION',
        'Bot de Música': 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TU_ID_MUSICA',
        'Bot Personalizado': 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TU_ID_PERSONALIZADO',
        'Bot Mini-Moderación': 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TU_ID_MINI_MOD',
        'Bot de Eventos': 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TU_ID_EVENTOS',
        'Bot de Niveles': 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TU_ID_NIVELES'
    };
    
    // URL de la página de instrucciones post-pago
    const paginaInstrucciones = 'instrucciones.html';
    
    // Función para agregar el evento de clic a los botones de compra
    botonesCompra.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Encontrar el título del bot (h2 más cercano dentro de la tarjeta)
            const card = this.closest('.bot-card');
            const titulo = card.querySelector('h2').textContent;
            
            // Verificar si tenemos una URL de PayPal para este bot
            if (urlsPayPal[titulo]) {
                // Guardar información del producto en localStorage para usarla después
                localStorage.setItem('ultimaCompra', JSON.stringify({
                    producto: titulo,
                    precio: card.querySelector('.precio').textContent,
                    timestamp: new Date().toISOString()
                }));
                
                // Redireccionar a PayPal
                window.location.href = urlsPayPal[titulo];
                
                // Nota: La redirección a la página de instrucciones debe hacerse desde PayPal 
                // mediante la configuración de "Return URL" en tu cuenta de PayPal
            } else {
                console.error('No se encontró URL de PayPal para:', titulo);
                alert('Error al procesar la compra. Por favor, inténtalo de nuevo o contáctanos.');
            }
        });
    });
    
    // Manejar botones de consulta (para bots personalizados)
    botonesCarta.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Redireccionar directamente a un formulario de contacto específico
            window.location.href = 'contacto-personalizado.html';
        });
    });
    
    // Detectar retorno desde PayPal
    if (new URLSearchParams(window.location.search).get('paypal_return') === 'success') {
        // Recuperar información de la compra
        const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra') || '{}');
        
        if (ultimaCompra.producto) {
            // Mostrar mensaje de éxito y redireccionar a instrucciones
            alert(`¡Gracias por comprar ${ultimaCompra.producto}! Serás redirigido a las instrucciones.`);
            window.location.href = paginaInstrucciones;
        }
    }
});

// Función auxiliar para seleccionar botones por texto (similar a jQuery :contains)
NodeList.prototype.filter = Array.prototype.filter;
HTMLCollection.prototype.filter = Array.prototype.filter;

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!document.querySelectorAll.contains) {
    document.querySelectorAll.contains = function(text) {
        const elements = document.querySelectorAll('button');
        return elements.filter(element => element.textContent.includes(text));
    };
}
