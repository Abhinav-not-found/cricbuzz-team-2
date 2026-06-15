import { toast } from "sonner";
import axiosInstance from "@/utils/axios";

export const getAllPlayers = async (setPlayers) => {
	try {
		const res = await axiosInstance.get("/player/");
		setPlayers(res.data.data);
	} catch (error) {
		console.log(error);
	}
};

export const createPlayer = async (data, reset) => {
	try {
		const res = await axiosInstance.post("/player/", data);
		if (res.status === 201) {
			reset();
			toast.success("Player created");
		}
	} catch (error) {
		console.log(error);
	}
};

export const deletePlayer = async (id, setPlayers) => {
	try {
		const res = await axiosInstance.delete(`/player/${id}`);
		if (res.status === 200) {
			toast.success("Player deleted");

			const playersRes = await axiosInstance.get("/player/");
			setPlayers(playersRes.data.data);
		}
	} catch (error) {
		console.log(error);
	}
};

export const getPlayerById = async (id) => {
	try {
		const res = await axiosInstance.get(`/player/${id}`);
		return res.data.data;
	} catch (error) {
		console.log(error);
	}
};

export const updatePlayer = async (id, data) => {
	try {
		const res = await axiosInstance.patch(`/player/${id}`, data);

		if (res.status === 200) {
			toast.success("Player updated");
		}

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
