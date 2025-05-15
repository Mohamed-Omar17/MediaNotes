import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function Card() {

    const [data, setData] = useState([])

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
          <p>{item.title}</p>
          <p>{item.media}</p>
          <p>{item.email}</p>
        </div>
      ))}
    </div>
  )
}

export default Card;