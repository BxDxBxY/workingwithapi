import { createSlice } from "@reduxjs/toolkit";
import {
  handleAddStudent,
  handleUpdateStudent,
  handleDeleteStudent,
} from "./crud_methods.js";
// const STUDENTS_LIST = require("../../students.json");

const STUDENTS_LIST = [
  {
    name: "John",
    surname: "Doe",
    age: 21,
    group: "Group-1",
    phone: "+998330123456",
    id: "1722675781471",
  },
  {
    name: "Jane",
    surname: "Smith",
    age: 22,
    group: "Group-2",
    phone: "+998330234567",
    id: "1722675781472",
  },
  {
    name: "Alice",
    surname: "Johnson",
    age: 20,
    group: "Group-3",
    phone: "+998330345678",
    id: "1722675781473",
  },
  {
    name: "Bob",
    surname: "Brown",
    age: 23,
    group: "Group-4",
    phone: "+998330456789",
    id: "1722675781474",
  },
  {
    name: "Charlie",
    surname: "Davis",
    age: 19,
    group: "Group-5",
    phone: "+998330567890",
    id: "1722675781475",
  },
  {
    name: "Emily",
    surname: "Wilson",
    age: 21,
    group: "Group-6",
    phone: "+998330678901",
    id: "1722675781476",
  },
  {
    name: "Frank",
    surname: "Clark",
    age: 22,
    group: "Group-7",
    phone: "+998330789012",
    id: "1722675781477",
  },
  {
    name: "Grace",
    surname: "Martinez",
    age: 20,
    group: "Group-8",
    phone: "+998330890123",
    id: "1722675781478",
  },
  {
    name: "Hank",
    surname: "Lewis",
    age: 24,
    group: "Group-9",
    phone: "+998330901234",
    id: "1722675781479",
  },
  {
    name: "Ivy",
    surname: "Walker",
    age: 19,
    group: "Group-10",
    phone: "+998331012345",
    id: "1722675781480",
  },
  {
    name: "Jack",
    surname: "Hall",
    age: 21,
    group: "Group-1",
    phone: "+998331123456",
    id: "1722675781481",
  },
  {
    name: "Kelly",
    surname: "Allen",
    age: 23,
    group: "Group-2",
    phone: "+998331234567",
    id: "1722675781482",
  },
  {
    name: "Leo",
    surname: "Young",
    age: 20,
    group: "Group-3",
    phone: "+998331345678",
    id: "1722675781483",
  },
  {
    name: "Mia",
    surname: "King",
    age: 22,
    group: "Group-4",
    phone: "+998331456789",
    id: "1722675781484",
  },
  {
    name: "Nate",
    surname: "Wright",
    age: 24,
    group: "Group-5",
    phone: "+998331567890",
    id: "1722675781485",
  },
];

const studentsSlice = createSlice({
  name: "students",
  initialState: STUDENTS_LIST || [],
  reducers: {
    add_new_student: handleAddStudent,
    update_student: handleUpdateStudent,
    delete_student: handleDeleteStudent,
  },
});

export const { add_new_student, delete_student, update_student } =
  studentsSlice.actions;

export default studentsSlice.reducer;
