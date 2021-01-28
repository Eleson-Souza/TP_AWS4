const express = require('express');
const sequelize = require ('./src/database/database');
const app = express();
const routes = require ('./src/routes/routes.js');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use(routes);

sequelize.sync({force: false}).then( () => {
    const port = 3003;
    app.set("port", port);
    app.listen(process.env.PORT || port);
});
