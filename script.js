// Efectos de animación para las tarjetas de bots
document.querySelectorAll('.bot-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Añadir efecto de parpadeo a las etiquetas de estado
setInterval(() => {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.style.opacity = tag.style.opacity === '0.7' ? '1' : '0.7';
    });
}, 1000);

// Efectos extras de desplazamiento
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Efecto parallax para elementos con clase parallax
    document.querySelectorAll('.bot-card').forEach((element, index) => {
        const speed = 0.05;
        const yPos = -(scrollY * speed * (index * 0.1 + 1));
        element.style.backgroundPosition = `center ${yPos}px`;
    });
});

// Validación del formulario
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const asunto = document.getElementById('asunto');
        const mensaje = document.getElementById('mensaje');
        
        // Validación simple
        if (nombre.value.trim() === '') {
            isValid = false;
            nombre.style.borderColor = 'red';
        } else {
            nombre.style.borderColor = '';
        }
        
        if (email.value.trim() === '' || !email.value.includes('@')) {
            isValid = false;
            email.style.borderColor = 'red';
        } else {
            email.style.borderColor = '';
        }
        
        if (asunto.value.trim() === '') {
            isValid = false;
            asunto.style.borderColor = 'red';
        } else {
            asunto.style.borderColor = '';
        }
        
        if (mensaje.value.trim() === '') {
            isValid = false;
            mensaje.style.borderColor = 'red';
        } else {
            mensaje.style.borderColor = '';
        }
        
        if (!isValid) {
            e.preventDefault();
            showNotification('Por favor, completa todos los campos correctamente');
        } else {
            // Mostrar mensaje de éxito pero permitir que el formulario se envíe
            setTimeout(() => {
                showNotification('¡Mensaje enviado con éxito!');
            }, 500);
        }
    });
}

// Botones de compra con efecto de confirmación
document.querySelectorAll('.btn-style').forEach(btn => {
    if (btn.textContent.includes('Comprar')) {
        btn.addEventListener('click', function(e) {
            if (!confirm('¿Estás seguro de que deseas comprar este bot?')) {
                e.preventDefault();
            }
        });
    }
});

// Contador de visitantes simulado (para demo)
const visitCounter = localStorage.getItem('visitCounter') || 0;
localStorage.setItem('visitCounter', parseInt(visitCounter) + 1);

// Seguimiento de tiempo en la página
let startTime = new Date().getTime();
setInterval(() => {
    const currentTime = new Date().getTime();
    const timeOnPage = Math.floor((currentTime - startTime) / 1000);
    
    // Si hay un contador de tiempo, actualizarlo
    const timeElement = document.getElementById('tiempoEnPagina');
    if (timeElement) {
        let hours = Math.floor(timeOnPage / 3600);
        let minutes = Math.floor((timeOnPage % 3600) / 60);
        let seconds = timeOnPage % 60;
        
        let formattedTime = '';
        if (hours > 0) {
            formattedTime += `${hours}h `;
        }
        if (minutes > 0 || hours > 0) {
            formattedTime += `${minutes}m `;
        }
        formattedTime += `${seconds}s`;
        
        timeElement.textContent = formattedTime;
    }
}, 1000);

// Función para aplicar un tema oscuro/claro (toggle)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    
    // Si quisieras implementar un tema claro, aquí añadirías los estilos
    if (body.classList.contains('light-theme')) {
        showNotification('Tema claro activado');
    } else {
        showNotification('Tema oscuro activado');
    }
}

// Cargar precios desde una API (simulado)
function cargarPrecios() {
    // En una implementación real, esto sería una llamada fetch
    const precios = {
        'Bot de Moderación': '24.99€',
        'Bot de Música': '19.99€',
        'Bot Personalizado': 'Desde 49.99€',
        'Bot Mini-Moderación': '9.99€',
        'Bot de Eventos': '14.99€',
        'Bot de Niveles': '12.99€',
        'Bot de Roleplay': '29.99€',
        'Bot de Sorteos': '11.99€',
        'Bot de Tickets': '15.99€'
    };
    
    // Actualizar cada precio
    document.querySelectorAll('.bot-card').forEach(card => {
        const titulo = card.querySelector('h2').textContent;
        const precioElement = card.querySelector('.precio');
        
        if (precios[titulo]) {
            precioElement.textContent = precios[titulo];
            // Efecto visual para mostrar que se actualizó
            precioElement.classList.add('pulse-value');
            setTimeout(() => {
                precioElement.classList.remove('pulse-value');
            }, 2000);
        }
    });
    
    showNotification('Precios actualizados');
}

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    checkVisibility();
    
    // Simular carga de precios después de 3 segundos
    setTimeout(cargarPrecios, 3000);
});

// Función para compartir en redes sociales
function compartir(red) {
    const url = encodeURIComponent(window.location.href);
    const titulo = encodeURIComponent(document.title);
    let shareUrl = '';
    
    switch(red) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${titulo}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${titulo} ${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank');
    }
}
