/*eslint-disable*/
import { useState } from "react";
import "./App.css";

function App() {
  // state 왜 써야함?
  // state가 변경되면 관련 HTML은 자동 재렌더링된다.
  let [글제목, 글제목변경] = useState([
    "가자 코트 추천",
    "다자 코트 추천",
    "나동 코트 추천",
  ]);
  let [따봉, 따봉변경] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <button
        onClick={() => {
          let copy = [...글제목];
          copy.sort();
          글제목변경(copy);
        }}
      >
        가나다순
      </button>
      <button
        onClick={() => {
          let copy = [...글제목];
          copy[0] = "여여 코트 변경";
          글제목변경(copy);
        }}
      >
        버튼
      </button>
      <div className="list">
        <h4>
          {글제목[0]}{" "}
          <span
            onClick={() => {
              따봉변경(따봉 + 1);
            }}
          >
            👍
          </span>{" "}
          {따봉}
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
