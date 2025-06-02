import React from "react";

function NoteForm(props) {
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="text" name="email" value={data.email} onChange={handleChange} required />
        <br />
      <label>Note Title:</label>
      <input type="text" name="title" value={data.title} onChange={handleChange} required />
      <br />
      <label>Note:</label>
      <input type="text" name="note" value={data.note} onChange={handleChange} required />
      <br />
      <label>Game:</label>
      <input type="text" name="media_name" value={data.media_name} readOnly />
      <br />
      <button type="submit">Submit Note</button>
    </form>
}

export default NoteForm;