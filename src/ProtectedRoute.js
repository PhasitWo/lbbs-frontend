import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, permission_list }) {
    const [isAuth, setAuth] = useState(null);
    const navigate = useNavigate();

    const auth = async () => {
        console.log("ProtectedRoute checked");
        const token = localStorage.getItem("access_token");
        if (!token) {
            console.log("No Token!!!");
            setAuth(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExp = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExp < now) {
            console.log("Token expired");
            setAuth(false);
            return;
        }
        console.log("Token is valid");
        setAuth(true);
        if (!permission_list.includes(decoded.permission)) {
            alert("No Permission");
            navigate(-1);
            return;
        }
    };

    useEffect(() => {
        auth().catch(() => setAuth(false));
    }, []);

    if (isAuth == null) {
        return <div>Loading....</div>;
    }

    return isAuth ? children : <Navigate to="/login" />;
}
export default ProtectedRoute;
