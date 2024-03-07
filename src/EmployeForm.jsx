import React from "react";

const EmployeeForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  age,
  setAge,
  isUpdate,
  setIsupdate,
  handleSave,
  handleUpdate,
  handleClear,
  
}) => {
  return (
    <div className="employee-form-container">
      <div>
        <label>
          First Name:
          <input
            type="text"
            placeholder="Enter first name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            placeholder="Enter last name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            placeholder="Enter age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </label>
      </div>
      <div>
        {isUpdate ? (
          <button className="btn btn-primary " onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        )}
        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default EmployeeForm;
