const Employee = require("../models/employeeModel");

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    console.log("inside get employee");
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error("Employe not found");
    }
    res.status(200).json(employee);
  } catch (error) {
    console.log("error--------", error);
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  console.log("req body", req.body);
  try {
    const { name, role, salary } = req.body;
    if (!name || !role) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const employee = await Employee.create({ name, role, salary });
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { name, role, salary } = req.body;
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error("Employe not found");
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        salary,
      },
      { returnDocument: "after" }
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404);
      throw new Error("Employe not found");
    }
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `Deleted employee ${deletedEmployee.name}` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
