import APP from "./server";
const PORT = process.env.PORT || 5000;

APP.listen(process.env.PORT, () => {
	console.log(`server listening at: http://localhost:${PORT}`);
});
