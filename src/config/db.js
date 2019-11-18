const mongoose = require('mongoose');
const config = require('config');


//The method .get allow us to get anything we require form the module as an argument
const db = config.get('mongoURI');

const connectDB = async() => {
    try {
        //DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected...');

    } catch (err) {
        console.error(err.message);

        //Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;