import bcrypt from 'bcrypt';
import * as db from '../database/Db.js';
import jwt from 'jsonwebtoken';
import MaskData from 'maskdata';
import * as dotenv from 'dotenv';
dotenv.config();

export function signup(req, res, next) {
    try {
        let mail = req.body.mail
        bcrypt.hash(req.body.password, 10)
        .then( hash => {
            db.getUser(mail)
            .then(mail => {
                if (!mail) {
                    const user = db.createUser(
                        req.body.name,
                        req.body.firstname,
                        req.body.service,
                        req.body.mail,
                        hash
                    )
                    return res.status(201).json({ message: 'Utilisateur créé !' });
                } else {
                    return res.status(401).json({ error: 'Email déjà utilisé !' });
                }
            })
            .catch(
                error => {
                    console.log(error);
                    res.status(500).json({ error: error.message });
                }
            );
        })
        .catch(error => res.status(500).json({ error }));
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
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
                        { id: userId, isModerator: admin },
                        process.env.WT,
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
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    console.log(res); 
};


export function ImAdmin(req, res, next) {
    try {
        res.status(200).json({message: 'Utilisateur valide'});
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    console.log(res); 
};


export function deleteUser(req, res, next) {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.WT);
    const userId = decodedToken.id;

    try {
        db.deleteUser(userId);

        res.status(201).json({ message: 'Utilisateur supprimé' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    console.log(res); 
};

/* -------------------------------------------------------------------------- */
/*                                    ADMIN                                   */
/* -------------------------------------------------------------------------- */

export async function getAllUsers(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.WT);
    const admin = decodedToken.isModerator;
    const emailMask2Options = {
        maskWith: "*", 
        unmaskedStartCharactersBeforeAt: 1,
        unmaskedEndCharactersAfterAt: 2,
        maskAtTheRate: false
    };

    if(admin){
        try {
            const users = await db.getAllUsers()
            let n = 0;
            for (const mail of users) {
                let mail = (users[n].Mail);
                let user = users[n]
                const maskedEmail = MaskData.maskEmail2(mail, emailMask2Options);
                user.Mail = maskedEmail
                console.log(user)
                n++
            }
            res.status(200).json(users)
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
        console.log(res);
    } else {
        res.status(400).json({ error: `not an admin` });
    }
}

export async function modifyUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.WT);
    const admin = decodedToken.isModerator;

    const uId = req.body.uId;

    if(admin){
        try {
            const user = await db.modifyUser(uId)
            res.status(201).json({ message: 'Utilisateur supprimé' });

        } catch(error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: `can't do this` });
    }
}


export async function backUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.WT);
    const admin = decodedToken.isModerator;

    const uId = req.body.uId;

    if(admin){
        try {
            const user = await db.backUser(uId)
            
            res.status(201).json({ message: 'Utilisateur modifié' });

        } catch(error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: `can't touch users` });
    }
}

export function moderationDate(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.WT);
    const admin = decodedToken.isModerator;

    if(admin){
        try {
            db.moderationDate()
            
            .then(user=> res.status(200).json(user))
            .catch(error => res.status(400).json({ error }))

        } catch(error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
        console.log(res);
    } else {
        res.status(400).json({ error: `can't delete users` });
    }
}


