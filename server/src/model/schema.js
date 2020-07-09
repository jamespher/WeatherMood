require('../../config.js');
console.log(process.env.DB_URL);
const pgp = require('pg-promise')();
db = pgp(process.env.DB_URL);

/* CREAT TABLE posts */
const schemasql = `
    --Drop (droppable only when no dependency)
    DROP TABLE IF EXISTS posts;
    DROP TYPE IF EXISTS mood;
    DROP INDEX IF EXISTS posts_idx_ts;

    --Create
    CREATE TYPE mood AS ENUM  (
        'Happy',
        'Soso',
        'Sad'
    );
    CREATE TABLE posts (
        id              serial PRIMARY KEY NOT NULL,
        mood            mood NOT NULL,
        text            text NOT NULL,
        ts              bigint NOT NULL DEFAULT (extract(epoch from now()))
    );
`;

/* INSERT posts data */
const datasql = `
    --Populate dummy posts
    INSERT INTO posts (mood, text, ts)
    SELECT 
        'Sad', 
        'Hello' || i || 'Hello' || (i+1) || 'Hello' || (i+2),
        round(extract(epoch from now()) + (i - 20) * 3600)
    FROM generate_series(1, 20) AS s(i);
    CREATE INDEX posts_idx_ts ON posts USING btree(ts);
`;

db.none(schemasql).then(() => {
    console.log('Schema Created');
    db.none(datasql).then(() => {
        console.log('Data Populated');
        pgp.end();
    });
}).catch(err => {
    console.log('Error Creating Schema', err);
})