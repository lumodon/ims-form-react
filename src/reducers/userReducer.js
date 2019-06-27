export const userReducer = (state, action) => {
  void state
  switch (action.type) {
    case 'update':
      return {'usersList': action.newUserList}
    default:
      throw new Error()
  }
}
