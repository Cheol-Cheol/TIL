/*eslint-disable*/
import React, { useState } from "react";
import "./App.css";

function App() {
  // state값이 변경되면 관련 HTML이 자동 렌더링된다.
  let [글제목, 글제목변경] = useState([
    "가자 코트 추천",
    "다자 코트 추천",
    "나동 코트 추천",
  ]);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState("");

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      {글제목.map((글, index) => {
        return (
          <div className="list" key={index}>
            <h4
              onClick={() => {
                setModal(!modal);
                setTitle(index);
              }}
            >
              {글}
              <span
                onClick={(e) => {
                  e.stopPropagation();
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
            <button
              onClick={() => {
                let copy = [...글제목];
                copy.splice(index, 1);
                글제목변경(copy);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}
      <input
        onChange={(e) => {
          입력값변경(e.target.value);
        }}
      />
      <button
        onClick={() => {
          let copy = [...글제목];
          copy.unshift(입력값);
          글제목변경(copy);
        }}
      >
        버튼
      </button>
      {modal ? <Modal 글제목={글제목} title={title} /> : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  );
}

// 옛날 버전 컴포넌트 생성
class Profile extends React.Component {
  constructor() {
    super();
    this.state = { name: "Kim", age: 30 };
  }

  render() {
    return (
      <div>
        <h3>프로필입니다</h3>
        <p>저는 {this.state.name} 입니다.</p>
        <button
          onClick={() => {
            this.setState({ name: "Park" });
          }}
        >
          버튼
        </button>
      </div>
    );
  }
}
export default App;
