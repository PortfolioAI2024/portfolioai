import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./list.css"; // Ensure this path is correct
import profilePicture from "./assets/pfp.png"; // Import the profile picture

const StudentCard = ({ student }) => (
    student.langues && (
        <Link
            to={`https://interactive.convai.com/character-id=${student.charID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
        >
            <div className="card" style={{ backgroundColor: 'var(--card-bg-color)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '280px', minWidth: '280px' }}>
                <div className="card-inner">
                    <div className="profile-container"> {/* Container to center the profile picture */}
                        <img src={profilePicture} alt="Profile" className="profile-picture" style={{ width: '80px', height: '80px', borderRadius: '50%', display: 'block', margin: 'auto' }} />
                    </div>
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
        </Link>
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
            <header className="header"> {/* Header container */}
                <div className="header-content"> {/* Header content */}
                    <div className="portfolio-title">PortfolioAI</div> {/* Text at the top left */}
                    <div className="header-buttons"> {/* Header buttons */}
                        <Link to="/login">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button"> {/* Added button class */}
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded button ml-2"> {/* Added button class */}
                                Signup
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
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
