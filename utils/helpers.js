import { decode as jwtDecode } from "jwt-decode";

export function getAuthToken() {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded); // Check the actual field names
      return decoded._id || decoded.id; // Return userId directly
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      localStorage.removeItem("jwtToken"); // Remove invalid token
      return null; // Return null if decoding fails
    }
  }
  return null; // Return null if no token exists
}
