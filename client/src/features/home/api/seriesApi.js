import axiosInstance from "@/utils/axios";

export const getAllSeries = async (setSeries) => {
	try {
		const res = await axiosInstance.get("/public/series");
    setSeries(res.data.data)
	} catch (error) {
		console.log(error);
	}
};
