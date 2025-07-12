import React from "react";
import {
  useUser,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import AdminRoute from "@/Admin/components/AdminRoute";

function Header() {
  const { isSignedIn } = useUser();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", exact: true },
    { to: "/about", label: "About" },
    { to: "/product", label: "Products" },
    { to: "/ContactUs", label: "Contact Us" },
  ];

  const isActive = (link) => {
    if (link.exact) {
      return location.pathname === link.to;
    }
    return location.pathname.startsWith(link.to);
  };

  return (
  
    
    <div className="bg-gray-200 flex justify-between items-center shadow-sm p-5">
      <Link to={"/"}>
        <img src="/farmex.png" alt="logo" width={150} height={100} />
      </Link>

      <ul className="hidden md:flex gap-12">
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to}>
            <li
              className={`font-medium transition-all cursor-pointer px-2 py-1 rounded ${
                isActive(link)
                  ? "text-primary font-semibold"
                  : "text-black hover:text-primary"
              }`}
            >
              {link.label}
            </li>
          </Link>
        ))}

        <AdminRoute>
          <Link to={"/admin"}>
            <li
              className={`font-medium transition-all cursor-pointer px-2 py-1 rounded ${
                location.pathname.startsWith("/admin")
                  ? "text-primary font-semibold"
                  : "text-black hover:text-primary"
              }`}
            >
              Admin
            </li>
          </Link>
        </AdminRoute>
      </ul>

      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton />
          <Link to={"/profile"}>
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      )}
    </div>
   
  );
}

export default Header;
