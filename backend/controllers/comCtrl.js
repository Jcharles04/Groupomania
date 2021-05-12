import * as db from '../database/Db.js';
import jwt from 'jsonwebtoken';



export async function createCom(req, res, next){
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const userId = decodedToken.id;
    let image = '';
        
    const text = req.body.text;
    if(req.body.image != '') {
        image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    try {
        const com = await db.createCom(
            userId,
            text,
            image  
        )
        res.status(201).json({ message: 'Commentaire créé !' })
    } catch {
        res.status(500).json({ error });
    }
    console.log(res); 
};

export async function replyCom(req, res, next){
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const userId = decodedToken.id;
        
    const text = req.body.text;
    const replyTo_id = req.body.ReplyTo_id

    try {
        const com = await db.replyCom(
            userId,
            text,
            replyTo_id  
        )
        res.status(201).json({ message: 'Réponse créée !' })
    } catch {
        res.status(500).json({ error });
    }
    console.log(res); 
};

export async function deleteCom(req, res, next){
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const userId = decodedToken.id;
    
    const user = req.body.user;
    const cId = req.body.cId;

    if(userId == user) {
        try {
            const com = await db.deleteCom(cId)
            res.status(201).json({ message: 'Commentaire supprimé !' })
        } catch {
            res.status(500).json({ error });
        }
        console.log(res); 
    } else {
        (error => res.status(400).json({ error }))
    }
};

export async function likeCom(req, res, next){
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const userId = decodedToken.id;
    
    const user = req.body.user;
    const cId = req.body.cId;
    const like = req.body.like;

    if (userId == user) {
        if(like == 0) {
            try {
                const com = await db.likeCom(
                    cId,
                    userId
                )
                res.status(201).json({ message: 'Like envoyé !' })
            } catch {
                res.status(500).json({ error });
            }
            console.log(res); 
        } else {
            try {
                const com = await db.dropLike(
                    cId,
                    userId
                )
                res.status(201).json({ message: 'Like annulé !' })
            } catch {
                res.status(500).json({ error });
            }
            console.log(res); 
        }
    } else {
        (error => res.status(400).json({ error }));
    }
};

export async function getAllComs(req, res, next) {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const userId = decodedToken.id;

    try {
        db.getAllComs(userId)
        
        .then(coms => res.status(200).json(coms))
        .catch(error => res.status(400).json({ error }))

    } catch {
        res.status(500).json({ error });
    }
    console.log(res); 

}