document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("contactForm");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario recargue la página

        // Obtener el mensaje
        const mensaje = document.getElementById("mensaje").value.trim();

        // Validación: No permitir enviar mensajes vacíos
        if (!mensaje) {
            alert("⚠️ Por favor, escribe un mensaje antes de enviar.");
            return;
        }

        // URL del webhook de Discord (Asegúrate de cambiarlo si lo expusiste)
        const webhookURL = "https://discord.com/api/webhooks/1345247192151232562/GR_ZBmWUZUqU9_6Z4bD43dJDOeuPmEXj9hyyxEOnda7iJVh9b0Y2mTEZyl3nFt2z9FKI";

        // Construcción del mensaje para Discord
        const data = {
            embeds: [{
                title: "📩 Nuevo Mensaje",
                description: mensaje,
                color: 10181046, // Púrpura
                footer: { text: "Enviado desde la Tienda de Bots Premium" },
                timestamp: new Date().toISOString()
            }]
        };

        // Enviar mensaje al webhook
        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert("✅ ¡Mensaje enviado correctamente!");
                formulario.reset(); // Limpiar el formulario
            } else {
                alert("⚠️ Error al enviar el mensaje. Inténtalo de nuevo más tarde.");
            }
        })
        .catch(error => {
            console.error("Error al enviar:", error);
            alert("⚠️ Error inesperado. Revisa la consola.");
        });
    });
});
