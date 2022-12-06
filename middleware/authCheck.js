
const authCheck = (req, res, next) => {
    const { token } = req.headers;
    try {
        /* Will implement middleware for auth check */
        next();
    } catch(err) {
        next("Authentication failure!");
    }
};

module.exports = {authCheck};