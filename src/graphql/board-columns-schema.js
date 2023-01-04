const BoardColumnsQuery = `
query ($boardId: [Int]) {
  boards (ids: $boardId) {
    name
    state
    columns {
      id
      title
      type
    }    
  }
}`;

module.exports = BoardColumnsQuery;
