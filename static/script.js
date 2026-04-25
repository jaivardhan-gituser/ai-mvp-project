
// Send message
async function sendMessage() {
    console.log("🔥 SEND CLICKED");

    const input = document.getElementById("message");
    const msg = input.value.trim();

    if (!msg) return;

    await fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
    });

    input.value = "";
}


// Send location
async function sendLocation() {
    console.log("📍 LOCATION CLICKED");

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        await fetch('/send-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lon })
        });

        console.log("📤 LOCATION SENT");
    }, (err) => {
        console.error("❌ LOCATION ERROR:", err);
        alert(err.message);
    });
}


// Load messages
async function loadMessages() {
    const res = await fetch('/messages');
    const data = await res.json();

    const box = document.getElementById("chat-box");
    box.innerHTML = "";

    data.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("message");

        if (msg.priority === "high") div.classList.add("high");
        else div.classList.add("normal");

        if (msg.type === "location") {
            div.innerHTML = `📍 <a target="_blank" href="https://maps.google.com/?q=${msg.text}">View Location</a>`;
        } else {
            div.innerText = msg.text;
        }

        box.appendChild(div);
    });

    box.scrollTop = box.scrollHeight;
}


// Auto refresh
setInterval(loadMessages, 2000);
window.onload = loadMessages;