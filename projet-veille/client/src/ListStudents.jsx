import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./list.css"; // Ensure this path is correct

const StudentCard = ({ student }) => (
    student.langues && (
      <div className="card">
        <div className="card-inner">
          <div className="card-content">
            {/* Emphasizing the name with larger font size and bold weight */}
            <div className="card-title" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--link-color)' }}>
              {`${student.surname}, ${student.name}`}
            </div>
            {/* Making GitHub link standout */}
            <a
              href={`https://github.com/${student.GitHubLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              style={{ fontWeight: '500' }} // Slightly bolder than normal text for emphasis
            >
              GitHub: <span style={{ textDecoration: 'underline' }}>{student.GitHubLink}</span>
            </a>
            {/* Languages Section Enhancement */}
            <div className="card-description" style={{ marginTop: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Languages:</span>
              <ul style={{ paddingLeft: '20px' }}> {/* Indent list for better structure */}
                {student.langues.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
  

export default function ListStudents({ students }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const filteredData = students.filter(student =>
      (student.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredStudents(filteredData);
  }, [searchTerm, students]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") ?? "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <>
      <div className={`container ${theme}`}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="theme-button" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
        <div className="student-grid">
          {filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </div>
    </>
  );
}
