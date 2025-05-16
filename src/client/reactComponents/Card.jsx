import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function Card() {

    const [data, setData] = useState([])

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3100/api/delete/${id}`);
        setData(prevData => prevData.filter(item => item.id !== id));
      }
      catch(error) {
        console.error("Error deleting item:", error);
      }
    }


    useEffect(() => {
    axios.get('http://localhost:3100/api')
    .then(response => {
      console.log('Fetched data:', response.data); 
      setData(response.data.postData);
    })
    .catch(error => {
      console.log('Error fetching data:', error)
    })
  }, [])

  return (
    <div>
      <h2>Card Component</h2>
      {data.map((item, index) => (
        <div key={index} className="card">
          <h3>{item.name}</h3>
          <p>{item.id}</p>
          <p>{item.title}</p>
          <p>{item.media}</p>
          <p>{item.email}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Card;