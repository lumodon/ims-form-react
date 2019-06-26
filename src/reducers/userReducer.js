export const userReducer = (state, action) => {
  console.error('REDUCER USED state: ', state, '\naction: ', action)
  void state
  switch (action.type) {
    case 'update':
      return {'usersList': action.newUserList}
    default:
      throw new Error()
  }
}
