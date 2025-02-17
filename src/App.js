import React, {useEffect} from 'react'
import SearchForm from './SearchForm'
import Stories from './Stories'
import Buttons from './Buttons'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {SearchPage} from './pages'
import { Header } from './header';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return <>
      <BrowserRouter>
      <div className='container'>
        {/* header here */}
        <Header />
        <Routes > 
          <Route path='/search' element = {<SearchPage/>} /> 
        </Routes> 
        <Stories />
        <Buttons />
      </div>
      </BrowserRouter>
  </>
}

export default App
