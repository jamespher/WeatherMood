if(!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function listPosts() {
     const sql = `
        SELECT * FROM posts
        ORDER BY id DESC
     `;
     /* db.any() always return an array even if the array is empty */
     return db.any(sql);
}

function createPost(mood, text) {
    const sql = `
        INSERT INTO posts (mood, text)
        VALUES  ($<mood>, $<text>)
        RETURNING *
    `;
    return db.one(sql, {mood, text});
}

module.exports = {
    listPosts,
    createPost
}