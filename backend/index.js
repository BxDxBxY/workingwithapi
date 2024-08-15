const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const filePath = path.join(__dirname, '../../students.json');

app.post('/api/update-student', (req, res) => {
  const studentUpdateInfo = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading the file' });
    }

    let students_list = JSON.parse(data);
    const index = students_list.findIndex(s => s.name === studentUpdateInfo.name);

    if (index !== -1) {
      students_list[index] = { ...students_list[index], ...studentUpdateInfo };

      fs.writeFile(filePath, JSON.stringify(students_list, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error writing to the file' });
        }
        res.json({ message: 'Student information updated successfully' });
      });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
