const express = require('express');
const app = express();

consign({
    cwd: 'app'
})
    .include('config.js')
    .then('db.js')
    .then('auth.js')
    .then('middleware.js')
    .then('repository')
    .then('routes')
    .then('boot.js')
    .into(app);
