import bcrypt from 'bcrypt';
import * as db from '../database/Db.js';
import jwt from 'jsonwebtoken';
//const MaskData = require('maskdata');

export function signup(req, res, next) {
    try {
        const mail = req.body.mail
        bcrypt.hash(req.body.password, 10)
        .then( hash => {
            db.getUser(mail)
            .then(mail => {
                if (!mail) {
                    const user = db.createUser(
                        req.body.name,
                        req.body.firstname,
                        req.body.service,
                        mail,
                        hash
                )
                res.status(201).json({ message: 'Utilisateur créé !' })
                } else {
                    return res.status(401).json({ error: 'Email non disponible !' });
                }
            })
            .catch(
                error => {
                    console.log(error);
                    res.status(500).json({ error: error.message });
                }
            );
            
            console.log(user)
        })
        .catch(error => res.status(500).json({ error }));
    } catch {
        res.status(500).json({ error });
        console.error(error);
    }
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
                        { id: userId, isModerator: admin }, //TODO: mettre le bon
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


export function ImLog(req, res, next) {
    try {
        res.status(200).json({message: 'Utilisateur valide'});
    } catch {
        res.status(500).json({ error });
    }
    console.log(res); 
};


export function ImAdmin(req, res, next) {
    try {
        res.status(200).json({message: 'Utilisateur valide'});
    } catch {
        res.status(500).json({ error });
    }
    console.log(res); 
};


export function deleteUser(req, res, next) {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const userId = decodedToken.id;

    try {
        db.deleteUser(userId);

        res.status(201).json({ message: 'Utilisateur supprimé' });
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: error.message });
    }
    console.log(res); 
};

/* -------------------------------------------------------------------------- */
/*                                    ADMIN                                   */
/* -------------------------------------------------------------------------- */

export function getAllUsers(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const admin = decodedToken.isModerator;

    if(admin){
        try {
            db.getAllUsers()
            
            .then(users=> res.status(200).json(users))
            .catch(error => res.status(400).json({ error }))

        } catch {
            res.status(500).json({ error });
        }
        console.log(res);
    } else {
        res.status(400).json({ error: `not an admin` });
    }
}

export function modifyUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const admin = decodedToken.isModerator;

    const uId = req.body.uId;

    if(admin){
        try {
            db.modifyUser(uId)
            
            res.status(201).json({ message: 'Utilisateur supprimé' });

        } catch {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
        console.log(res);
    } else {
        res.status(400).json({ error: `can't do this` });
    }
}


export function backUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const admin = decodedToken.isModerator;

    const uId = req.body.uId;

    if(admin){
        try {
            db.backUser(uId)
            
            res.status(201).json({ message: 'Utilisateur modifié' });

        } catch {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
        console.log(res);
    } else {
        res.status(400).json({ error: `can't touch users` });
    }
}

export function modDate(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const admin = decodedToken.isModerator;

    if(admin){
        try {
            db.modDate()
            
            .then(user=> res.status(200).json(user))
            .catch(error => res.status(400).json({ error }))

        } catch {
            res.status(500).json({ error });
        }
        console.log(res);
    } else {
        res.status(400).json({ error: `can't delete users` });
    }
}


