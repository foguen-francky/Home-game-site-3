const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// Liste des mots-clés et réponses
const responses = {
    "bonjour": "Bonjour ! Bienvenue chez Home Game Five. Comment puis-je vous aider ?",
    "ps5": "Nous avons PS5 Slim, PS5 Fat et PS5 Pro. Cliquez sur le bouton Commander sur la page consoles pour acheter.",
    "xbox": "Nous avons Xbox One X, Xbox Series S et Xbox Series X.",
    "nintendo": "Nous avons Nintendo Switch et différents modèles de manettes.",
    "commande": "Pour commander, cliquez sur le bouton 'Commander' à côté du produit désiré.",
    "aide": "Je peux vous donner des infos sur les consoles, manettes ou moyens de contact."
};

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserInput() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    
    addMessage(userMessage, 'user');

    let reply = "Désolé, je n'ai pas compris. Tapez 'aide' pour plus d'infos.";
    for (let key in responses) {
        if (userMessage.toLowerCase().includes(key)) {
            reply = responses[key];
            break;
        }
    }

    setTimeout(() => addMessage(reply, 'bot'), 500);
    chatInput.value = '';
}

sendBtn.addEventListener('click', handleUserInput);
chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleUserInput(); });