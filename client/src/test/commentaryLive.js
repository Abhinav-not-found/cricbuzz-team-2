import { useContext, useEffect, useState } from "react";
import { socketContext } from "@/shared/context/socketContext";

const commentaryLive = () => {
	const [commentary, setCommentary] = useState([]);
	const { socket } = useContext(socketContext);

	useEffect(() => {
		if (!socket) return;

		const handler = (data) => {
			setCommentary((prev) => [data.data, ...prev]);
		};

		socket.on("commentary:new", handler);

		return () => socket.off("commentary:new", handler);
	}, [socket]);

	return (
		<div>
			{commentary.map((c) => (
				<div key={c._id}>{c.text}</div>
			))}
		</div>
	);
};

export default commentaryLive;
