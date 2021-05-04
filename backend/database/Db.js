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
        sequelize = new Sequelize('groupomania', 'groupomania', 'gpM@n1a', {
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
        let res = await sequelize.query("UPDATE user SET Suppression = NOW()  WHERE id = ?)",
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
        ORDER BY CreationDate DESC LIMIT 5`,

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
/*
export async function getAllComs(userId) {
    const t = await sequelize.transaction();

    try {
        let res = await sequelize.query(`SELECT et.*, COUNT(UserId) likes, MAX(UserId = ? ) AS myLike FROM (
        SELECT c.id, c.User_id, c.CreationDate, c.ImgUrl, c.Text, c.Suppression, c.ReplyTo_id, c.checkedByAdmin, l.UserId, u.FirstName, u.Service FROM comments c
        LEFT JOIN like_number l ON l.ComId = c.id
        LEFT JOIN USER u ON u.id= c.User_id
        WHERE c.Suppression IS NULL AND ReplyTo_id IS NULL
        ) et
        GROUP BY et.id
        ORDER BY CreationDate DESC LIMIT 5`,
        {
            replacements: [userId],
            type: QueryTypes.SELECT,
            transaction: t
        });

        let comments = [];
        let comment;
        while(comment = res.fetch()){
            comment['replies'] = [];

            let replies = await sequelize.query(`SELECT et.*, COUNT(UserId) likes, MAX(UserId = ? ) AS myLike FROM (
                SELECT c.id, c.User_id, c.CreationDate, c.ImgUrl, c.Text, c.Suppression, c.ReplyTo_id, c.checkedByAdmin, l.UserId, u.FirstName, u.Service FROM comments c
                LEFT JOIN like_number l ON l.ComId = c.id
                LEFT JOIN USER u ON u.id= c.User_id
                WHERE c.Suppression IS NULL AND ReplyTo_id = c.id
                ) et
                GROUP BY et.id
                ORDER BY CreationDate DESC`,
                {
                    replacements: [userId],
                    type: QueryTypes.SELECT,
                });
        }

        await t.commit();
        console.log("Raw out: ", res);
        return res[0];

    } catch (error) {
        await t.rollback();
        throw error;

    }
    
}

function doSqlStuff() {

    mysql.truc(callback1);

    function callback1(err, data) {
        mysql.machin(callback2);
    }

    function callback2(err, data) {

    }
}
*/

