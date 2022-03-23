const ConnectDB = require('haris_connect_mongo_api/src/index');
require('dotenv').config();

const application = require('./service/app');

const { USER_NAME, USER_CONNECTION, DB_NAME, PORT } = process.env;

const generateMongoURL = `mongodb+srv://${USER_NAME}:${USER_CONNECTION}@cluster0.4wpoe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const dbConfigs = {
    connectionURL: generateMongoURL,
    options: {
        ignoreUndefined: true,
        appname: 'buy-a-stay'
    }
}

Promise.all([
    ConnectDB(dbConfigs, DB_NAME)
]).then(async ([
    { dataBase: authenticationDB, client: authenticationDBClient }
]) => {
    const app = await application(authenticationDB);
    const server = app.listen(PORT, function () {
        const host = server.address().address
        const port = server.address().port
        console.log(`Application listening from port : ${port} and adress:${host}`)
    });

    function shutdownHandler() {
        console.log('---shutting down the process----');
        server.close();
        authenticationDBClient.close(true);
        process.exit();
    }

    process.on('SIGINT', shutdownHandler);
    process.on('SIGTERM', shutdownHandler);
})






