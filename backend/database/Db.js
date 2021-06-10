import Sequelize from 'sequelize';
const QueryTypes = Sequelize.QueryTypes;

let sequelize;

/* -------------------------------------------------------------------------- */
/*                                  CONNEXION                                 */
/* -------------------------------------------------------------------------- */

export async function init() {
    if (sequelize)
        return;
    try {
        sequelize = new Sequelize('groupomania', 'root', 'root', {
            dialect: "mysql",
            host: "localhost"
        });
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        sequelize = null;
    }
}

/* -------------------------------------------------------------------------- */
/*                                    USER                                    */
/* -------------------------------------------------------------------------- */

export async function getUser(mail) {
    const t = await sequelize.transaction();

    try {
        const res = await sequelize.query("SELECT * FROM user WHERE Mail= ? AND Suppression IS NULL",
            {
                replacements: [mail],
                type: QueryTypes.SELECT,
                transaction: t
            });
        await t.commit();
        return res[0];

    } catch (error) {
        // If the execution reaches this line, an error was thrown.
        // We rollback the transaction.
        await t.rollback();
        throw error;
  
    }
}


export async function createUser(name, firstname, serv, mail, password) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("INSERT INTO user(Name, FirstName, Service, Mail, PassWord)  VALUES(?, ?, ?, ?, ?)",
            {
                replacements: [name, firstname, serv, mail, password],
                type: QueryTypes.INSERT,
                transaction: t
            });
        await t.commit();
        return res[0];

    } catch (error) {
        await t.rollback();
        throw error;
  
    }
}

export async function deleteUser(id) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("UPDATE user SET Suppression = NOW()  WHERE id = ?",
            {
                replacements: [id],
                type: QueryTypes.UPDATE,
                transaction: t
            });
        await t.commit();
        return res[0];
        
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

/* -------------------------------------------------------------------------- */
/*                                    ADMIN                                   */
/* -------------------------------------------------------------------------- */

export async function getAllUsers() {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("SELECT * FROM user",
        {
            replacements: [],
            type: QueryTypes.SELECT,
            transaction: t
        });
        await t.commit();
        return res;

    } catch (error) {
        await t.rollback();
        throw error;

    }
    
}

export async function modifyUser(uId) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("UPDATE user SET Suppression = NOW()  WHERE id = ?",
        {
            replacements: [uId],
            type: QueryTypes.UPDATE,
            transaction: t
        });
        await t.commit();
        return res;

    } catch (error) {
        await t.rollback();
        throw error;

    }
    
}

export async function backUser(uId) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("UPDATE user SET Suppression = NULL  WHERE id = ?",
        {
            replacements: [uId],
            type: QueryTypes.UPDATE,
            transaction: t
        });
        await t.commit();
        return res;

    } catch (error) {
        await t.rollback();
        throw error;

    }
}

export async function moderationDate() {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query(`SELECT * FROM user WHERE user.ModerationDate = 
        (SELECT MAX(ModerationDate) FROM user)`,
        {
            replacements: [],
            type: QueryTypes.SELECT,
            transaction: t
        });
        await t.commit();
        return res;

    } catch (error) {
        await t.rollback();
        throw error;

    }
};

export async function checkCom(uId) {
    const t = await sequelize.transaction();

    try {
        let check = await sequelize.query("UPDATE comments SET checkedByAdmin = 1 ",
        {
            replacements: [],
            type: QueryTypes.UPDATE,
            transaction: t
        });
        let res = await sequelize.query("UPDATE user SET ModerationDate = NOW()  WHERE id = ?",
        {
            replacements: [uId],
            type: QueryTypes.UPDATE,
            transaction: t
        });

        await t.commit();
        return check, res;
        

        

    } catch (error) {
        await t.rollback();
        throw error;

    }
};

export async function getOldComs(){
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("SELECT * FROM comments WHERE CreationDate < DATE_SUB(NOW(), INTERVAL 20 DAY) AND Suppression IS NOT NULL",
        {
            replacements: [],
            type: QueryTypes.SELECT,
            transaction: t
        });
        
        await t.commit();
        return res;
        
    } catch (error) {
        await t.rollback();
        throw error;

    }
};

export async function getOldReplies(id){
    const t = await sequelize.transaction();

    try {
        let resps = await sequelize.query("SELECT * FROM comments WHERE ReplyTo_id IN (?)",
        {
            replacements: [id],
            type: QueryTypes.SELECT,
            transaction: t
        });
        
        await t.commit();
        return resps;
        
    } catch (error) {
        await t.rollback();
        throw error;

    }
};

export async function findOldCom(id){
    const t = await sequelize.transaction();

    try {
        let urls = await sequelize.query("SELECT ImgUrl FROM comments WHERE id = ?",
        {
            replacements: [id],
            type: QueryTypes.SELECT,
            transaction: t /* scalar ? */
        });
        
        await t.commit();

        if (!urls.length)
            return null;

        return urls[0].ImgUrl;
        
    } catch (error) {
        await t.rollback();
        throw error;

    }
};


