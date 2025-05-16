import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import Card from './Card';
import AddNoteForm from './AddNoteForm';
import Test from '../../pages/Test';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </>
  )
}

export default App
