import React, { useContext, useState } from 'react';
import API_KEY from '../../GEMINI_API_KEY'; // API Key
import { GeminiContext } from '../../Context/Index'; // Context API
import './ChatBox.css'; // StyleSheet

// Images
import User from '../../assets/User.png';
import Bot from '../../assets/ChatBot.png';

// Components
import MessageBox from '../MessageBox/MessageBox';
import Loading from '../Loading/Loading';

function ChatBox() {

    // Using Context
    const { messagesArray,
            isLoading,
            setMessagesArray,
            setHistoryArray,
            setIsLoading } = useContext(GeminiContext);

    // State for Prompt text
    const [text, setText] = useState('');

    // Function for handle prompt text
    const handleInput = (event) => {
        setText(event.target.textContent)
    };

    const textarea = document.getElementById('textarea');

    // Function to generate text
    const handleClick = async () => {
        try {
            textarea.textContent = '';
            setHistoryArray(prevHistory => prevHistory.concat(text));
            setMessagesArray(prevMessages => prevMessages.concat(<MessageBox img={User} message={text} />));

            const options = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "contents": [{ "parts": [{ "text": text }] }] })
            };

            setText('');
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

    return (
        <div id='chatbox'>
            {/* MESSAGES WILL APPEND HERE */}
            <div id="chat-area">
                {messagesArray.length !== 0 && messagesArray.map((element, index) => {
                    return <div key={index}>{element}</div>
                })}
                {isLoading && <Loading />}
            </div>

            {/* GREETING TEXT */}
            {messagesArray.length === 0 && <h1 id="greet">Hello, Asad</h1>}

            {/* OUTER INPUT BOX */}
            <div id="input-area">

                {/* INNER INPUT BOX */}
                <div id="input-box">

                    {/* INPUT */}
                    <p id='textarea'
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleInput}
                        textcontent={text}>
                    </p>

                    {/* PLACEHOLDER */}
                    {text.length === 0 && <div id="placeholder">Ask Gemini</div>}

                    {/* SEND BUTTON */}
                    <button id="send" onClick={handleClick} disabled={text.length === 0}>
                        <i className='bx bx-send'></i>
                    </button>
                </div>
            </div>

            {/* NOTE */}
            <div id="note">Gemini can make mistakes, so double-check it</div>
        </div>
    )
}

export default ChatBox;