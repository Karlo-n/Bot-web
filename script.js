document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script cargado correctamente.");

    const formulario = document.getElementById("contactForm");

    if (!formulario) {
        console.error("❌ ERROR: No se encontró el formulario con id='contactForm'.");
        return;
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita recargar la página
        console.log("📩 Botón presionado. Enviando mensaje...");

        // Capturar el mensaje
        const mensaje = document.getElementById("mensaje")?.value.trim();

        if (!mensaje) {
            alert("⚠️ Por favor, escribe un mensaje antes de enviar.");
            console.error("❌ ERROR: Campo de mensaje vacío.");
            return;
        }

        console.log("✍️ Mensaje capturado:", mensaje);

        // Webhook de Discord (Cámbialo si lo expusiste públicamente)
        const webhookURL = "https://discord.com/api/webhooks/1345247192151232562/GR_ZBmWUZUqU9_6Z4bD43dJDOeuPmEXj9hyyxEOnda7iJVh9b0Y2mTEZyl3nFt2z9FKI";

        // Crear el mensaje en formato JSON
        const data = {
            content: `📩 **Nuevo mensaje enviado:**\n${mensaje}`
        };

        console.log("📡 Enviando datos al webhook...", data);

        // Enviar la solicitud a Discord
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
                alert("⚠️ Hubo un error al enviar. Revisa la consola.");
                console.error("❌ ERROR: Respuesta del servidor no exitosa.", response.status);
            }
        })
        .catch(error => {
            console.error("❌ ERROR: Fallo en la solicitud Fetch:", error);
            alert("⚠️ Error inesperado. Revisa la consola.");
        });
    });
});
