import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./list.css"; // Ensure this path is correct




























const StudentCard = ({ student }) => (
    student.langues && (
      <a
        href={`https://interactive.convai.com/character-id=${student.charID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link"
      >
        <div className="card" style={{ backgroundColor: 'var(--card-bg-color)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '280px', minWidth: '280px' }}>
          <div className="card-inner">
            <div className="card-content">
              {/* Emphasizing the name with larger font size and bold weight */}
              <div className="card-title" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-color)' }}>
                {`${student.surname}, ${student.name}`}
              </div>
              {/* Making GitHub link standout */}
              <a
                href={`https://github.com/${student.GitHubLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
                style={{ fontWeight: '500', color: 'var(--link-color)' }} // Slightly bolder than normal text for emphasis
              >
                GitHub: <span style={{ textDecoration: 'underline', color: 'var(--link-color)' }}>{student.GitHubLink}</span>
              </a>
              {/* Languages Section Enhancement */}
              <div className="card-description" style={{ marginTop: '10px', color: 'var(--text-color)' }}>
                <span style={{ fontWeight: 'bold' }}>Languages:</span>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-color)' }}> {/* Indent list for better structure */}
                  {student.langues.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </a>
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