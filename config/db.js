const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://Ishank:Ishan123@ishanprojects.gvwjq.mongodb.net/expensetracker?
        retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.log(`Error : ${error.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;