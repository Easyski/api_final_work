const APP = require("./server");
require("dotenv").config();

const PORT = process.env.PORT;

APP.listen(PORT, () => {
	console.log(`server listening at: http://localhost:${PORT}`);
});
