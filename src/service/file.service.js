const fs = require('fs');

// Write data in file
const writeDataInFile = (filePath, data) => {
  fs.writeFileSync(filePath, data);
};

// Delete file
const removeFile = (filePath) => {
  fs.unlinkSync(filePath);
};

module.exports = {
  writeDataInFile,
  removeFile,
};
