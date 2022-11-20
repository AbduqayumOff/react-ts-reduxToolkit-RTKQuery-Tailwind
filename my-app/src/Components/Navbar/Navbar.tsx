import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-blue-900 text-white">
      <h3 className="font-bold">Github Search</h3>

      <span>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/favourites" className="m4-2">
          Favourites
        </Link>
      </span>
    </nav>
  );
};

export default Navbar;
