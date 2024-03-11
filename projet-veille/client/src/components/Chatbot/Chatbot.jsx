import React from "react";
import { useState } from "react";

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const apiKey = "b22b5ea5b583d8763f62f2ecf7ea384c";
    const charID = "70ddeb78-3299-11ee-a0d5-42010a40000b";
    const url = "https://api.convai.com/character/getResponse";

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

            const payload = {
                userText: inputValue,
                charID: "70ddeb78-3299-11ee-a0d5-42010a40000b",
                sessionID: "-1",
                voiceResponse: "False",
            };

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "CONVAI-API-KEY": apiKey,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                // Make sure that data contains the 'text' property
                if (data && data.character_id) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: data.text, author: "bot" },
                    ]);
                } else {
                    // Handle the case where 'text' is not in the response
                    console.error("Received an unexpected response:", data);
                }
            } catch (error) {
                console.error("Error:", error);
            }
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
                <form onSubmit={sendMessage} className="flex">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        id="charID"
                        value="70ddeb78-3299-11ee-a0d5-42010a40000b"
                        className="hidden"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
