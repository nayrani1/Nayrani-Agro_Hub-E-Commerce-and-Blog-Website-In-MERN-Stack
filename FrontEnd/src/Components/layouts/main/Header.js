import React, { useState, useEffect } from "react";
import "../css/header.css";
import NavigationBar from "../nav/NavigationBar";

const Header = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 700) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar-contain ${isSticky ? "sticky" : ""}`}>
      <NavigationBar />
    </div>
  );
};

export default Header;
