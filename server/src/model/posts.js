if(!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function listPosts(start) {
     const sql = `
        SELECT * FROM posts
        ${(start) ? 'WHERE id < $<start>' : ''}
        ORDER BY id DESC
        LIMIT 10
     `;
     /* db.any() always return an array even if the array is empty */
     return db.any(sql, {start});
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