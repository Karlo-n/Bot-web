document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const mensaje = document.getElementById("mensaje").value.trim();

    if (!mensaje) {
        alert("⚠️ Escribe un mensaje antes de enviar.");
        return;
    }

    // Webhook de Discord
    const webhookURL = "https://discord.com/api/webhooks/1345247192151232562/GR_ZBmWUZUqU9_6Z4bD43dJDOeuPmEXj9hyyxEOnda7iJVh9b0Y2mTEZyl3nFt2z9FKI";

    // Construcción del mensaje JSON
    const data = {
        content: `📩 **Nuevo mensaje recibido:**\n${mensaje}`
    };

    // Enviar mensaje al webhook
    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.ok ? alert("✅ ¡Mensaje enviado!") : alert("⚠️ Error al enviar."))
    .catch(() => alert("⚠️ Ocurrió un error. Revisa tu conexión."));
});
