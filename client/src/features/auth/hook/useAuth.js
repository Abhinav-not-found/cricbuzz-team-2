import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { loginUser, logoutUser, registerUser } from "@/app/slices/authAction";

const useAuth = (reset) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async (data) => {
		try {
			const user = await dispatch(loginUser(data)).unwrap();
			if (user.role === "ADMIN") {
				navigate("/admin/players");
			} else if (user.role === "SUPER_ADMIN") {
				navigate("/super-admin");
			} else {
				toast.error("Not an Admin: UnAuthorized");
				navigate("/");
			}
			reset();
		} catch (error) {
			toast.error(error || "Login failed");
		}
	};

	const handleLogout = async () => {
		try {
			await dispatch(logoutUser()).unwrap();
			navigate("/");
		} catch (error) {
			console.log("Error while logging out", error);
		}
	};

	const handleRegister = async (data) => {
		try {
			await dispatch(registerUser(data)).unwrap();
			navigate("/admin");
			reset();
		} catch (error) {
			toast.error(error || "Register failed");
		}
	};

	return {
		handleLogin,
		handleLogout,
		handleRegister,
	};
};

export default useAuth;
