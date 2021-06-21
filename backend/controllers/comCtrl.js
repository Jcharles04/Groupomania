import * as db from '../database/Db.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const staticImagesPath = path.join(path.dirname(import.meta.url), "images").replace(/^file:[\\/]+/g, '');

export async function createCom(req, res, next){
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const userId = decodedToken.id;
        let image = '';
            
        const text = req.body.text;
        if(req.body.image != '') {
            image = req.file.filename;
        }

        const com = await db.createCom(
            userId,
            text,
            image  
        )
            res.status(201).json({ message: 'Commentaire créé !' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    console.log(res); 
};

export async function replyCom(req, res, next){
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const userId = decodedToken.id; 
        const text = req.body.text;
        const replyTo_id = req.body.ReplyTo_id
        const cId = replyTo_id;

        const resp = await db.replyCom(
            userId,
            text,
            replyTo_id  
        )
        const com = await db.getOneCom(
            cId,
            userId 
        )
        .then(com => res.status(200).json(com))
        .catch(error => res.status(400).json({ error }))
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    console.log(res); 
};

export async function deleteCom(req, res, next){
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const userId = decodedToken.id;

        const pId = req.body.parent_id;
        const user = req.body.user;
        let cId = req.body.cId;
        const admin = req.body.isModerator;

        if(userId == user || admin == 1) {
            const resp = await db.deleteCom(cId)
            if(pId) {
                cId = pId
            }
            const com = await db.getOneCom(
                cId,
                userId 
            )
            .then(com => res.status(200).json(com))
            .catch(error => res.status(400).json({ error }))
            console.log(res); 
        } else {
            res.status(400).json({ error: `can't delete comments from other users` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export async function likeCom(req, res, next){
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const userId = decodedToken.id;
        
        const user = req.body.user;
        let cId = req.body.cId;
        const like = req.body.like;
        const pId = req.body.parent_id;

        if (userId == user) {
            if(like == 0) {
                const resp = await db.likeCom(
                    cId,
                    userId
                )
                if(pId){
                    cId = pId
                }
                const com = await db.getOneCom(
                    cId,
                    userId 
                )
                .then(com => res.status(200).json(com))
                .catch(error => res.status(400).json({ error }))
                console.log(res); 
            } else {
                const resp = await db.dropLike(
                    cId,
                    userId
                )
                if(pId){
                    cId = pId
                }
                const com = await db.getOneCom(
                    cId,
                    userId 
                )
                .then(com => res.status(200).json(com))
                .catch(error => res.status(400).json({ error }))
                console.log(res); 
            }
        } else {
            res.status(400).json({ error: `can't modify comments from other users` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export async function modCom(req, res, next) {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const userId = decodedToken.id;

        const pId = req.body.parent_id;
        let comId = req.body.id;
        const sup = req.body.value;
        const text = req.body.text;
        let image;

        if (sup == 1) {
            image = null;
        } else {
            if (!req.file) {
            image = false;
            } else {
                image = req.file.filename;
            }
        }
        const resp = await db.modCom(
            userId,
            text,
            image,
            comId,
            sup 
        )
        if(pId) {
            comId = pId
        }
        const com = await db.getOneCom(
            comId,
            userId 
        )
        .then(com => res.status(200).json(com))
        .catch(error => res.status(400).json({ error }))
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    console.log(res); 

};
        
export async function getAllComs(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const userId = decodedToken.id;
        
        db.getAllComs(userId)
        .then(coms => res.status(200).json(coms))
        .catch(error => res.status(400).json({ error }))
        console.log(res); 

    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export async function getMoreComs(req, res, next) {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const userId = decodedToken.id;

        const cId = req.params.id;
        
        db.getMoreComs(userId, cId)
        .then(coms => res.status(200).json(coms))
        .catch(error => res.status(400).json({ error }))

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    console.log(res); 
};

/* -------------------------------------------------------------------------- */
/*                                    ADMIN                                   */
/* -------------------------------------------------------------------------- */

export async function checkCom(req, res, next) {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const admin = decodedToken.isModerator;
        const uId = decodedToken.id;

        if(admin){
            db.checkCom(uId)
            .then(coms => res.status(200).json(coms))
            .catch(error => res.status(400).json({ error }))
            console.log(res); 
        } else {
            res.status(400).json({ error: `can't do this` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export async function delOldComs(req, res, next) {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const admin = decodedToken.isModerator;
        const array = req.body;
        
        if(admin) {
            const replies = await db.getOldReplies(array);
            let n = 0;
            while (replies.length && n < replies.length) {
                array.unshift(replies[n].id);
                n++
            }
            for (const id of array) {
                const url = await db.findOldCom(id);
                const com = await db.deleteOldCom(id);
                if (url) {
                    fs.unlink(staticImagesPath + url ,(err) => {
                        if (err) throw err;
                        console.log('Fichier supprimé !');
                    });
                }
            }
            res.status(200).json({JSON});
        } else {
            res.status(400).json({ error: `can't delete comments from other users` });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export async function getOldComs(req, res, next) {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const admin = decodedToken.isModerator;

        if(admin){
            
            db.getOldComs()
            
            .then(coms => res.status(200).json(coms))
            .catch(error => res.status(400).json({ error }))
            console.log(res); 
        } else {
            res.status(400).json({ error: `can't do this` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export async function getOldReplies(req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.WT);
        const admin = decodedToken.isModerator;
        const array = req.body;

        if(admin){
            db.getOldReplies(array)
            .then(coms => res.status(200).json(coms))
            .catch(error => res.status(400).json({ error }))
        } else {
            res.status(400).json({ error: `can't do this` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};