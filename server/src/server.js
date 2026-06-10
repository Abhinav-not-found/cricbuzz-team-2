import createApp from "./app.js";

const app = createApp();

function startServer() {
	app.listen(3000, () => {
		console.log("Server started on port: ", 3000);
	});
}

startServer();