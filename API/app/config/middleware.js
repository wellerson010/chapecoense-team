const bodyParser = require('body-parser');
const cors = require('cors');
const authService = require('../services/auth-service')();

module.exports = () => {
    app.use(bodyParser.json());
    app.use(authService.initialize());
    app.use(cors());
}