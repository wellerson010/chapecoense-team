const configProduction = require('./config-production');
const configDevelopment = require('./config-development');

let development = (process.env.DEVELOPMENT)?true:false;

module.exports = (developmemt) ? configDevelopment:configProduction;