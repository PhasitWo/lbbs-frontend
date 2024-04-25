import { useGlobalContext } from "../../context";
import { Navigate } from "react-router-dom";

const Logout = () => {
    const { setUserId, setUsername, setIsAdmin } = useGlobalContext();
    setUserId(null);
    setUsername(null);
    setIsAdmin(false);
    localStorage.clear();
    return <Navigate to="/login"/>
};

export default Logout