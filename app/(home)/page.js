"use client";
import React, { useState } from 'react';

// Updated dummy data for the students
const students = [
  { id: 1, nom: "Doe", prenom: "Moha", prix: "1$/h", github: "moha-github", ecole: "Cegep De Maisonneuve" },
  { id: 2, nom: "Smith", prenom: "Alex", prix: "95$/h", github: "alex-github", ecole: "Cegep De Maisonneuve" },
  { id: 3, nom: "Johnson", prenom: "Aimen", prix: "4$/h", github: "aimen-github", ecole: "Cegep De Maisonneuve" },
  { id: 4, nom: "Rodriguez", prenom: "Pedro", prix: "19$/h", github: "pedro-github", ecole: "Cegep De Maisonneuve" }
];

const StudentCard = ({ student }) => (
  <div
    className="bg-white dark:bg-gray-800 dark:text-white bg-opacity-75 border border-gray-300 dark:border-gray-600 shadow-lg p-4 m-2 rounded-md text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    onClick={() => alert(`Nom: ${student.nom}\nPrénom: ${student.prenom}\nPrix: ${student.prix}\nGithub: ${student.github}\nÉcole: ${student.ecole}`)}
  >
    <div className="font-bold text-lg">{`${student.prenom} ${student.nom}`}</div>
    <div className="text-gray-700 dark:text-gray-300">{`Prix: ${student.prix}`}</div>
    <a href={`https://github.com/${student.github}`} className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300">{`Github: ${student.github}`}</a>
    <p className="text-gray-700 dark:text-gray-300">{`École: ${student.ecole}`}</p>
  </div>
);

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex justify-between items-center p-4 dark:bg-gray-900 dark:text-white">
        <h1 className="text-4xl font-bold my-6 text-center">Meet Our Interns</h1>
        <button
          className="bg-gray-200 dark:bg-gray-600 p-2 rounded-full"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 place-items-center">
        {students.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
      <p className="text-center my-4 dark:text-gray-300">Click on one of our team members to directly talk with them.</p>
    </div>
  );
};

export default Home;
