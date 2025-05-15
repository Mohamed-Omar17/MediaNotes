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


let user = "Rayan"; //set this to the email you use to test
let game = ""


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
  result.rows.forEach((item) => items.push({media: item.title, title: item.note, email: item.user_email, name : item.media_name}));
  
  console.log(items); // Check what's being sent
  res.json({ postData: items });
})

app.listen(3100, () => {
  console.log("Listening on port 3100.");
})