var router = require("express").Router();

// 미들웨어 만들기
function 로그인했니(요청, 응답, next) {
  // 요청.user - 로그인 후 세션이 있으면 요청.user가 항상 있음
  if (요청.user) next();
  else 응답.send("로그인안하셨슴!");
}
// 모든 router에 미들웨어 적용하기
router.use(로그인했니);
// 원하는 router에만 미들웨어 적용가능
// router.use("/shirts", 로그인했니);

router.get("/sports", function (요청, 응답) {
  응답.send("스포츠 게시판");
});

router.get("/game", function (요청, 응답) {
  응답.send("게임 게시판");
});

module.exports = router;
