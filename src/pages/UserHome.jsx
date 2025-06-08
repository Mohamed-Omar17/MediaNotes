import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../client/reactComponents/index.scss'


function UserHome() {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const [selectedGame, setSelectedGame] = useState(null);

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3100/api/delete/${id}`);
        setData(prevData => prevData.filter(item => item.id !== id));
      }
      catch(error) {
        console.error("Error deleting item:", error);
      }
    }

    const handleCardClick = (mediaId, mediaTitle) => {
        axios.get(`http://localhost:3100/api/${mediaId}`)
            .then(response => {
                console.log("Fetched notes:", response.data);
                // Optional: pass notes via state if you want
                navigate(`/notes/${mediaId}`, { state: response.data.postData });
            })
            .catch(error => {
                console.error("Error fetching notes:", error);
        });
  };


    const createNewNoteWithGame = () => {
        navigate(`/create-note`);
    };


    useEffect(() => {
    axios.get('http://localhost:3100/media')
    .then(response => {
      console.log('Fetched data:', response.data); 
      setData(response.data.postData);
    })
    .catch(error => {
      console.log('Error fetching data:', error)
    })
    }, []);

  return (
    <div className="select-game-div">
      <div>
        <h2 className="component-header" style={{fontSize: '40px'}}>Your Media</h2>
        <div className="card-box">
        {data.map((item, index) => (
          <button
              key={index}
              onClick={() => handleCardClick(item.id, item.title)}
              className="card"
          >
              <div>
              <h3>{item.name}</h3>
              <p>{item.title}</p>
              <p>{item.media_type}</p>
              <p>{item.user_email}</p>
              </div>
          </button>
        ))}
        </div>
      </div>
      <div>
        <button
              onClick={() => createNewNoteWithGame()}
          >
              Create Note
          </button>
      </div>
    </div>
  )
}


export default UserHome;