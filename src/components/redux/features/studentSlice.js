import { createSlice } from "@reduxjs/toolkit";

const storedListStudent = JSON.parse(localStorage.getItem("listStudent")) || [];

const initialState = {
    listStudent: storedListStudent,
};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        addStudent: (state, action) => {
            const newStudent = action.payload;
            const checkStudent = state.listStudent.find(
                (student) =>
                    student.maSV === newStudent.maSV ||
                    student.email === newStudent.email
            );
            if (checkStudent) {
                alert("Mã SV hoặc Email đã tồn tại trong danh sách.");
            } else {
                state.listStudent.push(newStudent);
                localStorage.setItem(
                    "listStudent",
                    JSON.stringify(state.listStudent)
                );
            }
        },
        removeStudent: (state, action) => {
            state.listStudent = state.listStudent.filter(
                (student) => student.maSV !== action.payload
            );
            localStorage.setItem(
                "listStudent",
                JSON.stringify(state.listStudent)
            );
        },
        updateStudent: (state, action) => {
            const updatedStudent = action.payload;
            state.listStudent = state.listStudent.map((student) =>
                student.maSV === updatedStudent.maSV ? updatedStudent : student
            );
            localStorage.setItem(
                "listStudent",
                JSON.stringify(state.listStudent)
            );
        },
    },
});

export const { addStudent, removeStudent, updateStudent } =
    studentSlice.actions;

export default studentSlice.reducer;
