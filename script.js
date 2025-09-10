document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("presenceForm");
    const confirmation = document.getElementById("confirmation");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    let userData = {};

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        userData = {
            nom: document.getElementById("nom").value.trim(),
            whatsapp: document.getElementById("whatsapp").value.trim(),
            email: document.getElementById("email").value.trim(),
            ville: document.getElementById("ville").value.trim(),
            presence: document.getElementById("presence").value
        };

        if (!userData.presence) {
            alert("Veuillez sélectionner votre présence !");
            return;
        }

        // Générer lien WhatsApp avec message pré-rempli
        const message = `Bonjour, je confirme ma présence à l'événement KEY ABIDJAN.\n\nNom: ${userData.nom}\nWhatsApp: ${userData.whatsapp}\nEmail: ${userData.email || 'N/A'}\nVille: ${userData.ville}\nRéponse: ${userData.presence}`;
        const phoneNumber = "22500000000"; // Remplacer par le numéro WhatsApp officiel de réception
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Ouvrir WhatsApp dans un nouvel onglet
        window.open(whatsappURL, "_blank");

        // Afficher le message de confirmation avant PDF
        form.classList.add("hidden");
        confirmation.classList.remove("hidden");
    });

    // Bouton Oui → Générer PDF
    yesBtn.addEventListener("click", () => {
        generatePDF(userData);
        confirmation.innerHTML = "<p>Votre carte d'invitation a été générée !</p>";
    });

    // Bouton Non → Message simple
    noBtn.addEventListener("click", () => {
        confirmation.innerHTML = "<p>Merci ! Votre présence a été enregistrée.</p>";
    });
});

// Fonction pour générer PDF via jsPDF
function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Carte d'invitation", 20, 30);
    doc.setFontSize(16);

    doc.text(`Nom: ${data.nom}`, 20, 50);
    doc.text(`WhatsApp: ${data.whatsapp}`, 20, 60);
    if (data.email) doc.text(`Email: ${data.email}`, 20, 70);
    if (data.ville) doc.text(`Ville: ${data.ville}`, 20, 80);
    doc.text(`Réponse: ${data.presence}`, 20, 90);

    doc.text("Événement: KEY ABIDJAN Business Circle", 20, 110);
    doc.text("Date: Samedi 20 Septembre 2025", 20, 120);
    doc.text("Heure: 09h00", 20, 130);
    doc.text("Lieu: Abidjan, Côte d'Ivoire", 20, 140);

    doc.save(`Carte_${data.nom.replace(/\s+/g, "_")}.pdf`);
}
