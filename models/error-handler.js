const { CustomAPIError } = require('../errors/custom-error');
const erroHnandlerMiddleware = (err, req, res, next) => {
 if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
 }
 return res.status(err.status).json({ msg: 'משהו לא עובד תנסה יותר מאוחר'});
}

module.exports = erroHnandlerMiddleware;