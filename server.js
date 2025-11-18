const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MTN_API_URL = 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay';
const MTN_TOKEN = 'VOTRE_TOKEN_API'; // mettre votre token MTN/Orange

app.post('/pay', async (req, res) => {
    const { produit, montant, numero } = req.body;

    if (!produit || !montant || !numero) {
        return res.status(400).json({ status: 'error', message: 'Informations manquantes.' });
    }

    try {
        const response = await axios.post(MTN_API_URL, {
            amount: montant,
            currency: 'XAF',
            externalId: `Order-${Date.now()}`,
            payer: { partyIdType: 'MSISDN', partyId: numero },
            payerMessage: `Paiement pour ${produit}`,
            payeeNote: 'Home Game Five'
        }, {
            headers: {
                'Authorization': `Bearer ${MTN_TOKEN}`,
                'X-Reference-Id': `Order-${Date.now()}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ status: 'success', data: response.data });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend Home Game Five lancé sur port ${PORT}`));