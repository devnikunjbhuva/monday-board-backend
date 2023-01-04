const boardItemsQuery = `
query ($boardId: [Int], $itemLimit: Int, $columnIds: [String]) {
  boards (ids: $boardId) {
    name
    state
    items (limit: $itemLimit) {
      id
      name
      column_values (ids: $columnIds) {
        id
        text
      }
    }
  }
}`;

module.exports = boardItemsQuery;
