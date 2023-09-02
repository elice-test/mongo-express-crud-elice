const express = require('express') // Express.js 라이브러리를 가져오기
const app = express()  // Express 애플리케이션을 생성합니다. app 변수는 애플리케이션 객체임
const port = 3000 // 웹 서버가 실행될 포트 번호를 설정
// app은 서버 그 자체의 역할을 하게됨

app.get('/', (req, res) => {   //   '/'경로로 들어오는 GET 요청에 대해 콜백함수 실행
  res.send('Hello World!')     // '/'경로로 GET 요청이 들어왔을 때, 요청을한 상대방에게
                               //  'Hello World!'라는 문자열을 send(보냄)해줌
})
//즉, 해당 경로로 들어왔을 때 콜백함수가 실행됨.
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) //서버가 시작되면 지정한 포트 3000에서 클라이언트의 요청을 처리