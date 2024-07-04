const express = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const cookieSession = require("cookie-session");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		name: "Saddam-Ansari",
		keys: ["SADDAM_COOKIE_SECRET"], // should use as secret environment variable
		httpOnly: true,
	})
);

const allRoutes = require("./Routes/indexRoutes");
allRoutes(app);

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});

// Setup CORS headers
const cors = require("cors");
var corsOptions = {
	origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

const db = require("./Models");
const Role = db.roles;

db.sequelize.sync().then(() => {
    console.log('Resync Db without dropping tables');
    initial();
});

function initial() {
    Role.findOrCreate({
        where: { id: 1 },
        defaults: { name: "user" }
    });

    Role.findOrCreate({
        where: { id: 2 },
        defaults: { name: "moderator" }
    });

    Role.findOrCreate({
        where: { id: 3 },
        defaults: { name: "admin" }
    });
}

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});