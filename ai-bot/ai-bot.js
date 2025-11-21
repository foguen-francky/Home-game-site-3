let model = null; 
const msgs = document.getElementById("aiMessages");

async function initAI() {
    model = await webllm.createModel({
        model: "Phi-3-mini-4k-instruct-q4f32_1"  // IA locale 100% gratuite
    });

    addMsg("Bonjour 👋 ! Je suis votre Assistant IA. Posez-moi n’importe quelle question !", "bot");
}

function addMsg(text, from) {
    let div = document.createElement("div");
    div.className = "message " + from;
    div.innerText = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

// Quand on clique sur envoyer
document.getElementById("aiSend").onclick = async () => {
    let input = document.getElementById("aiInput");
    let text = input.value.trim();
    if (!text) return;

    addMsg(text, "user");
    input.value = "";

    let reply = await model.generate(text);
    addMsg(reply.output_text, "bot");
};

initAI();