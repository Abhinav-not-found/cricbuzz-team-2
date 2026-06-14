import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser, logoutUser, registerUser } from "@/app/slices/authAction";

const useAuth = (reset) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = (data) => {
		try {
			dispatch(loginUser(data));
			navigate("/admin");
			reset();
		} catch (error) {
			console.log("Error while Login");
		}
	};

	const handleLogout = () => {
		try {
			dispatch(logoutUser()).unwrap();
			navigate("/");
		} catch (error) {
			console.log("Error while logging out", error);
		}
	};

	const handleRegister = (data) => {
		try {
			dispatch(registerUser(data));
			navigate("/admin");
			reset();
		} catch (error) {
			console.log("Error while Register", error);
		}
	};

	return {
		handleLogin,
		handleLogout,
		handleRegister,
	};
};

export default useAuth;
