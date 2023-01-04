const initMondayClient = require('monday-sdk-js');
const {
  COLUMN_LIMIT,
  ITEM_LIMIT,
  EXLUDED_COLUMNS,
} = require('../constants/constants');
const BoardColumnsQuery = require('../graphql/board-columns-schema');
const boardItemsQuery = require('../graphql/board-items-schema');

const getBoardItems = async (boardId) => {
  // Getting monday api secret key
  const token = process.env.MONDAY_SIGNING_SECRET;

  // Initialize monday client with token
  const mondayClient = initMondayClient({
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzI5MjU0NzAsImRhdCI6eyJjbGllbnRfaWQiOiIxMDJiOTcyNDUyNzhjNmYxZTIzYjU4MjFiYmU4ZTc4NCIsInVzZXJfaWQiOjM3NzkyNzEwLCJhY2NvdW50X2lkIjoxNDY1OTUzMywic2x1ZyI6InByb2V4ZWxhbmNlcnMiLCJhcHBfaWQiOjEwMDUwNjAzLCJhcHBfdmVyc2lvbl9pZCI6MTAwNzMxODMsImluc3RhbGxfaWQiOjEwMzU4NDU0LCJpc19hZG1pbiI6dHJ1ZSwiaXNfdmlld19vbmx5IjpmYWxzZSwiaXNfZ3Vlc3QiOmZhbHNlLCJ1c2VyX2tpbmQiOiJhZG1pbiJ9fQ.dCnaMYPPszktmjxvUKsylF2ytcH8_HqnwSQjOxUXyKY',
  });

  // Fetch board with its columns
  const boardWithColumns = await mondayClient.api(BoardColumnsQuery, {
    variables: { boardId },
  });

  // Send error if we api throws error
  if (boardWithColumns.errors) {
    throw new Error(boardWithColumns.errors[0].message);
  }
  console.log('boardWithColumns', boardWithColumns);

  // This line will return first board from the list because board api is always returning data in the form of array
  const boardData = boardWithColumns.data.boards.find(() => true);
  console.log('boardData', boardData);

  // Filter out the subitems from the columns
  let columns = boardData?.columns?.filter((column) => {
    return !EXLUDED_COLUMNS.includes(column.id);
  });

  // After filtering subitems fetching first 5 columns from the list
  columns = columns.slice(0, COLUMN_LIMIT);

  // Fetching column ids
  let columnIds = columns.map((column) => {
    return column.id;
  });

  // Fetch board with top 10 items with only column values those id is present in 'columnIds'
  const boardItems = await mondayClient.api(boardItemsQuery, {
    variables: { boardId, itemLimit: ITEM_LIMIT, columnIds },
  });

  // Send error if we api throws error
  if (boardItems.errors) {
    throw new Error(boardItems.errors[0].message);
  }

  return { boardItems: boardItems.data.boards.find(() => true), columns };
};

module.exports = {
  getBoardItems,
};
