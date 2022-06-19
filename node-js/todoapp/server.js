const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
// ejs 연결
app.set("view engine", "ejs");
// MongoDB 연결
var db;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://dream1748:hcw5461752@cluster0.hhvvip9.mongodb.net/?retryWrites=true&w=majority",
  (에러, client) => {
    if (에러) return console.log(에러);
    db = client.db("todoapp");

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
app.get("/list", (요청, 응답) => {
  // db에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요
  db.collection("post")
    .find()
    .toArray((에러, 결과) => {
      응답.render("list.ejs", { posts: 결과 });
    });
});
// 상세페이지 - url params
app.get("/detail/:id", (요청, 응답) => {
  db.collection("post").findOne(
    { _id: parseInt(요청.params.id) },
    (에러, 결과) => {
      응답.render("detail.ejs", { data: 결과 });
    }
  );
});

// 어떤 사람이 /add 경로로 POST 요청을 하면...
app.post("/add", (요청, 응답) => {
  // input에 적은 정보는 요청에 들어있다.
  // 요청 데이터를 해석하려면 body-parser 라이브러리가 필요
  응답.send("전송완료");

  db.collection("counter").findOne({ name: "게시물갯수" }, (에러, 결과) => {
    var 총게시물갯수 = 결과.totalPost;

    db.collection("post").insertOne(
      {
        _id: 총게시물갯수 + 1,
        제목: 요청.body.title,
        날짜: 요청.body.date,
      },
      (에러, 결과) => {
        console.log("저장완료");
        // db데이터 하나를 수정하는 법
        db.collection("counter").updateOne(
          { name: "게시물갯수" },
          { $inc: { totalPost: 1 } },
          (에러, 결과) => {
            if (에러) return console.log(에러);
          }
        );
      }
    );
  });
});

app.delete("/delete", (요청, 응답) => {
  요청.body._id = parseInt(요청.body._id);
  db.collection("post").deleteOne(요청.body, (에러, 결과) => {
    console.log("삭제완료");
    // 응답코드 200를 보내주세요~
    응답.status(200).send({ message: "성공했습니다" });
  });
});
