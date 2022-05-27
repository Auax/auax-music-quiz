const auth = require("basic-auth");
const compare = require("tsscmp");

const safeCheckCredentials = (user, password) => {
    const envUser = process.env.ADMIN_USER || null;
    const envPassword = process.env.ADMIN_PASSWORD || null;

    if (!envUser || !envPassword) return false;
    return compare(user, envUser) && compare(password, envPassword);
}

const basicAuth = (req, res, next) => {
    const credentials = auth(req);
    if (credentials && safeCheckCredentials(credentials.name, credentials.pass)) {
        return next();
    }
    res.set("WWW-Authenticate", "Basic");
    return res.status(401).send({detail: "invalid credentials"});
};

module.exports = {
    basicAuth
};