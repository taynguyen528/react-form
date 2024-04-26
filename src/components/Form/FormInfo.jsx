import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./FormInfo.css";
import { useDispatch, useSelector } from "react-redux";
import {
    addStudent,
    removeStudent,
    updateStudent,
} from "../redux/features/studentSlice";

const FormInfo = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: "onBlur" });

    const dispatch = useDispatch();

    const listStudent = useSelector((state) => state.student.listStudent);

    const [editStudent, setEditStudent] = useState(null);

    const onSubmit = (data) => {
        if (editStudent) {
            dispatch(updateStudent({ ...editStudent, ...data }));
            reset({ maSV: "", hoTen: "", soDienThoai: "", email: "" });
            setEditStudent(null);
        } else {
            dispatch(addStudent(data));
        }
        reset();
    };

    const handleRemoveStudent = (studentId) => {
        const confirmDelete = window.confirm(
            `Bạn có chắc chắn muốn xóa sinh viên có mã SV: ${studentId}`
        );
        if (confirmDelete) {
            dispatch(removeStudent(studentId));
        }
    };

    const handleEditStudent = (student) => {
        setEditStudent(student);
        console.log("studentEdit: ", student);
        reset(student);
    };

    useEffect(() => {
        reset(
            editStudent || { maSV: "", hoTen: "", soDienThoai: "", email: "" }
        );
    }, [editStudent, reset]);

    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (searchText) => {
        const filteredStudents = listStudent.filter((student) => {
            return (
                student.maSV.includes(searchText) ||
                student.hoTen
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                student.soDienThoai.includes(searchText) ||
                student.email.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        setSearchResult(filteredStudents);
    };

    const handleSearchChange = (e) => {
        const searchText = e.target.value;
        if (searchText.trim() === "") {
            setSearchResult([]);
        } else {
            handleSearch(searchText);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-4">React form</h1>
            <div className="form-info mt-4">
                <h2 className="title">Thông tin sinh viên</h2>
                <div className="search">
                    <div>
                        <input
                            className="form-control"
                            {...register("search")}
                            onChange={handleSearchChange}
                            placeholder="Tìm kiếm..."
                        />
                        <button className="btn btn-primary">Tìm kiếm</button>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Mã SV.</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("maSV", {
                                    required: "Vui lòng nhập mã SV.",
                                })}
                                disabled={!!editStudent}
                            />
                            {errors?.maSV && (
                                <p className="error">{errors?.maSV?.message}</p>
                            )}
                        </div>
                        <div className="col">
                            <label className="form-label">Họ tên.</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("hoTen", {
                                    required: "Vui lòng nhập Họ tên.",
                                })}
                            />
                            {errors?.hoTen && (
                                <p className="error">
                                    {errors?.hoTen?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Số điện thoại.</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register("soDienThoai", {
                                    required: "Vui lòng nhập Số điện thoại.",
                                })}
                            />
                            {errors?.soDienThoai && (
                                <p className="error">
                                    {errors?.soDienThoai?.message}
                                </p>
                            )}
                        </div>
                        <div className="col">
                            <label className="form-label">Email.</label>
                            <input
                                type="email"
                                className="form-control"
                                {...register("email", {
                                    required: "Vui lòng nhập Email.",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Email không hợp lệ.",
                                    },
                                })}
                            />
                            {errors?.email && (
                                <p className="error">
                                    {errors?.email?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success">
                        {editStudent ? "Cập nhật thông tin" : "Thêm sinh viên"}
                    </button>
                </form>

                <div className="mt-4">
                    <h2 className="title">Danh sách sinh viên</h2>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">Mã SV</th>
                                <th scope="col">Họ tên</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResult && searchResult.length > 0
                                ? searchResult.map((student, index) => (
                                      <tr key={index}>
                                          <td>{student.maSV}</td>
                                          <td>{student.hoTen}</td>
                                          <td>{student.soDienThoai}</td>
                                          <td>{student.email}</td>
                                          <td>
                                              <button
                                                  className="btn btn-warning me-3"
                                                  onClick={() =>
                                                      handleEditStudent(student)
                                                  }
                                              >
                                                  Edit
                                              </button>
                                              <button
                                                  className="btn btn-danger"
                                                  onClick={() =>
                                                      handleRemoveStudent(
                                                          student.maSV
                                                      )
                                                  }
                                              >
                                                  Delete
                                              </button>
                                          </td>
                                      </tr>
                                  ))
                                : listStudent &&
                                  listStudent.length > 0 &&
                                  listStudent.map((student, index) => (
                                      <tr key={index}>
                                          <td>{student.maSV}</td>
                                          <td>{student.hoTen}</td>
                                          <td>{student.soDienThoai}</td>
                                          <td>{student.email}</td>
                                          <td>
                                              <button
                                                  className="btn btn-warning me-3"
                                                  onClick={() =>
                                                      handleEditStudent(student)
                                                  }
                                              >
                                                  Edit
                                              </button>
                                              <button
                                                  className="btn btn-danger"
                                                  onClick={() =>
                                                      handleRemoveStudent(
                                                          student.maSV
                                                      )
                                                  }
                                              >
                                                  Delete
                                              </button>
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FormInfo;
