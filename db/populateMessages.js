const {Client} = require('pg');

const sql = `
CREATE TABLE IF NOT EXISTS messages (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   author VARCHAR ( 255 ),
   text  text,
   added DATE DEFAULT CURRENT_DATE
);

INSERT INTO messages (author, text, added)
VALUES
    ('Jakub', 'Hej, jestem Jakub!', '2024-12-25'),
    ('Irena', 'Wiadomość z tego roku', '2025-01-12'),
    ('Sławek', 'Test 123 test', '2022-10-26')
`

async function main(){
    console.log('seeding...');
    const client = new Client({
        connectionString: 'postgresql://postgres:123@localhost:5432/messageexpressapp'
    })
    await client.connect();
    await client.query(sql);
    await client.end();
    console.log("done");
}
main();