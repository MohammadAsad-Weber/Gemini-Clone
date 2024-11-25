import React from 'react';
import './App.css'; // StyleSheet

// Components
import NavBar from './Components/NavBar/NavBar';
import SideBar from './Components/SideBar/SideBar';
import ChatBox from './Components/ChatBox/ChatBox';

function App() {
  return (
    <div id='gemini'>
      <SideBar />
      <div id="right-container">
        <NavBar />
        <ChatBox />
      </div>
    </div>
  )
}

export default App;