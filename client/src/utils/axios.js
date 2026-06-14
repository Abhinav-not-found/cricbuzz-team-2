import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:8000/api",
	withCredentials: true,
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalReq = error.config;
		if (!error.response) {
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			!originalReq._retry &&
			!originalReq.url.includes("/auth/refresh")
		) {
			originalReq._retry = true;

			try {
				await axiosInstance.post("/auth/refresh");
				return axiosInstance(originalReq);
			} catch (error) {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	},
);
