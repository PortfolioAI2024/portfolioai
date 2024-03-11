import { useState } from 'react';

export default function CreateChatbot(props) {
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    voiceType: '',
    aboutYourself: ''
  });

  const apiKey = 'b22b5ea5b583d8763f62f2ecf7ea384c';
  const url = 'https://api.convai.com/character/create';

  function createBot() {
    // Convert your formData to JSON if that's what the API expects
    const json = JSON.stringify({
      charName: formData.fullName,
      voiceType: formData.voiceType,
      backstory: formData.aboutYourself
    });

    fetch(url, {
      method: 'POST',
      headers: {
        'CONVAI-API-KEY': apiKey,
        'Content-Type': 'application/json'
      },
      body: json // Use the JSON string here
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResponse(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevState => {
      const updatedFormData = { ...prevState, [name]: value };
      console.log(updatedFormData);
      return updatedFormData;
    });
  }

  return (
    <div>
      <div className="w-1/2 mx-auto p-8 float-right bg-black h-full">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Create your chatbot</h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm text-white font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white font-medium text-gray-700">
              Character Voice
            </label>
            <select id="voiceType" name="voiceType" value={formData.voiceType} onChange={handleChange}>
              <option disabled selected value> -- select a voice -- </option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
          </div>
          <div>
            <label htmlFor="aboutYourself" className="block text-sm text-white font-medium text-gray-700">
              Say as much as possible about yourself...
            </label>
            <textarea
              id="aboutYourself"
              name="aboutYourself"
              value={props.userDescription.userDescription}
              onChange={handleChange}
              rows="4"
              placeholder="Your message..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            onClick={createBot}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
