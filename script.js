const form = document.getElementById("downloadForm");
const button = form.querySelector("button");
const successMessage = document.querySelector(".success-message");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    button.classList.add("loading");
    button.disabled = true;

    // Télécharger le PDF immédiatement
    const link = document.createElement("a");
    link.href = "document.pdf"; // ton fichier PDF
    link.download = "document.pdf";
    link.click();

    // Préparer les données
    const params = {
        nom: document.getElementById("nom").value,
        numero: document.getElementById("numero").value,
        entreprise: document.getElementById("entreprise").value || "Non renseignée",
        email: document.getElementById("email").value || "Non renseigné"
    };

    // Envoyer EmailJS en arrière-plan
    emailjs.send("service_40476la", "template_3a1cizm", params)
        .then(() => {
            if(successMessage) successMessage.style.display = "block";
        })
        .catch((error) => {
            console.error("Erreur EmailJS :", error);
        })
        .finally(() => {
            button.classList.remove("loading");
            button.disabled = false;
        });
});