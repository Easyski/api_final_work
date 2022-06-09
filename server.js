const EXPRESS = require("express");
const CORS = require("cors");
const fetch = require("node-fetch");

const APP = EXPRESS();

// -------------------------------------------------------------------
// :: MIDDLEWARE
// -------------------------------------------------------------------

APP.use(CORS());

APP.use(
	EXPRESS.urlencoded({
		extended: true,
	})
);
APP.use(EXPRESS.json());

// -------------------------------------------------------------------
// :: ROUTES
// -------------------------------------------------------------------

APP.get("/", (req, res, next) => {
	res.redirect("https://www.easyski.be");
});

// .../alt/?lat=50.432134326&lng=14.134326365
APP.get("/alt", async (req, res, next) => {
	// CHECK IF PARAMS ARE PRESENT
	if (!req.query.lat)
		res.json({
			lat: -1,
			lng: -1,
			alt: -1,
			error: "No latitude was found!",
		});
	else if (!req.query.lng)
		res.json({
			lat: -1,
			lng: -1,
			alt: -1,
			error: "No longitude was found!",
		});

	// GET ALTITUDE
	const q = await fetch(
		`https://api.opentopodata.org/v1/aster30m?locations=${req.query.lat},${req.query.lng}`
	);
	const r = await q.json();

	// RETURN
	res.json({
		lat: Number(req.query.lat),
		lng: Number(req.query.lng),
		alt: Number(r.results[0].elevation),
		error: null,
	});
});

module.exports = APP;
