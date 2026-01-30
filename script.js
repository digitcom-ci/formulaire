const form = document.getElementById("downloadForm");
const button = form.querySelector("button");
const successMessage = document.querySelector(".success-message");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    button.classList.add("loading");
    button.disabled = true;

    const params = {
        nom: document.getElementById("nom").value,
        numero: document.getElementById("numero").value,
        entreprise: document.getElementById("entreprise").value || "Non renseignée",
        email: document.getElementById("email").value || "Non renseigné"
    };

    emailjs.send("service_40476la", "template_3a1cizm", params)
        .then(() => {
            successMessage.style.display = "block";
            setTimeout(() => {
                window.location.href = "document.pdf";
            }, 1200);
        })
        .catch(() => {
            alert("Erreur lors de l’envoi. Réessayez.");
            button.classList.remove("loading");
            button.disabled = false;
        });
        
});