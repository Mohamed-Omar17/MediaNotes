import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import AddNoteForm from './AddNoteForm';


function Card() {

    const { mediaId } = useParams();
    const navigate = useNavigate();

    const location = useLocation();
    const notes = location.state || []; // fallback to [] if undefined

    const [data, setData] = useState(notes);

    useEffect(() => {
    axios.get(`http://localhost:3100/api/${mediaId}`)
      .then(response => {
        console.log("Fetched notes:", response.data);
        setData(response.data.postData); // or whatever key your backend returns
      })
      .catch(error => {
        console.error("Error fetching notes:", error);
      });
  }, [mediaId]);


    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3100/api/delete/${id}`);
        setData(prevData => prevData.filter(item => item.id !== id));
        navigate("/");
      }
      catch(error) {
        console.error("Error deleting item:", error);
      }
    }

  const gameTitle = data.length > 0 ? data[0].name : navigate('/');
    

  return (
    <div>
      <h2>Notes For: {gameTitle || "Empty"}</h2>
      {data.map((item, index) => (
        <div key={index} className="card">
          <h3>{item.name}</h3>
          <p>{item.id}</p>
          <p>{item.title}</p>
          <p>{item.media}</p>
          <p>{item.email}</p>
          <div className="main-section__item">
            <button className="bit16-button has-red-background" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
      <AddNoteForm title={gameTitle} />
    </div>
  )
}

export default Card;