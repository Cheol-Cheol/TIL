const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
var db;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://dream1748:hcw5461752@cluster0.hhvvip9.mongodb.net/?retryWrites=true&w=majority",
  (에러, client) => {
    if (에러) return console.log(에러);
    db = client.db("todoapp");

    // db.collection("post").insertOne(
    //   { 이름: "john", _id: 100 },
    //   (에러, 결과) => {
    //     console.log("저장완료");
    //   }
    // );

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

// GET 요청 처리
app.get("/pet", function (요청, 응답) {
  응답.send("펫용품 쇼핑할 수 있는 페이지입니다.");
});
app.get("/beauty", (요청, 응답) => {
  응답.send("뷰티용품 쇼핑할 수 있는 페이지입니다.");
});
app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/index.html");
});
app.get("/write", (요청, 응답) => {
  응답.sendFile(__dirname + "/write.html");
});
// 어떤 사람이 /add 경로로 POST 요청을 하면...
app.post("/add", (요청, 응답) => {
  // input에 적은 정보는 요청에 들어있다.
  // 요청 데이터를 해석하려면 body-parser 라이브러리가 필요
  응답.send("전송완료");
  db.collection("post").insertOne(
    {
      제목: 요청.body.title,
      날짜: 요청.body.date,
    },
    (에러, 결과) => {
      console.log("저장완료");
    }
  );
});
