document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("contactForm");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario recargue la página

        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const asunto = document.getElementById("asunto").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Validación básica
        if (!nombre || !email || !asunto || !mensaje) {
            alert("⚠️ Por favor, completa todos los campos antes de enviar.");
            return;
        }

        // URL del webhook de Discord (Cambia esto por uno nuevo si ya lo expusiste públicamente)
        const webhookURL = "https://discord.com/api/webhooks/1345247192151232562/GR_ZBmWUZUqU9_6Z4bD43dJDOeuPmEXj9hyyxEOnda7iJVh9b0Y2mTEZyl3nFt2z9FKI";

        // Construcción del mensaje para Discord
        const data = {
            embeds: [{
                title: `📩 Nueva consulta: ${asunto}`,
                color: 10181046, // Color púrpura
                fields: [
                    { name: "👤 Nombre", value: nombre, inline: true },
                    { name: "📧 Email", value: email, inline: true },
                    { name: "📝 Mensaje", value: mensaje }
                ],
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
                alert("✅ ¡Mensaje enviado correctamente! Pronto nos pondremos en contacto.");
                formulario.reset(); // Limpiar el formulario
            } else {
                alert("⚠️ mensaje. Inténtalo de nuevo más tarde.");
            }
        })
        .catch(error => {
            console.error("Error al enviar:", error);
            alert("⚠️ Ocurrió un error inesperado. Revisa la consola para más detalles.");
        });
    });
});
