import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GiBookshelf } from "react-icons/gi";

import { HiChevronDoubleLeft } from "react-icons/hi";
import { useGlobalContext } from "../../context";

export const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const { isAdmin } = useGlobalContext();
    const handleNavbar = () => {
        setToggleMenu(!toggleMenu);
    };

    return (
        <nav className="navbar" id="navbar">
            <div className="container navbar-content flex">
                <div className="brand-and-toggler flex flex-sb">
                    <Link to="book" className="navbar-brand flex">
                        <span>
                            <GiBookshelf size={50} color="white" />
                        </span>
                        <span className="text-uppercase text-white text-center fw-7 fs-24 ls-1">Libraro</span>
                    </Link>
                    <button type="button" className="navbar-toggler-btn" onClick={handleNavbar}>
                        <HiChevronDoubleLeft size={35} style={{ color: "white" }} />
                    </button>
                </div>

                <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                to="book"
                                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
                                onClick={handleNavbar}
                            >
                                Home
                            </Link>
                        </li>
                        {!isAdmin ? (
                            <li className="nav-item" onClick={handleNavbar}>
                                <Link to="Profile" className="nav-link text-uppercase text-white fs-22 fw-6 ls-1">
                                    profile
                                </Link>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
