

import React, { useState, useContext } from 'react';
import { AuthContext } from "../../AuthContext";

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const { userId, charID } = useContext(AuthContext);


    const apiKey = 'b22b5ea5b583d8763f62f2ecf7ea384c'; // Removed < >
    const url = 'https://api.convai.com/character/getResponse';

    const sendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const userMessage = {
                text: inputValue,
                author: "user",
            };
            const data = new FormData();
            // Access FormData fields with `data.get(fieldName)`
            // For example, converting to upper case
            data.set("charID", data.get("charID"));
            // Optimistically add the user message to the state
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            // Reset the input field
            setInputValue("");


            const myHeaders = new Headers();
            myHeaders.append("CONVAI-API-KEY", "b22b5ea5b583d8763f62f2ecf7ea384c");

            const formdata = new FormData();
            formdata.append("userText", inputValue);
            formdata.append("charID", charID);
            formdata.append("sessionID", "-1");
            formdata.append("voiceResponse", "False"); 

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            fetch("https://api.convai.com/character/getResponse", requestOptions)
            .then((response) => response.json())
                .then((result) => {
                    setMessages((prevMessages) => [...prevMessages, { text: result.text, author: 'bot' }]);
                })
                .catch((error) => console.error(error))
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="max-w-sm mx-auto border rounded-lg flex flex-col">
            <div className="bg-blue-500 text-white p-3 text-center">
                <h2>Live Chat</h2>
            </div>
            <div className="flex-grow overflow-auto p-3 space-y-2">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg ${
                            message.author === "user"
                                ? "bg-gray-200 ml-auto"
                                : "bg-blue-100"
                        }`}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="border-t p-3">
                <div className="flex">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
