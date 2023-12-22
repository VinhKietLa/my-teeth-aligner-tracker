import { useNavigate } from "react-router-dom";

// This could be in your Dashboard component or wherever your logout button is
function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Logout;
