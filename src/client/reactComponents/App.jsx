import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import Card from './Card';
import AddNoteForm from './AddNoteForm';
import Test from '../../pages/Test';
import LoginSignup from './LoginSignup';
import UserHome from '../../pages/UserHome';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/notes/:mediaId" element={<Card />} />
      </Routes>
    </>
  )
}

export default App