export async function deleteOldCom(id){
    const t = await sequelize.transaction();

    try {
        await sequelize.query("UPDATE comments SET ReplyTo_id = NULL WHERE id = ?",
        {
            replacements: [id],
            type: QueryTypes.UPDATE,
            transaction: t
        });
        await sequelize.query("DELETE FROM like_number WHERE ComId = ?",
        {
            replacements: [id],
            type: QueryTypes.DELETE,
            transaction: t
        });
        await sequelize.query("DELETE FROM comments WHERE id = ?",
        {
            replacements: [id],
            type: QueryTypes.DELETE,
            transaction: t
        });
        
        await t.commit();
        
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

/* -------------------------------------------------------------------------- */
/*                                  Comments                                  */
/* -------------------------------------------------------------------------- */


export async function createCom(user_id, text, image) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("INSERT INTO comments(User_id, Text, ImgUrl)  VALUES(?, ?, ?)",
            {
                replacements: [user_id, text, image],
                type: QueryTypes.INSERT,
                transaction: t
            });
        await t.commit();
        return res[0];

    } catch (error) {
        await t.rollback();
        throw error;
  
    }
}

export async function replyCom(user_id, text, replyTo_id) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("INSERT INTO comments(User_id, Text, ReplyTo_id)  VALUES(?, ?, ?)",
            {
                replacements: [user_id, text, replyTo_id],
                type: QueryTypes.INSERT,
                transaction: t
            });
        await t.commit();
        return res[0];

    } catch (error) {
        await t.rollback();
        throw error;
  
    }
}

export async function deleteCom(cId) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("UPDATE comments SET Suppression = NOW()  WHERE id = ?",
            {
                replacements: [cId],
                type: QueryTypes.UPDATE,
                transaction: t
            });
        await t.commit();
        return res[0];

    } catch (error) {
        await t.rollback();
        throw error;
  
    }
}

export async function likeCom(cId, userId) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("INSERT INTO like_number(ComId, UserId) VALUES(?,?)",
            {
                replacements: [cId, userId],
                type: QueryTypes.UPDATE,
                transaction: t
            });
        await t.commit();
        return res[0];

    } catch (error) {
        await t.rollback();
        throw error;
  
    }
}

export async function dropLike(cId, userId) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("DELETE FROM like_number WHERE comId = ? AND userId = ?" ,
            {
                replacements: [cId, userId],
                type: QueryTypes.DELETE,
                transaction: t
            });
        await t.commit();
        return res;

    } catch (error) {
        await t.rollback();
        throw error;
  
    }
}

export async function getAllComs(userId) {
    const t = await sequelize.transaction();

    try {
        let comments = await sequelize.query(`SELECT et.*, COUNT(UserId) likes, MAX(UserId = :uId ) AS myLike FROM (
        SELECT c.id, c.User_id, c.CreationDate, c.ImgUrl, c.Text, c.Suppression, c.ReplyTo_id, c.checkedByAdmin, l.UserId, u.FirstName, u.Service FROM comments c
        LEFT JOIN like_number l ON l.ComId = c.id
        LEFT JOIN USER u ON u.id= c.User_id
        WHERE c.Suppression IS NULL AND ReplyTo_id IS NULL
        ) et
        GROUP BY et.id
        ORDER BY CreationDate DESC LIMIT 10`,

        {
            replacements: {uId : userId },
            type: QueryTypes.SELECT,
            transaction: t
        });

        for (let i = 0; i < comments.length; i++){
            let comment = comments[i];
            
            
            let replies = await sequelize.query(`SELECT et.*, COUNT(UserId) likes, MAX(UserId = :uId ) AS myLike FROM (
                SELECT c.id, c.User_id, c.CreationDate, c.ImgUrl, c.Text, c.Suppression, c.ReplyTo_id, c.checkedByAdmin, l.UserId, u.FirstName, u.Service FROM comments c
                LEFT JOIN like_number l ON l.ComId = c.id
                LEFT JOIN USER u ON u.id= c.User_id
                WHERE c.Suppression IS NULL AND ReplyTo_id = ${comment.id}
                ) et
                GROUP BY et.id
                ORDER BY CreationDate DESC`,
                {
                    replacements: {uId : userId },
                    type: QueryTypes.SELECT,
                    transaction: t
                });
            comment['replies'] = replies;
            comment['nbOfResponse']= replies.length;
        }

        await t.commit();
        console.log('comment', comments);
        return comments;

    } catch (error) {
        await t.rollback();
        throw error;

    }
    
}

