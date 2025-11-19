const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");

// Fonction pour ajouter un message
function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message " + sender;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Réponse simple du bot
function botResponse(message) {
    let reply = "Je ne comprends pas votre question.";
    if(message.toLowerCase().includes("ps5")) reply = "Oui, nous avons des PS5 en stock.";
    if(message.toLowerCase().includes("xbox")) reply = "Oui, nous avons plusieurs modèles Xbox disponibles.";
    if(message.toLowerCase().includes("nintendo")) reply = "Oui, nous avons la Nintendo Switch.";
    addMessage("bot", reply);
}

// Clic sur le bouton envoyer
sendBtn.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if(!message) return;
    addMessage("user", message);
    chatInput.value = "";
    setTimeout(() => botResponse(message), 500); // réponse simulée
});

// Envoi avec touche Enter
chatInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendBtn.click();
});