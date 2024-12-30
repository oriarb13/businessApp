import { useNavigate } from "react-router-dom";
import { logOutUser } from "@/API/userAPI";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";

const Logout = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logOutUser();

      if (response.message === "Successfully logged out.") {
        Cookies.remove("jwt");

        setUser(null);

        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
