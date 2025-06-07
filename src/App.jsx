import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Attendance from './components/Attendance';
import Payroll from './components/Payroll';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AttendanceList from './components/AttendanceList';
import EmployeeDashboard from './components/EmployeeDashboard';


const Layout = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-indigo-100">
    <Navbar />
    <main className="flex-grow max-w-7xl mx-auto p-6 w-full">
      <Outlet/>
    </main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list" element={<EmployeeList />} />
          <Route path="add" element={<EmployeeForm />} />
          <Route path="edit/:id" element={<EmployeeForm />} />
          <Route path="/attendance/:id" element={<Attendance />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendancelist" element={<AttendanceList />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="" element={<Contact />} />
           <Route path="/employee/:id" element={<EmployeeDashboard />} />
         
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
