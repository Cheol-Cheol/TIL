const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
// ejs 연결
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
// method-override 연결
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// dotenv 연결
require("dotenv").config();
// MongoDB 연결
var db;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(process.env.DB_URL, (에러, client) => {
  if (에러) return console.log(에러);
  db = client.db("todoapp");

  app.listen(process.env.PORT, function () {
    console.log("listening on 8080");
  });
});

// GET 요청 처리
app.get("/", (요청, 응답) => {
  응답.render("index.ejs");
});
app.get("/write", (요청, 응답) => {
  응답.render("write.ejs");
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
// 글 수정 페이지
app.get("/edit/:id", (요청, 응답) => {
  db.collection("post").findOne(
    { _id: parseInt(요청.params.id) },
    (에러, 결과) => {
      응답.render("edit.ejs", { post: 결과 });
    }
  );
});
// 검색기능
app.get("/search", (요청, 응답) => {
  var 검색조건 = [
    {
      $search: {
        index: "titleSearch",
        text: {
          query: 요청.query.value,
          path: "제목", // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        },
      },
    },
  ];
  db.collection("post")
    .aggregate(검색조건)
    .toArray((에러, 결과) => {
      응답.render("search.ejs", { posts: 결과 });
    });
});

app.put("/edit", (요청, 응답) => {
  db.collection("post").updateOne(
    { _id: parseInt(요청.body.id) },
    { $set: { 제목: 요청.body.title, 날짜: 요청.body.date } },
    (에러, 결과) => {
      console.log("수정완료");
      응답.redirect("/list");
    }
  );
});

// 회원 기능
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/login", (request, response) => {
  response.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/fail",
  }),
  (request, response) => {
    response.redirect("/");
  }
);
app.get("/mypage", 로그인했니, (request, response) => {
  console.log(request.user);
  response.render("mypage.ejs", { 사용자: request.user });
});

// 미들웨어 만드는 법 (마이페이지 접속 전 실행할 미들웨어)
function 로그인했니(요청, 응답, next) {
  // 요청.user - 로그인 후 세션이 있으면 요청.user가 항상 있음
  if (요청.user) next();
  else 응답.send("로그인안하셨슴!");
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      //console.log(입력한아이디, 입력한비번);
      db.collection("login").findOne(
        { id: 입력한아이디 },
        function (에러, 결과) {
          if (에러) return done(에러);

          if (!결과)
            return done(null, false, { message: "존재하지않는 아이디요" });
          if (입력한비번 == 결과.pw) {
            return done(null, 결과);
          } else {
            return done(null, false, { message: "비번틀렸어요" });
          }
        }
      );
    }
  )
);

// session 데이터 만드는 코드
passport.serializeUser(function (user, done) {
  // 상단의 아이디/비번 검증 성공시 user로 자동으로 보내짐
  done(null, user.id);
});

passport.deserializeUser(function (아이디, done) {
  // db에서 위에있는 user.id (=아이디)로 유저를 찾은 뒤에 유저 정보를
  // done(null, {요기에 넣음});
  db.collection("login").findOne({ id: 아이디 }, (에러, 결과) => {
    done(null, 결과);
  });
});

app.post("/register", function (요청, 응답) {
  db.collection("login").insertOne(
    { id: 요청.body.id, pw: 요청.body.pw },
    function (에러, 결과) {
      응답.redirect("/");
    }
  );
});

// 어떤 사람이 /newpost 경로로 POST 요청을 하면...
app.post("/newpost", (요청, 응답) => {
  // input에 적은 정보는 요청에 들어있다.
  // 요청 데이터를 해석하려면 body-parser 라이브러리가 필요
  db.collection("counter").findOne({ name: "게시물갯수" }, (에러, 결과) => {
    var 총게시물갯수 = 결과.totalPost;
    var 저장할거 = {
      _id: 총게시물갯수 + 1,
      작성자: 요청.user._id,
      제목: 요청.body.title,
      날짜: 요청.body.date,
    };
    db.collection("post").insertOne(저장할거, (에러, 결과) => {
      console.log("저장완료");
      // db데이터 하나를 수정하는 법
      db.collection("counter").updateOne(
        { name: "게시물갯수" },
        { $inc: { totalPost: 1 } },
        (에러, 결과) => {
          if (에러) return console.log(에러);
          응답.redirect("/list");
        }
      );
    });
  });
});

app.delete("/delete", (요청, 응답) => {
  요청.body._id = parseInt(요청.body._id);
  var 삭제할데이터 = { _id: 요청.body._id, 작성자: 요청.user._id };

  db.collection("post").deleteOne(삭제할데이터, (에러, 결과) => {
    if (에러) return console.log(에러);
    console.log("삭제완료");
    // 응답코드 200를 보내주세요~
    응답.status(200).send({ message: "성공했습니다" });
  });
});

// app.use() : 요청과 응답사이에 실행가능한 미들웨어
// 고객이 /shop 경로로 요청했을 때 이런 미들웨어를 적용해주세요
app.use("/shop", require("./routes/shop"));
app.use("/board/sub", require("./routes/board"));

// 이미지 업로드
let multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("PNG, JPG만 업로드하세요"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});
var upload = multer({ storage: storage });

app.get("/upload", (요청, 응답) => {
  응답.render("upload.ejs");
});

app.post("/upload", upload.single("profile"), function (요청, 응답) {
  응답.send("업로드완료");
});

app.get("/image/:imageName", (요청, 응답) => {
  응답.sendFile(__dirname + "/public/image/" + 요청.params.imageName);
});

const { ObjectId } = require("mongodb");

app.post("/chatroom", 로그인했니, (요청, 응답) => {
  let 데이터 = {
    member: [ObjectId(요청.body.당한사람id), 요청.user._id],
    title: 요청.body.title,
    date: new Date(),
  };
  db.collection("chatroom").insertOne(데이터, (에러, 결과) => {
    console.log("생성완료");
    응답.status(200).send({ message: "서버에서 채팅방을 개설했습니다." });
  });
});

app.get("/chat", 로그인했니, (요청, 응답) => {
  db.collection("chatroom")
    .find({ member: 요청.user._id })
    .toArray()
    .then((결과) => {
      응답.render("chat.ejs", { data: 결과 });
    });
});

app.post("/message", 로그인했니, (요청, 응답) => {
  var 저장할거 = {
    parent: 요청.body.parent,
    content: 요청.body.content,
    userId: 요청.user._id,
    date: new Date(),
  };
  db.collection("message")
    .insertOne(저장할거)
    .then(() => {
      console.log("DB저장성공");
      응답.send("DB저장성공");
    });
});

app.get("/message/:id", 로그인했니, function (요청, 응답) {
  응답.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  db.collection("message")
    .find({ parent: 요청.params.id })
    .toArray()
    .then((결과) => {
      응답.write("event: test\n");
      응답.write(`data: ${JSON.stringify(결과)}\n\n`);
    });

  const 찾을문서 = [
    { $match: { "fullDocument.parent": 요청.params.parentid } },
  ];

  const changeStream = db.collection("message").watch(찾을문서);
  changeStream.on("change", (result) => {
    console.log(result.fullDocument);
    var 추가된문서 = [result.fullDocument];
    응답.write(`data: ${JSON.stringify(추가된문서)}\n\n`);
  });
});
