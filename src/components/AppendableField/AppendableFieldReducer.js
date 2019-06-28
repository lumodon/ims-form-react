export default function AppendableFieldReducer(currentState, action) {
  const caseSwitch = {
    'appendList': () => {
      return {
        listOfFields: {
          ...currentState.listOfFields,
          [action.newField.name]: {value: ''}
        }
      }
    },
    'removeFromList': () => {
      const modifiedList = {...currentState.listOfFields}
      delete modifiedList[action.fieldName]
      return {listOfFields: modifiedList}
    },
    'setValue': () => {
      const modifiedList = {...currentState.listOfFields}
      modifiedList[action.fieldName].value = action.value
      return {listOfFields: modifiedList}
    }
  }[action && action.type]
  if(caseSwitch) return caseSwitch()
  else throw new Error()
}
