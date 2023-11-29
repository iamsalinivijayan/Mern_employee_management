import axios from "axios";
const UpdateEmployeeForm = ({
  updateForm,
  setUpdateForm,
  employees,
  setEmployees,
}) => {
  const changeUpdateForm = (e) => {
    const { name, value } = e.target;
    setUpdateForm({ ...updateForm, [name]: value });
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    const { name, role, salary } = updateForm;
    const resp = await axios.put(
      `/api/employees/${updateForm._id}`,
      {
        name,
        role,
        salary,
      },
      { withCredentials: true }
    );
    console.log("resp of update", resp);

    // set employees state
    const updatedEmployees = [...employees];
    const employeeIndex = employees.findIndex((employee) => {
      return employee._id === updateForm._id;
    });
    updatedEmployees[employeeIndex] = resp.data;

    setEmployees(updatedEmployees);

    setUpdateForm({
      _id: null,
      name: "",
      role: "",
      salary: "",
    });
  };
  return (
    <div>
      {updateForm._id && (
        <div>
          <h2>Edit employee</h2>
          <form onSubmit={updateEmployee}>
            <input
              type="text"
              name="name"
              value={updateForm.name}
              onChange={changeUpdateForm}
            />
            <input
              type="text"
              name="role"
              value={updateForm.role}
              onChange={changeUpdateForm}
            />
            <input
              type="text"
              name="salary"
              value={updateForm.salary}
              onChange={changeUpdateForm}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateEmployeeForm;
