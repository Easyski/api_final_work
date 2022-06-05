import { Request, Response, NextFunction } from "express";
import EXPRESS from "express";

const APP = EXPRESS();

// -------------------------------------------------------------------
// :: MIDDLEWARE
// -------------------------------------------------------------------

APP.use(
	EXPRESS.urlencoded({
		extended: true,
	})
);
APP.use(EXPRESS.json());

// -------------------------------------------------------------------
// :: ROUTES
// -------------------------------------------------------------------

APP.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send("yeet");
});

export default APP;
