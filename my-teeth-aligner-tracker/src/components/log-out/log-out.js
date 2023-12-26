import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./log-out.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div>
      <Button className="sidebar-logout" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
}

export default Logout;