export async function getMoreComs(userId, id) {
    const t = await sequelize.transaction();

    try {
        let comments = await sequelize.query(`SELECT et.*, COUNT(UserId) likes, MAX(UserId = :uId ) AS myLike FROM (
        SELECT c.id, c.User_id, c.CreationDate, c.ImgUrl, c.Text, c.Suppression, c.ReplyTo_id, c.checkedByAdmin, l.UserId, u.FirstName, u.Service FROM comments c
        LEFT JOIN like_number l ON l.ComId = c.id
        LEFT JOIN USER u ON u.id= c.User_id
        WHERE c.Suppression IS NULL AND ReplyTo_id IS NULL  AND c.id < :cId
        ) et
        GROUP BY et.id
        ORDER BY CreationDate DESC LIMIT 10`,

        {
            replacements: {uId : userId, cId : id },
            type: QueryTypes.SELECT,
            transaction: t
        });

        for (let i = 0; i < comments.length; i++){
            let comment = comments[i];
            
            
            let replies = await sequelize.query(`SELECT et.*, COUNT(UserId) likes, MAX(UserId = :uId ) AS myLike FROM (
                SELECT c.id, c.User_id, c.CreationDate, c.ImgUrl, c.Text, c.Suppression, c.ReplyTo_id, c.checkedByAdmin, l.UserId, u.FirstName, u.Service FROM comments c
                LEFT JOIN like_number l ON l.ComId = c.id
                LEFT JOIN USER u ON u.id= c.User_id
                WHERE c.Suppression IS NULL AND ReplyTo_id = ${comment.id}
                ) et
                GROUP BY et.id
                ORDER BY CreationDate DESC`,
                {
                    replacements: {uId : userId },
                    type: QueryTypes.SELECT,
                    transaction: t
                });
            comment['replies'] = replies;
            comment['nbOfResponse']= replies.length;
        }

        await t.commit();
        console.log('comment', comments);
        return comments;

    } catch (error) {
        await t.rollback();
        throw error;

    }
    
}

export async function getOneCom(id, userId) {
    const t = await sequelize.transaction();

    try {
        let comments = await sequelize.query(`SELECT et.*, COUNT(UserId) likes, MAX(UserId = :uId ) AS myLike FROM (
        SELECT c.id, c.User_id, c.CreationDate, c.ImgUrl, c.Text, c.Suppression, c.ReplyTo_id, c.checkedByAdmin, l.UserId, u.FirstName, u.Service FROM comments c
        LEFT JOIN like_number l ON l.ComId = c.id
        LEFT JOIN USER u ON u.id= c.User_id
        WHERE c.Suppression IS NULL AND ReplyTo_id IS NULL AND c.id = :cId
        ) et`,

        {
            replacements: {uId : userId, cId : id },
            type: QueryTypes.SELECT,
            transaction: t
        });

        for (let i = 0; i < comments.length; i++){
            let comment = comments[i];
            
            
            let replies = await sequelize.query(`SELECT et.*, COUNT(UserId) likes, MAX(UserId = :uId ) AS myLike FROM (
                SELECT c.id, c.User_id, c.CreationDate, c.ImgUrl, c.Text, c.Suppression, c.ReplyTo_id, c.checkedByAdmin, l.UserId, u.FirstName, u.Service FROM comments c
                LEFT JOIN like_number l ON l.ComId = c.id
                LEFT JOIN USER u ON u.id= c.User_id
                WHERE c.Suppression IS NULL AND ReplyTo_id = :cId
                ) et
                GROUP BY et.id
                ORDER BY CreationDate DESC`,
                {
                    replacements: {uId : userId, cId : id },
                    type: QueryTypes.SELECT,
                    transaction: t
                });
            comment['replies'] = replies;
            comment['nbOfResponse']= replies.length;
        }


        await t.commit();
        console.log('comment', comments);
        return comments;

    } catch (error) {
        await t.rollback();
        throw error;

    }
    
}

export async function modCom(user_id, text, image, comId, sup) {
    const t = await sequelize.transaction();
        
    try {
        let res;
        if (sup == 1) {
            res = await sequelize.query("UPDATE comments SET ImgUrl = ? WHERE id = ? " ,
            {
                replacements: [image, comId],
                type: QueryTypes.UPDATE,
                transaction: t
            });
        } else if (image === false) {
            res = await sequelize.query("UPDATE comments SET User_id = ?, Text = ? WHERE id = ? ",
            {
                replacements: [user_id, text, comId],
                type: QueryTypes.UPDATE,
                transaction: t
            });
        } else {
            res = await sequelize.query("UPDATE comments SET User_id = ?, Text = ?, ImgUrl= ? WHERE id = ? ",
            {
                replacements: [user_id, text, image, comId],
                type: QueryTypes.UPDATE,
                transaction: t
            });
        }
        await t.commit();
        return res[0];

    } catch (error) {
        await t.rollback();
        throw error;
    
    }  
}

    



export async function supImg(image, comId) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query("UPDATE comments SET ImgUrl = ? WHERE id = ? " ,
            {
                replacements: [image, comId],
                type: QueryTypes.UPDATE,
                transaction: t
            });
        await t.commit();
        return res[0];

    } catch (error) {
        await t.rollback();
        throw error;
  
    }
}
