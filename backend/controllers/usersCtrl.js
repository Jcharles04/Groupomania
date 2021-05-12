import bcrypt from 'bcrypt';
import * as db from '../database/Db.js';
import jwt from 'jsonwebtoken';
//const MaskData = require('maskdata');

export function signup(req, res, next) {

    bcrypt.hash(req.body.password, 10)
    .then(async hash => { 
        try {
        const user = await db.createUser(
            req.body.name,
            req.body.firstName,
            req.body.serv,
            req.body.mail,
            hash
        );
        res.status(201).json({ message: 'Utilisateur créé !' })
        } catch {
            res.status(500).json({ error });
            console.error(error);
        }
        console.log(user)
    })
    .catch(error => res.status(500).json({ error }));
};


export async function login(req, res, next) {

    const mail = req.body.mail;
    const pass = req.body.password;

    db.getUser(mail)
        .then(mail => {
            if (!mail) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            let userId = mail.id;
            let userName = mail.FirstName;
            let admin = mail.Moderator;

            bcrypt.compare(pass, mail.PassWord)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                const obj = {
                    userId: userId, name: userName, admin: admin,
                    access_token: jwt.sign(
                        { id: userId, isModerator: 1 }, //TODO: mettre le bon
                        'JWT_SECRET_TOKEN',
                        { expiresIn: '24h' }
                )};
                res.status(200).json(obj);

            })
            .catch(
                error => {
                    console.log(error);
                    res.status(500).json({ error: error.message });
                }
            );
        })
        .catch(
            error => res.status(500).json({ error: error.message })
            );
};