/*eslint-disable*/
import { useState } from "react";
import "./App.css";

function App() {
  let [글제목, 글제목변경] = useState([
    "가자 코트 추천",
    "다자 코트 추천",
    "나동 코트 추천",
  ]);
  let [따봉, 따봉변경] = useState([0, 0, 0]);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      {글제목.map((글, index) => {
        return (
          <div className="list" key={index}>
            <h4>
              {글}
              <span
                onClick={() => {
                  let copy = [...따봉];
                  copy[index] += 1;
                  따봉변경(copy);
                }}
              >
                👍
              </span>
              {따봉[index]}
            </h4>
            <p>2월 17일 발행</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
