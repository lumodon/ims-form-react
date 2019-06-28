export const userReducer = (_previousState, action) => {
  switch (action.type) {
    case 'update':
      return {'usersList': action.newUserList}
    default:
      throw new Error()
  }
}
