// =============================
// COMPTE A REBOURS
// =============================
const countdown = document.getElementById("countdown");

// Date cible (18 décembre 2025, 09h00)
const eventDate = new Date("December 19, 2025 20:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
        countdown.innerHTML = "C’est le grand jour 🎉";
        return;
    }

    // Calcul approximatif des mois (30 jours) et des autres unités
    const totalMinutes = Math.floor(distance / (1000 * 60));
    const months = Math.floor(totalMinutes / (60 * 24 * 30)); // 1 mois = 30 jours
    const days = Math.floor((totalMinutes % (60 * 24 * 30)) / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    countdown.innerHTML = `${months}m ${days}j ${hours}h ${minutes}min`;
}

// Mise à jour immédiate et toutes les minutes
updateCountdown();
setInterval(updateCountdown, 1000 * 60);

// =============================
// FORMULAIRE DE PRESENCE
// =============================
const form = document.getElementById("presenceForm");
const confirmationBox = document.getElementById("confirmation");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const presence = document.getElementById("presence").value;
    const message = document.getElementById("message").value.trim();

    if (!nom || !whatsapp || !presence) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    // Message vers WhatsApp
    const text = `Bonjour, je suis *${nom}*.\n\nPrésence: ${presence}\nVille/Quartier: --\nMessage: ${message}`;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;

    // Rediriger vers WhatsApp
    window.open(url, "_blank");

    // Afficher confirmation
    confirmationBox.classList.remove("hidden");
});

// =============================
// GÉNÉRATION PDF INVITATION
// =============================
yesBtn.addEventListener("click", () => {
    import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js").then(({ jsPDF }) => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("💍 Invitation Officielle 💍", 20, 30);

        doc.setFontSize(16);
        doc.text("Adam & Eve se diront OUI !", 20, 50);
        doc.text("📅 Samedi 20 Septembre 2025", 20, 70);
        doc.text("⛪ Eglise Saint Jean, Abidjan", 20, 90);
        doc.text("🍽 Diner : 20h30 - Abidjan", 20, 110);

        doc.setFontSize(12);
        doc.text("Dress Code : Chic & Élégant", 20, 130);

        doc.setFontSize(10);
        doc.text("Merci de célébrer ce moment unique avec nous 💖", 20, 160);

        doc.save("Invitation_Adam_Eve.pdf");
    });
});

noBtn.addEventListener("click", () => {
    confirmationBox.innerHTML = "<p>Merci ! À très bientôt 🎉</p>";
});

// =============================
// FIXER LE TEXTAREA
// =============================
const textarea = document.getElementById("message");
if (textarea) {
    textarea.style.resize = "none"; // empêche le redimensionnement
    textarea.style.height = "100px"; // fixe une hauteur
}

