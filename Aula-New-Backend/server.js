const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 5001; // Backend server port
const cors = require('cors');
app.use(cors());

app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (req, res) => {
  res.send('Hello from the Node backend!');
});

app.post('/run-python', (req, res) => {
  const scriptPath = './script.py'; // Path to your Python script
  const dataToSend = req.body.data; // Data received from the client (React app)

  const pythonProcess = spawn('python', [scriptPath, dataToSend]);

  let result = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(result);
  });
});

const recommendCourses = (subject) => {
  // Mock data for demonstration
  const courses = [
    { courseName: 'Introduction to Artificial Intelligence - CS188', professorName: 'Professor John', classRating: '4.5/5.0', professorRating: '4.0/5.0' },
    { courseName: 'Technology in Music - Music 135', professorName: 'Professor John Smith', classRating: '4.5/5.0', professorRating: '4.0/5.0' },
    // Add more courses here
  ];

  // Filter courses based on subject (simple example)
  return courses.filter(course => course.courseName.toLowerCase().includes(subject.toLowerCase()));
};

app.get('/recommend', (req, res) => {
  const subject = req.query.subject;
  const recommendations = recommendCourses(subject);
  res.json(recommendations);
});

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
