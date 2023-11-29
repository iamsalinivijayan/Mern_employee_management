import axios from "axios";
const EmployeeList = ({ employees, setEmployees, setUpdateForm, isAdmin }) => {
  const deleteEmployee = async (id) => {
    // delete employee
    const resp = await axios.delete(`/api/employees/${id}`, {
      withCredentials: true,
    });
    console.log("resp of delete", resp);

    // update state of employees
    const employeesUpdated = [...employees].filter((employee) => {
      return employee._id !== id;
    });
    setEmployees(employeesUpdated);
    alert(resp.data.message);
  };

  const toggleUpdate = (employee) => {
    // update the state of the update form
    setUpdateForm(employee);
    // console.log("updateForm", updateForm);
  };
  return (
    <div>
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((employee) => {
              return (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.salary}</td>
                  {isAdmin && (
                    <button onClick={() => toggleUpdate(employee)}>edit</button>
                  )}
                  {isAdmin && (
                    <button onClick={() => deleteEmployee(employee._id)}>
                      delete
                    </button>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
