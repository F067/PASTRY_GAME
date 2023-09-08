import pastryModel from "../Models/PastryModel.js"

export async function getPastryData(req, res) {
    try {
        let data = await pastryModel.find({});
        res.json(data);

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
}
