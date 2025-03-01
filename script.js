document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ El script se ha cargado correctamente."); // Verificar que el script se ejecuta

    const formulario = document.getElementById("contactForm");

    if (!formulario) {
        console.error("❌ ERROR: No se encontró el formulario con id='contactForm'. Verifica tu HTML.");
        return;
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que la página se recargue

        console.log("📩 Formulario enviado.");

        // Obtener el mensaje del formulario
        const mensaje = document.getElementById("mensaje")?.value.trim();

        if (!mensaje) {
            alert("⚠️ Por favor, escribe un mensaje antes de enviar.");
            console.error("❌ ERROR: El campo de mensaje está vacío.");
            return;
        }

        console.log("✍️ Mensaje capturado:", mensaje);

        // URL del webhook de Discord (Asegúrate de cambiarlo si lo expusiste públicamente)
        const webhookURL = "https://discord.com/api/webhooks/1345247192151232562/GR_ZBmWUZUqU9_6Z4bD43dJDOeuPmEXj9hyyxEOnda7iJVh9b0Y2mTEZyl3nFt2z9FKI";

        // Construcción del mensaje para Discord
        const data = {
            embeds: [{
                title: "📩 Nuevo Mensaje",
                description: mensaje,
                color: 10181046, // Color púrpura
                footer: { text: "Enviado desde la Tienda de Bots Premium" },
                timestamp: new Date().toISOString()
            }]
        };

        console.log("📡 Enviando datos al webhook...", data);

        // Enviar mensaje al webhook
        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log("🔍 Respuesta del servidor:", response);
            if (response.ok) {
                alert("✅ ¡Mensaje enviado correctamente!");
                formulario.reset(); // Limpiar el formulario
            } else {
                alert("⚠️ Error al enviar el mensaje. Inténtalo de nuevo más tarde.");
                console.error("❌ ERROR: El servidor respondió con un estado no exitoso.", response.status);
            }
        })
        .catch(error => {
            console.error("❌ ERROR: Fallo en la solicitud Fetch:", error);
            alert("⚠️ Error inesperado. Revisa la consola.");
        });
    });
});
