import React, { useContext, useState } from 'react';
import API_KEY from '../../GEMINI_API_KEY'; // API Key
import MessageBox from '../MessageBox/MessageBox'; // Component
import { GeminiContext } from '../../Context/Index'; // Context API
import './SideBar.css'; // StyleSheet

// Images
import User from '../../assets/User.png';
import Bot from '../../assets/ChatBot.png';

function SideBar() {

    // Using Context
    const { historyArray,
            setMessagesArray,
            setIsLoading } = useContext(GeminiContext);

    // State for Toggle Sidebar
    const [sidebarShow, setSidebarShow] = useState(true)

    // Function for New Chat
    const newChat = () => {
        setMessagesArray([]);
    }

    // Function to fetch history
    const fetchHistory = async (history) => {
        try {
            setMessagesArray([<MessageBox img={User} message={history} />]);

            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "contents": [{ "parts": [{ "text": history }] }] })
            };

            setIsLoading(true);

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, options);
            const data = await response.json();
            const AI_Message = await data.candidates[0].content.parts[0].text;

            setIsLoading(false);
            setMessagesArray(prevMessages => prevMessages.concat(<MessageBox img={Bot} message={AI_Message} />));

        } catch (error) {
            setTimeout(() => {
                setIsLoading(false);
                setMessagesArray(prevMessages => prevMessages.concat(<MessageBox img={Bot} message="Some error occured. Please try again later!" />));
            }, 5000)
        }
    }

    // Function for History
    const handleClick = (event) => {
        fetchHistory(event.target.textContent)
    }

    return (
        <div id='sidebar' style={sidebarShow ? { width: '100%' } : { width: '75px' }}>
            {/* MENU ICON */}
            <button id='menu' onClick={() => { setSidebarShow(!sidebarShow) }}><i className='bx bx-menu'></i></button>

            {/* SIDEBAR CONTENT */}
            <div id="sidebar-content">

                {/* NEW CHAT BUTTON */}
                <button id="new-chat" onClick={newChat} style={sidebarShow ? { width: '130px' } : { width: '45px' }}><i className='bx bx-plus'></i> New Chat</button>

                {/* HISTORY */}
                <div id="recents" style={sidebarShow ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                    <h4>Recent</h4>
                    <div id="history">
                        {historyArray.length !== 0 && historyArray.map((element, index) => {
                            return (
                                <button key={index} onClick={handleClick} className="history">
                                    <i className='bx bx-comment'></i>
                                    {element}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* SETTINGS */}
                <div id="setting">
                    <button className='setting' style={sidebarShow ? { width: '100%' } : { width: '45px' }}><i className='bx bx-diamond'></i>Gem manager</button>
                    <button className='setting' style={sidebarShow ? { width: '100%' } : { width: '45px' }}><i className='bx bx-help-circle'></i>Help</button>
                    <button className='setting' style={sidebarShow ? { width: '100%' } : { width: '45px' }}><i className='bx bx-history'></i>Activity</button>
                    <button className='setting' style={sidebarShow ? { width: '100%' } : { width: '45px' }}><i className='bx bx-cog'></i>Setting</button>
                </div>
            </div>
        </div>
    )
}

export default SideBar;