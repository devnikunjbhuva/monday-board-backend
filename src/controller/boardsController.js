const { modifyWordDocument } = require('../service/board.service');
const { removeFile } = require('../service/file.service');

const generateWordDocument = async (req, res, next) => {
  const boardId = parseInt(req.params.boardId);
  const filePath = req.file.path;
  try {
    // This function will update the uploaded word file in the needed format
    await modifyWordDocument(boardId, filePath);

    res.download(filePath, 'file.docx', function (err) {
      if (err) {
        throw new Error(err);
      } else {
        // Remove the file after it is being send in response
        removeFile(filePath);
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  generateWordDocument,
};
