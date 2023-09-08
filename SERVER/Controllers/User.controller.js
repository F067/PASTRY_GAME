import userModel from "../Models/UserModel.js";
import jwt from 'jsonwebtoken';

const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function createUser(req, res) {
    try {
        const { mail, password } = req.body;
        if (!mail || !password) {
            return res.status(400).json({ error: 'Tous les champs doivent être remplis' });
        }

        const userExist = await userModel.findOne({ mail });
        if (userExist) {
            return res.status(400).json({ error: 'Vous avez déja tenté votre chance...(🤓)' });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: '8 caractères, 1 lettre majuscule, 1 caractère spécial, 1 chiffre' });
        }

        if (!emailRegex.test(mail)) {
            return res.status(400).json({ error: "Le format de l'email n'est pas correct" })
        }

        const newUser = await userModel.create({
            mail,
            password,
        });

        if (newUser) {
            const authToken = await jwt.sign({ _id: newUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: 3600 })
            return res.status(201).json({ message: 'Joueur créé avec succès', user: newUser, JWT: authToken });
        } else {
            return res.status(500).json({ error: 'Erreur lors de la création du joueur' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la création du joueur' });
    }
}

export async function savePastryToUser(req, res) {
    try {
        const { userId, pastry } = req.body;

        // Rechercher l'utilisateur dans la base de données par son ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Ajouter la pâtisserie à l'utilisateur
        user.pastries.push(pastry);

        // Sauvegarder l'utilisateur mis à jour dans la base de données
        const updatedUser = await user.save();

        if (updatedUser) {
            return res.status(200).json({ message: 'Pâtisserie enregistrée avec succès dans l\'utilisateur' });
        } else {
            return res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la pâtisserie dans l\'utilisateur' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la pâtisserie dans l\'utilisateur' });
    }
}

export async function verifyJWT(req, res) {
    const { jwToken } = req.body
    if (jwToken) {
        console.log(jwToken)
        try {
            let decoded = jwt.verify(jwToken, process.env.JWT_SECRET)
            if (decoded) {
                let user = await userModel.findOne({ _id: decoded._id })
                return res.status(201).json({ user: user })
            }
        } catch (error) {
            return res.status(201).json({ error: "validité du JWT expiré" })
        }
    }
}