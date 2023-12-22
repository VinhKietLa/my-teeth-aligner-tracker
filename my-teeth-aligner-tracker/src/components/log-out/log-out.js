import { useNavigate } from "react-router-dom";

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
