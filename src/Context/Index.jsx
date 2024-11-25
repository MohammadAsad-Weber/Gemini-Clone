import React, { createContext, useState } from 'react';
export const GeminiContext = createContext(); // Creating Context

function Index(props) {

    // State for Messages
    const [messagesArray, setMessagesArray] = useState([]);

    // State for Loading
    const [isLoading, setIsLoading] = useState(false);

    // State for History
    const [historyArray, setHistoryArray] = useState([]);

    return (
        <GeminiContext.Provider value={{
            messagesArray,
            historyArray,
            isLoading, 
            setMessagesArray,
            setHistoryArray,
            setIsLoading
        }}>
            {props.children}
        </GeminiContext.Provider>
    )
}

export default Index;