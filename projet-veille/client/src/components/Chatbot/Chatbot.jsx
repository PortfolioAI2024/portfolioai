import React, { useState } from 'react';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const apiKey = 'b22b5ea5b583d8763f62f2ecf7ea384c'; // Removed < >
    const url = 'https://api.convai.com/character/getResponse';

    const sendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const userMessage = {
                text: inputValue,
                author: 'user',
            };

            // Optimistically add the user message to the state
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            // Reset the input field
            setInputValue('');

            const payload = {
                userText: inputValue,
                charID: '70ddeb78-3299-11ee-a0d5-42010a40000b', // Removed < >
                sessionID: '-1',
                voiceResponse: 'False'
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'CONVAI-API-KEY': apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // Make sure that data contains the 'text' property
                if (data && data.text) {
                    setMessages((prevMessages) => [...prevMessages, { text: data.text, author: 'bot' }]);
                } else {
                    // Handle the case where 'text' is not in the response
                    console.error('Received an
