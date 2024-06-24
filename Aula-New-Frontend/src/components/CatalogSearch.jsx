import React, { useState, useEffect } from "react";
import "./CatalogSearch.css";
import { useNavigate } from "react-router-dom";
import ClassCard from './ClassCard';
import {
  Form,
  Dropdown,
  InputGroup,
} from "react-bootstrap";

const CatalogSearch = ({ setActiveTab }) => {
  const [csvData, setCsvData] = useState([]);
  const [csvProfessorData, setCsvProfessorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [courseLevel, setCourseLevel] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/classes')
      .then(response => response.json())
      .then(data => {
        setCsvData(data);
      })
      .catch(error => console.error('Error fetching CSV data:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/professors')
      .then(response => response.json())
      .then(data => setCsvProfessorData(data))
      .catch(error => console.error('Error fetching CSV data:', error));
  }, []);
  
  const professorMap = new Map(csvProfessorData.map(prof => [prof["Name"], prof]));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
  };

  const handleCourseLevelChange = (e) => {
    setCourseLevel(e.target.value);
  };

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value.toLowerCase());
  };

  const handleReviewClick = (professorName) => {
    setActiveTab('reviews');
    navigate('/', { state: { activeTab: 'reviews', professorName } });
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const getCourseLevel = (courseCode) => {
    const numberPart = parseInt(courseCode.replace(/\D/g, ''));
    if (numberPart >= 200) return "grad";
    if (numberPart >= 100) return "upper";
    return "lower";
  };

  const matchesSearchQuery = (row, query) => {
    const searchTerms = query.split(' ');
    return searchTerms.every(term => 
      row["Course Code"].toLowerCase().replace(/\s/g, '').includes(term) ||
      row["Title"].toLowerCase().includes(term) ||
      row["Instructor"].toLowerCase().includes(term)
    );
  };

  const filteredData = csvData.filter(row => 
    (selectedDepartment === "All" || row["Course Code"].startsWith(selectedDepartment)) &&
    matchesSearchQuery(row, searchQuery) &&
    (courseLevel === "all" || getCourseLevel(row["Course Code"]) === courseLevel)
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === "rating") {
      return (professorMap.get(b["Instructor"])?.Rating || 0) - (professorMap.get(a["Instructor"])?.Rating || 0);
    } else if (sortOption === "difficulty") {
      return (professorMap.get(a["Instructor"])?.Difficulty || 0) - (professorMap.get(b["Instructor"])?.Difficulty || 0);
    }
    return 0;
  });

  const departments = ["All", ...new Set(csvData.map(row => row["Course Code"].split(' ')[0]))];
  const filteredDepartments = departments.filter(dept => 
    dept.toLowerCase().includes(departmentFilter.toLowerCase())
  );

  return (
    <div className="main">
      <div className="search-controls">
        <div className="control-row">
          <Form.Group controlId="searchQuery" className="course-search">
            <Form.Control
              type="text"
              placeholder="Search courses"
              className="form-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
          <InputGroup className="department-filter">
            <Form.Control
              placeholder="Filter departments"
              value={departmentFilter}
              onChange={handleDepartmentFilterChange}
            />
            <Dropdown as={InputGroup.Append}>
              <Dropdown.Toggle variant="outline-secondary">
                {selectedDepartment || "Select"}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{maxHeight: '250px', overflowY: 'auto', columns: '4'}}>
                {filteredDepartments.map((dept, index) => (
                  <Dropdown.Item key={index} onClick={() => handleDepartmentChange(dept)}>
                    {dept}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </div>
        <div className="control-row">
          <Dropdown className="course-level">
            <Dropdown.Toggle variant="outline-secondary">
              {courseLevel === "all" ? "Course Level" : `${courseLevel.charAt(0).toUpperCase() + courseLevel.slice(1)} Division`}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCourseLevelChange({ target: { value: "all" } })}>All Levels</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCourseLevelChange({ target: { value: "lower" } })}>Lower Division (0-99)</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCourseLevelChange({ target: { value: "upper" } })}>Upper Division (100-199)</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCourseLevelChange({ target: { value: "grad" } })}>Graduate (200+)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="sort-options">
            <Dropdown.Toggle variant="outline-primary">
              {sortOption === "none" ? "Sort By" : `Sorted by ${sortOption}`}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortChange("none")}>No Sort</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("rating")}>Sort by Rating</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange("difficulty")}>Sort by Difficulty</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="class-card-grid">
        {sortedData.map((row, index) => (
          <div key={index}>
            <ClassCard
              classNumber={row["Course Code"]}
              classTitle={row["Title"]}
              classTime={`${row["Days"]} ${row["Time"]}`}
              professorName={row["Instructor"]}
              professorRating={professorMap.get(row["Instructor"])?.Rating || "N/A"}
              professorDifficulty={professorMap.get(row["Instructor"])?.Difficulty || "N/A"}
              overallRating={professorMap.get(row["Instructor"])?.["Would Take Again"] || "N/A"}
              onReviewClick={handleReviewClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogSearch;