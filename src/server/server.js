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

//shows media attached to user
app.get ("/media", async (req, res) => {
  console.log(user);
  let result = await db.query(
    "SELECT * FROM media WHERE user_email = $1;", [user]);
    let items = [];
  result.rows.forEach((item) => items.push({id : item.id, title: item.title, media_type: item.media_type, email: item.user_email}));
  
  console.log(items); // Check what's being sent
  res.json({ postData: items });
});




//shows all notes
app.get ("/api/:mediaId", async (req, res) => {

  let result;
  let items = [];
  const mediaId = req.params.mediaId;

  try {
    const mediaTitle = await db.query("Select title FROM media WHERE user_email=$1 AND id=$2;", [user, mediaId]);
    
    if (mediaTitle.rowCount === 0) {
      return res.status(404).json({ error: "Media not found" });
    }
    else {
      const title = mediaTitle.rows[0].title;
      result = await db.query( //queries for the email in the user variable
      "SELECT * FROM notes WHERE user_email = $1 AND media_name = $2;", [user, title]);

      items = []; //appends each item from that user into the items array
      result.rows.forEach((item) => items.push({id : item.id, media: item.title, title: item.note, email: item.user_email, name : item.media_name}));
    }
  }
  catch(error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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


app.post('/add-note-with-game', async (req, res) => {
  const { email, title, note, media_name } = req.body;
  console.log(email);

  try {
    console.log("Received data:", req.body); // Add this

    const checkMedia = await db.query(
      "SELECT 1 FROM media WHERE title = $1 LIMIT 1;", [media_name]
    );

    const inMedia = checkMedia.rowCount;
      if (inMedia <= 0) {
        await db.query(
        `INSERT INTO media (title, media_type, user_email)
        VALUES ($1, $2, $3)`,
        [media_name, 'Video Game', email]
      );
    }

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
  const gameTitleResult = await db.query(
    "SELECT media_name FROM notes WHERE id = $1;", [id]
  );

  const gameTitle = gameTitleResult.rows[0].media_name;


  const numberOfNotes = await db.query( //queries for the email in the user variable
      "SELECT * FROM notes WHERE user_email = $1 AND media_name = $2;", [user, gameTitle]);
  const resultingNotes = numberOfNotes.rowCount;

  if (resultingNotes <= 1) {
    await db.query('DELETE FROM media WHERE user_email = $1 AND title = $2;', [user, gameTitle]);
  }

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