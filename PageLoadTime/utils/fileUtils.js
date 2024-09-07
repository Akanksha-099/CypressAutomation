const fs = require('fs');

// Create directories if they don't exist
function createDirs(...dirs) {
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  });
}

// Save load times to a JSON file (appending)
function saveLoadTimes(loadTimes, loadTimesFilePath) {
  let existingData = [];

  // Check if the file exists and read the existing data
  if (fs.existsSync(loadTimesFilePath)) {
    const fileContents = fs.readFileSync(loadTimesFilePath, 'utf8');
    existingData = JSON.parse(fileContents);
  }

  const updatedData = [...existingData, ...loadTimes];
  fs.writeFileSync(loadTimesFilePath, JSON.stringify(updatedData, null, 2));
  console.log(`Load times saved to ${loadTimesFilePath}`);
}

module.exports = { createDirs, saveLoadTimes };

// Create directories if they don't exist
function createDirs(...dirs) {
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  });
}

// Save load times to a JSON file (appending)
function saveLoadTimes(loadTimes, loadTimesFilePath) {
  let existingData = [];

  // Check if the file exists and read the existing data
  if (fs.existsSync(loadTimesFilePath)) {
    const fileContents = fs.readFileSync(loadTimesFilePath, 'utf8');
    existingData = JSON.parse(fileContents);
  }

  const updatedData = [...existingData, ...loadTimes];
  fs.writeFileSync(loadTimesFilePath, JSON.stringify(updatedData, null, 2));
  console.log(`Load times saved to ${loadTimesFilePath}`);
}

module.exports = { createDirs, saveLoadTimes };
