import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Retrieve token from local storage

    if (token) {
      // Validate the token by sending it to backend
      axios
        .post(
          "https://myntra-clone-backend-nine.vercel.app/api/user/validate-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setIsAuthenticated(true);
            // Redirect to homepage if on login or signup page
            if (
              location.pathname === "/" ||
              location.pathname === "/login" ||
              location.pathname === "/signup"
            ) {
              navigate("/homepage", { replace: true });
            }
          } else {
            localStorage.removeItem("jwtToken");
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("jwtToken");
          setIsAuthenticated(false);
          navigate("/login", { replace: true });
        });
    } else {
      setIsAuthenticated(false);
      // Redirect to login if not authenticated
      if (
        location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/"
      ) {
        navigate("/login", { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
