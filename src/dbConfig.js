// Importing MongoClient from mongodb driver
const { MongoClient } = require('mongodb');

const connectionURI = process.env.MONGO_DB_URI;

export async function connect(){

    try {
        const options = Object.assign({},{
            useNewUrlParser: true,
             useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

       await MongoClient.connect(connectionURI,options);

        console.log(`Attempting to establish a connection `)
        
    } catch (error) {
        console.error(`Error occurred while establishing a DB connection :`);
        console.error(error);
    }
}