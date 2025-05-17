import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function AddNoteForm(props) {
  const [data, setData] = useState({
    email : '',
    title: '',
    note : '',
    media_name : ''
  });

  const handleChange = (e) => {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    setData(prev => ({
      ...prev,
      media_name: props.title
    }));
  }, [props.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3100/add-note', data);
      alert('Note submitted successfully!');
    } catch (err) {
      console.error('Error submitting note:', err.response.data);
      alert('Failed to submit note.');
    }
  };

  return (
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
  );
}

export default AddNoteForm;