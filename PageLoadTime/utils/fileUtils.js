const fs = require('node:fs');

function createDirs(...dirs) {
  dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));
}

function saveLoadTimes(loadTimes, loadTimesFilePath) {
  let existingData = [];

  if (fs.existsSync(loadTimesFilePath)) {
    const fileContents = fs.readFileSync(loadTimesFilePath, 'utf8');
    existingData = JSON.parse(fileContents);

    if (!Array.isArray(existingData)) {
      throw new TypeError(`Expected an array in ${loadTimesFilePath}`);
    }
  }

  const updatedData = [...existingData, ...loadTimes];
  fs.writeFileSync(loadTimesFilePath, JSON.stringify(updatedData, null, 2));
  console.log(`Load times saved to ${loadTimesFilePath}`);
}

module.exports = { createDirs, saveLoadTimes };
