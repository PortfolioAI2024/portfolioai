"use client";
import React from 'react';

// Updated dummy data for the students
const students = [
  { id: 1, nom: "Doe", prenom: "Moha", prix: "$5000", github: "moha-github", ecole: "Cegep De Maisonneuve" },
  { id: 2, nom: "Smith", prenom: "Alex", prix: "$5500", github: "alex-github", ecole: "Cegep De Maisonneuve" },
  { id: 3, nom: "Johnson", prenom: "Aimen", prix: "$5200", github: "aimen-github", ecole: "Cegep De Maisonneuve" },
  { id: 4, nom: "Rodriguez", prenom: "Pedro", prix: "$5300", github: "pedro-github", ecole: "Cegep De Maisonneuve" }
];

const StudentCard = ({ student }) => (
  <div className="bg-white bg-opacity-75 border border-gray-300 shadow-lg p-4 m-2 rounded-md text-center">
    <div className="font-bold text-lg">{`${student.prenom} ${student.nom}`}</div>
    <div className="text-gray-700">{`Prix: ${student.prix}`}</div>
    <a href={`https://github.com/${student.github}`} className="text-blue-500 hover:text-blue-700">{`Github: ${student.github}`}</a>
    <p className="text-gray-700">{`École: ${student.ecole}`}</p>
  </div>
);

const Home = () => {
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold my-6 text-center">Meet Our Interns</h1>
      <div className="grid grid-cols-4 gap-4 place-items-center">
        {students.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
      <p className="text-center my-4">Click on one of our team members to directly talk with them.</p>
    </div>
  );
};

export default Home;
