import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>Home</Link>
      <Link to="/add" style={{ color: "#fff" }}>Add Contact</Link>
    </nav>
  );
}

export default Navbar;
