import axios from 'axios';
import React,{useState} from 'react';
import Dropzone from 'react-dropzone';
import './App.css';
import Container from './components/submitform';
import Results from './components/nutresult';
const App = () => {

  return(
　　<div>
    <Container/>
    <Results/>
   </div>
  )

}
export default App;