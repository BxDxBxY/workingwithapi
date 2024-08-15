function handleAddStudent(state, action) {
  state.push(action.payload);
}
function handleUpdateStudent(state, action) {
  const studentUpdateInfo = action.payload;
  console.log(studentUpdateInfo);
  const index = state.findIndex((s) => +s.id === +studentUpdateInfo?.id);

  if (index !== -1) {
    state[index] = { ...state[index], ...studentUpdateInfo };
  } else {
    console.log("Student not found");
  }
}
function handleDeleteStudent(state, action) {
  const deleteStudent = action.payload;
  const index = state.findIndex((s) => s.id == deleteStudent?.id);
  if (index !== -1) {
    state.splice(index, 1);
  } else {
    console.log("Student not found");
  }
}

export { handleAddStudent, handleDeleteStudent, handleUpdateStudent };
