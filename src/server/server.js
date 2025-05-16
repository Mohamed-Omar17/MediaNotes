import express from 'express';
import pg from 'pg';

const app = express();
import cors from 'cors';
app.use(cors());

const db = new pg.Client({ //change the password, user, and database names to whatever you save them as 
  user: "postgres",
  host: "localhost",
  database: "media_notes",
  password: "INSERTPASSWORD",
  port: 5432,
});
db.connect();


let user = "Mohamed"; //set this to the email you use to test
let game = ""

app.use(express.json());

app.get ("/api", async (req, res) => {
  let result;
  if (game != "") {
    result = await db.query( //queries for the email in the user variable
    "SELECT * FROM notes WHERE user_email = $1 AND media_name = $2;", [user, game]);
  }
  else {
    result = await db.query( //queries for the email in the user variable
    "SELECT * FROM notes WHERE user_email = $1;", [user]);
  }
    let items = []; //appends each item from that user into the items array
  result.rows.forEach((item) => items.push({id : item.id, media: item.title, title: item.note, email: item.user_email, name : item.media_name}));
  
  console.log(items); // Check what's being sent
  res.json({ postData: items });
})


app.post('/add-note', async (req, res) => {
  const { email, title, note, media_name } = req.body;
  console.log(email);

  try {
    console.log("Received data:", req.body); // Add this

    //Insert note
    await db.query(
      `INSERT INTO notes (title, note, user_email, media_name)
       VALUES ($1, $2, $3, $4)`,
      [title, note, email, media_name]
    );

    res.status(200).json({ message: 'Note added successfully' });
  } catch (err) {
    console.error("Error inserting note:", err); // Log the real error
    res.status(500).json({ error: 'Failed to add note' });
  }
});


app.delete('/api/delete/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await db.query('DELETE FROM notes WHERE id = $1', [id]);
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.listen(3100, () => {
  console.log("Listening on port 3100.");
})