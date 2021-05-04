import * as db from '../database/Db.js';
import jwt from 'jsonwebtoken';



export async function createCom(req, res, next){
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
    const userId = decodedToken.id;
        
    const text = req.body.text;
    const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

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