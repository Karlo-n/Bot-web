// Archivo script.js para manejar las redirecciones de compra

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de compra
    const botonesCompra = document.querySelectorAll('button:contains("Comprar")');
    const botonesCarta = document.querySelectorAll('button:contains("Consultar")');
    
    // PayPal URL base - Usando tu enlace de PayPal.me
    const basePayPalUrl = 'https://www.paypal.me/BaciliaAlvarez/';
    
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
    
    // Función para agregar el evento de clic a los botones de compra
    botonesCompra.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Encontrar el título del bot (h2 más cercano dentro de la tarjeta)
            const card = this.closest('.bot-card');
            const titulo = card.querySelector('h2').textContent;
            
            // Verificar si tenemos el precio para este bot
            if (precios[titulo]) {
                // Extraer el precio del bot
                const precio = precios[titulo];
                
                // Guardar información del producto en localStorage para usarla después
                localStorage.setItem('ultimaCompra', JSON.stringify({
                    producto: titulo,
                    precio: precio + '€',
                    timestamp: new Date().toISOString()
                }));
                
                // Redireccionar a PayPal.me con el monto específico
                window.location.href = basePayPalUrl + precio;
                
                // Configurar un temporizador para redirigir a la página de instrucciones después
                // (ya que PayPal.me no tiene opciones de Return URL como los botones tradicionales)
                localStorage.setItem('redirigirAInstrucciones', 'true');
                
            } else {
                console.error('No se encontró precio para:', titulo);
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
    
    // Añadir un botón de confirmación después de pago
    const paginaPrincipal = 'index.html';
    
    // Verificar si estamos en la página principal y si hay una compra pendiente
    if (window.location.pathname.includes(paginaPrincipal) || localStorage.getItem('redirigirAInstrucciones') === 'true') {
        // Recuperar información de la compra
        const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra') || '{}');
        
        if (ultimaCompra.producto && localStorage.getItem('redirigirAInstrucciones') === 'true') {
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
                document.body.removeChild(modal);
                // Redireccionar a la página de instrucciones
                window.location.href = paginaInstrucciones;
            });
            
            // Evento para el botón de cancelación
            document.getElementById('cancelar-pago').addEventListener('click', function() {
                localStorage.removeItem('redirigirAInstrucciones');
                localStorage.removeItem('ultimaCompra');
                document.body.removeChild(modal);
            });
        }
    }
});

// Función auxiliar para seleccionar botones por texto (similar a jQuery :contains)
NodeList.prototype.filter = Array.prototype.filter;
HTMLCollection.prototype.filter = Array.prototype.filter;

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// Definición personalizada de querySelectorAll para filtrar por texto contenido
if (!document.querySelectorAll.contains) {
    document.querySelectorAll = function(selector) {
        if (selector.includes(':contains')) {
            // Extraer el texto buscado
            const regex = /:contains\("([^"]+)"\)/;
            const match = selector.match(regex);
            if (match && match[1]) {
                const textToFind = match[1];
                const baseSelector = selector.replace(/:contains\("([^"]+)"\)/, '');
                
                // Obtener todos los elementos que coinciden con el selector base
                const allElements = document.querySelectorAll(baseSelector);
                
                // Filtrar por los que contienen el texto
                return Array.from(allElements).filter(el => el.textContent.includes(textToFind));
            }
        }
        
        // Comportamiento normal si no hay :contains
        return document.querySelectorAll(selector);
    };
}
