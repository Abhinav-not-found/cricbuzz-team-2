import { toast } from "sonner";
import axiosInstance from "@/utils/axios";

export const createTeam = async (data, reset) => {
	try {
		const res = await axiosInstance.post("/team/", data);
		if (res.status === 201) {
			reset();
			toast.success("Team created");
		}
	} catch (error) {
		console.log(error);
	}
};

export const getAllTeams = async (setTeams) => {
	try {
		const res = await axiosInstance.get("/team");
		setTeams(res.data.data);
	} catch (error) {
		console.log(error);
	}
};

export const getTeamById = async (id) => {
	try {
		const res = await axiosInstance.get(`/team/${id}`);
		return res.data.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateTeam = async (id, data) => {
	try {
		const res = await axiosInstance.patch(`/team/${id}`, data);

		if (res.status === 200) {
			toast.success("Team updated");
		}

		return res.data.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteTeam = async (id, setTeams) => {
	try {
		const res = await axiosInstance.delete(`/team/${id}`);

		if (res.status === 200) {
			toast.success("Team deleted");

			const updatedTeams = await axiosInstance.get("/team");
			setTeams(updatedTeams.data.data);
		}
	} catch (error) {
		console.log(error);
	}
};

export const addPlayersToTeam = async (teamId, playerIds) => {
	try {
		const res = await axiosInstance.post(`/team/${teamId}/players`, {
			playerIds,
		});

		toast.success("Players added to team");
		return res.data.data;
	} catch (error) {
		console.log(error);
	}
};

export const removePlayersFromTeam = async (teamId, playerIds) => {
	try {
		const res = await axiosInstance.delete(`/team/${teamId}/players`, {
			data: {
				playerIds,
			},
		});

		toast.success("Players removed from team");
		return res.data.data;
	} catch (error) {
		console.log(error);
	}
};
