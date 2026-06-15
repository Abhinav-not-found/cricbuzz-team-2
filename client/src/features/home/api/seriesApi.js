import axiosInstance from "@/utils/axios";

export const getAllSeries = async (s) => {
	const res = await axiosInstance.get("/series/");

	console.log(res.data);
};
