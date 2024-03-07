import React, { useState, useEffect } from "react";
import EmployeForm from "./EmployeForm";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";

const App = () => {
  const EmployeData = [
    {
      id: 1,
      firstname: "",
      lastname: "",
      age: 0,
    },
  ];
  const [data, setData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("employeeData"));
    return storedData || EmployeData;
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsupdate] = useState(false);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem("employeeData", JSON.stringify(data));
  }, [data]);

  const handleEdit = (id) => {
    setIsupdate(true);

    const dt = data.find((item) => item.id === id);
    if (dt !== undefined) {
      setId(id);
      setFirstName(dt.firstname);
      setLastName(dt.lastname);
      setAge(dt.age);
    }
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (id > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const dt = data.filter((item) => item.id !== id);
          setData(dt);
          setShowDeleteAlert(true);
          setTimeout(() => setShowDeleteAlert(false), 3000);
        }
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let error = "";
    if (firstName === "") error += "First name is required. ";
    if (lastName === "") error += "Last name is required. ";
    if (age <= 0) error += "Age is required. ";

    if (error === "") {
      const newObject = {
        id: data.length + 1,
        firstname: firstName,
        lastname: lastName,
        age: age,
      };

      setData([...data, newObject]);
      handleClear();
      setShowAddAlert(true);
      setTimeout(() => setShowAddAlert(false), 3000);
    } else {
      alert(error);
    }
  };

  const handleUpdate = () => {
    if (firstName === "" || lastName === "" || age === "") {
      alert("All fields are required for update.");
      return;
    }

    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedData = [...data];
      updatedData[index] = {
        ...updatedData[index],
        firstname: firstName,
        lastname: lastName,
        age: age,
      };
      setData(updatedData);
      handleClear();
      setShowUpdateAlert(true);
      setTimeout(() => setShowUpdateAlert(false), 3000);
    }
  };

  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
    setIsupdate(false);
  };
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  return (
    <div>
      <div className="todo">
        <h1>Todo APP</h1>
        <button className="btn btn-primary top" onClick={toggleForm}>
          Add Todo
        </button>
      </div>

      {showAddAlert && (
        <div className="alert alert-success alertt" role="alert">
          Todo has been added successfully!
        </div>
      )}
      {showUpdateAlert && (
        <div className="alert alert-info alertt" role="alert">
          Todo has been updated successfully!
        </div>
      )}
      {showDeleteAlert && (
        <div className="alert alert-warning alertt" role="alert">
          Todo has been deleted successfully!
        </div>
      )}
      {isFormOpen && (
        <EmployeForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          age={age}
          setAge={setAge}
          isUpdate={isUpdate}
          handleSave={handleSave}
          handleUpdate={handleUpdate}
          handleClear={handleClear}
        />
      )}
      <table className="table table-hover app">
        <thead>
          <tr>
            <th>sr.no</th>
            <th>id</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>age</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.age}</td>
              <td className="button">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(item.id)}
                >
                  edit
                  <FaRegEdit className="edit" />
                </button>
                <button
                  className="btn btn-danger left"
                  onClick={() => handleDelete(item.id)}
                >
                  delete
                  <MdDeleteSweep className="edit" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
