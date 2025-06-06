import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddNoteWithGame(props) {
    const minHeight=props.minHeight;
    const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3100/add-note-with-game', data);
      alert('Note submitted successfully!');
      navigate("/")

    } catch (err) {
      console.error('Error submitting note:', err.response.data);
      alert('Failed to submit note.');
    }
  };

  return (
    <div className="center-form-vertically" style={{minHeight: minHeight || '100vh'}}>
    <div className="submission-box">
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Email:</label>
        <input type="text" name="email" value={data.email} onChange={handleChange} required />
        <br />
      </div>
      <div className="form-row">
        <label>Note Title:</label>
        <input type="text" name="title" value={data.title} onChange={handleChange} required />
        <br />
      </div>
      <div className="form-row">
        <label>Note:</label>
        <input type="text" name="note" value={data.note} onChange={handleChange} required />
        <br />
      </div>
      
      <div className="form-row">
        <label>Game:</label>
        <input type="text" name="media_name" value={data.media_name} onChange={handleChange} required />
        <br />
      </div>
      
      <button type="submit" style={{color: '#0f0', backgroundColor: 'black'}}><p style={{padding: '2px'}}>Submit Note</p></button>
    </form>
    </div>
    </div>
  );
}

export default AddNoteWithGame;