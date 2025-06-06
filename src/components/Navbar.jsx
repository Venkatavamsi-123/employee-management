import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">Employee Manager</div>
        <div className="space-x-6">
          <Link to="/" className="text-indigo-100 hover:text-white font-medium">Home</Link>
          <Link to="/add" className="text-indigo-100 hover:text-white font-medium">Add Employee</Link>
          <Link to="/list" className="text-indigo-100 hover:text-white font-medium">Employee List</Link>
          <Link to="/about" className="text-indigo-100 hover:text-white font-medium">About</Link>
          <Link to="/contact" className="text-indigo-100 hover:text-white font-medium">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
