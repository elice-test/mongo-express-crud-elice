const mongoose = require('mongoose');
require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일의 환경 변수를 로드합니다.

const { MONGODB_URI } = process.env;


const connectDb = async () => {
    try {
        const connect = await mongoose.connect(MONGODB_URI);
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        )
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectDb;