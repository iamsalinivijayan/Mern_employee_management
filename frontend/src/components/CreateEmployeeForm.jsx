import axios from "axios";
const CreateEmployeeForm = ({
  updateForm,
  formData,
  setFormData,
  employees,
  setEmployees,
}) => {
  const createEmployee = async (e) => {
    e.preventDefault();

    try {
      // create a new user
      const user = {
        email: formData.email,
        password: formData.password,
        isAdmin: false,
      };
      const createUserResponse = await axios.post("/admin/signup", user, {
        withCredentials: true,
      });
      console.log("response of signup", createUserResponse);

      // create a new employee
      const employee = {
        name: formData.name,
        role: formData.role,
        salary: formData.salary,
      };
      const createEmployeeResp = await axios.post("/api/employees", employee, {
        withCredentials: true,
      });
      console.log("response of create employee", createEmployeeResp);

      // now we have to update the employees state so that we don't have to refresh the page when we add a new employee
      setEmployees([...employees, createEmployeeResp.data]);

      // clear form state
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        salary: "",
      });
    } catch (error) {
      console.log("error", error);
      alert("user email already exists");
    }
  };

  const updateFormField = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {!updateForm._id && (
        <div>
          <h2>Create Employee</h2>
          <form onSubmit={createEmployee}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={updateFormField}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={updateFormField}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={updateFormField}
            />
            <input
              type="text"
              placeholder="Role"
              name="role"
              value={formData.role}
              onChange={updateFormField}
            />
            <input
              type="text"
              placeholder="Salary"
              name="salary"
              value={formData.salary}
              onChange={updateFormField}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateEmployeeForm;
