import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import Card from './Card';
import AddNoteForm from './AddNoteForm';

function App() {

  return (
    <div>
    <Card />
    <AddNoteForm />
    </div>
  )
}

export default App
