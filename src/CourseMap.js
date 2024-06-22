import React from 'react';
import './CourseMap.css';

const CourseMap = () => {
    return (
    <div>
        <h2>Course Map</h2>
        <div className="group_selection">
            {/* ... (existing group selection checkboxes) */}
        </div>

        <h2 style={{ textAlign: 'center' }}>
            Get a description of each EECS Academic Area here: <a href="https://www2.eecs.berkeley.edu/Research/Areas/">EECS Research Areas</a>
        </h2>

        {/* Add the image div */}
        <div className="image-container">
            < div class="container">
                <img src="/coursemap.png" alt="Course Map" />
            </div> 
        </div>

        {/* Add the input box for subfield interest */}
        <div className="subfield-interest">
            <label htmlFor="subfield">Interested in a specific subfield?</label>
            <input type="text" id="subfield" name="subfield" placeholder="Enter subfield" />
        </div>

        <div style={{ width: '100%', overflow: 'scroll' }}>
            <svg className="graph" width="2000" height="1200"></svg>
        </div>
    </div>
);

}
export default CourseMap;