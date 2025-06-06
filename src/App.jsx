import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
} from './services/EmployeeService';

// Layout component to wrap navbar/footer and page content
const Layout = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-indigo-100">
    <Navbar />
    <main className="flex-grow max-w-7xl mx-auto p-6 w-full">
      <Outlet /> {/* Render matched route element here */}
    </main>
    <Footer />
  </div>
);

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    const res = await getAllEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddOrUpdate = async (employee) => {
    if (employee.id) {
      await updateEmployee(employee.id, employee);
    } else {
      await addEmployee(employee);
    }
    setEditingEmployee(null);
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleEdit = async (id) => {
    const res = await getEmployeeById(id);
    setEditingEmployee(res.data);
  };

  return (
    <Router>
      <Routes>
        {/* Wrap all routes inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="add"
            element={<EmployeeForm onSubmit={handleAddOrUpdate} editingEmployee={editingEmployee} />}
          />
          <Route
            path="list"
            element={
              <EmployeeList
                employees={employees}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
