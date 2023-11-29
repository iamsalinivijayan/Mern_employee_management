import axios from "axios";
import { useEffect, useState } from "react";
import CreateEmployeeForm from "../components/CreateEmployeeForm";
import UpdateEmployeeForm from "../components/UpdateEmployeeForm";
import EmployeeList from "../components/EmployeeList";
const EmployeesPage = ({ loggedIn, isAdmin }) => {
  // employee states
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    salary: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    name: "",
    role: "",
    salary: "",
  });
  useEffect(() => {
    const fetchEmployees = async(setEmployees) => {
      try {
        const resp = await axios.get("/api/employees", {withCredentials: true});
        console.log("resp", resp.data);
        setEmployees(resp.data);
      }catch (error) {
        console.log(error)
      }
    };
      fetchEmployees(setEmployees);
  }, []);
  
  return (
    <div>
      {isAdmin && (
        <CreateEmployeeForm
          updateForm={updateForm}
          formData={formData}
          setFormData={setFormData}
          employees={employees}
          setEmployees={setEmployees}
        />
      )}
      {isAdmin && (
        <UpdateEmployeeForm
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          employees={employees}
          setEmployees={setEmployees}
        />
      )}
      <EmployeeList
        employees={employees}
        setEmployees={setEmployees}
        setUpdateForm={setUpdateForm}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default EmployeesPage;
