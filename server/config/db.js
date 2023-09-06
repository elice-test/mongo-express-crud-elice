const mongoose = require('mongoose');  // mongoose라는 ODM 라이브러리 가져옴. 
require('dotenv').config(); // dotenv 패키지를 사용하여 .env 파일의 환경 변수를 로드함. 
// .env  파일이란? : 보안 관련 정보들을 담아두는 공간. 

const { MONGODB_URI } = process.env;


const connectDb = async () => {
    try {
        const connect = await mongoose.connect(MONGODB_URI);
        console.log(
            `Database connected: \nhost : ${connect.connection.host}\nDB name : ${connect.connection.name}`
            
        )
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectDb;