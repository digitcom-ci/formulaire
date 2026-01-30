document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('downloadForm');
    const submitBtn = form.querySelector('button');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Désactiver le bouton pendant le traitement
        submitBtn.disabled = true;
        submitBtn.textContent = 'Traitement en cours...';

        // Récupérer les valeurs
        const nom = document.getElementById('nom').value.trim();
        const numero = document.getElementById('numero').value.trim();
        const entreprise = document.getElementById('entreprise').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Validation basique
        if (!nom || !numero) {
            showMessage('Veuillez remplir les champs obligatoires (nom et numéro).', 'error');
            resetButton();
            return;
        }

        // Préparer les paramètres pour EmailJS
        const templateParams = {
            nom: nom,
            numero: numero,
            entreprise: entreprise || 'Non spécifié',
            email: email || 'Non spécifié'
        };

        // Envoyer via EmailJS
        emailjs.send('service_ycjoqv8', 'template_3a1cizm', templateParams) // Remplacez par vos IDs EmailJS
            .then(function(response) {
                console.log('Email envoyé avec succès', response);
                showMessage('Informations envoyées ! Téléchargement en cours...', 'success');

                // Déclencher le téléchargement du PDF
                const link = document.createElement('a');
                link.href = 'document.pdf'; // Chemin vers le PDF
                link.download = 'Annexe_Fiscale_2026.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Réinitialiser le formulaire
                form.reset();
            })
            .catch(function(error) {
                console.error("Erreur EmailJS :", error);
                alert("Erreur lors de l'envoi : " + JSON.stringify(error));
            })
            .finally(function() {
                resetButton();
            });
    });

    function showMessage(text, type) {
        // Supprimer les anciens messages
        const existing = document.querySelector('.message');
        if (existing) existing.remove();

        // Créer et afficher le nouveau message
        const msg = document.createElement('div');
        msg.className = `message ${type}`;
        msg.textContent = text;
        form.appendChild(msg);

        // Supprimer après 5 secondes
        setTimeout(() => msg.remove(), 5000);
    }

    function resetButton() {
        submitBtn.disabled = false;
        submitBtn.textContent = '📄 Télécharger le document';
    }
});