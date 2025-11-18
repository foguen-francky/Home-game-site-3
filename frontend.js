function confirmOrder() {
    const payment = document.getElementById('paymentMethod').value;
    const phone = document.getElementById('phoneNumber').value;
    const amount = document.getElementById('amount').value;

    if (!payment || !phone || !amount) {
        alert('Remplissez toutes les informations.');
        return;
    }

    fetch('https://ton-backend.onrender.com/pay', {   // <-- URL de ton backend Render
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produit: currentProduct, montant: amount, numero: phone })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Paiement lancé avec succès ! Vérifiez votre téléphone.');
        } else {
            alert('Erreur : ' + data.message);
        }
        closeOrder();
    })
    .catch(err => alert('Erreur : ' + err.message));
}