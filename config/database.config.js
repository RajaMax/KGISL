import Mongoose from 'mongoose';
import settings from '../settings';

let config = require('./' + settings.environment + '.config');

Mongoose.Promise = global.Promise;

const connectToMongoDb = async () => {
    let host = config.default.mongo.host;
    let port = config.default.mongo.port;
    let username = config.default.mongo.username;
    let password = config.default.mongo.password;
    let database_name = config.default.mongo.database_name;
    let connectionString = "";

    // if (settings.environment === "local")
    //     connectionString = `mongodb://${host}:${port}/${database_name}`;
    // else if(settings.environment === "production")
        connectionString = `mongodb://${username}:${password}@${host}:${port}/${database_name}`;
    // else
    //     connectionString = `mongodb://${username}:${password}@${host}:${port}/${database_name}`;
console.log(connectionString)
    try {
        await Mongoose.connect(connectionString, {
            useMongoClient: true
        });
        console.log(`MongoDB Connected to ${database_name}`);

    } catch (error) {
        console.log(error)
        console.log(`Error Connecting to MongoDB  ${database_name}`);
    }
};

export default connectToMongoDb;