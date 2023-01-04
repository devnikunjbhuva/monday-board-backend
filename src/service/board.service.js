var mammoth = require('mammoth');
const htmlDocx = require('html-docx-js');
const { getBoardItems } = require('./monday.service');
const { writeDataInFile } = require('./file.service');

const modifyWordDocument = async (boardId, filePath) => {
  // Getting board columns and items
  const { boardItems, columns } = await getBoardItems(boardId);

  // Getting word file data in the form of html
  const docData = await mammoth.convertToHtml({ path: filePath });

  // Setting table header dynamically from board columns
  let tableHeaders = '';
  columns.map((column) => {
    tableHeaders += `<th style="border:1px solid black; padding: 5px 10px"> ${column.title} </th>`;
  });

  // Setting table rows dynamically from board column values
  let tableRows = '';
  boardItems.items.map((item) => {
    tableRows += `<tr><td style="border:1px solid black; padding: 5px 10px">${item.name}</td>`;
    item.column_values.map((columnValue) => {
      tableRows += `<td style="border:1px solid black; padding: 5px 10px">${
        columnValue.text || '-'
      }</td>`;
    });
    tableRows += '</tr>';
  });

  // Create table structure
  const tableData = `
    <table style="width:100%; border:1px solid black; border-collapse: collapse">
      <tr>
        ${tableHeaders}
      </tr>
      ${tableRows}
    </table>
  `;

  // Replace <<table>> content in word file with actual table
  const dataAfterReplacingTable = docData.value.replace(
    /&lt;&lt;table&gt;&gt;/g,
    tableData
  );

  // Convert html to doc format that return data in the form of blob or buffer
  const docxBlobData = htmlDocx.asBlob(dataAfterReplacingTable);

  // Update current doc file content with the new content
  writeDataInFile(filePath, docxBlobData);
};

module.exports = {
  modifyWordDocument,
};
