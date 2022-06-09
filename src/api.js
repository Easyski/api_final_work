const EXPRESS = require("express");
const SERVERLESS = require("serverless-http");
const CORS = require("cors");
const FETCH = require("node-fetch");

const APP = EXPRESS();
const ROUTER = EXPRESS.Router();

// -------------------------------------------------------------------
// :: MIDDLEWARE
// -------------------------------------------------------------------

APP.use(CORS());
APP.use(EXPRESS.json());
APP.use("/.netlify/functions/api", ROUTER);

// -------------------------------------------------------------------
// :: ROUTES
// -------------------------------------------------------------------

ROUTER.get("/", (req, res) => {
	res.json({
		status: 200,
	});
});

// .../alt/?lat=50.432134326&lng=14.134326365
ROUTER.get("/alt", async (req, res, next) => {
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

// -------------------------------------------------------------------
// :: EXPORT
// -------------------------------------------------------------------

module.exports.handler = SERVERLESS(APP);
