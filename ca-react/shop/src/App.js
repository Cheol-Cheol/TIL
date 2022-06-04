import "./App.css";
import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data";
import bg from "./img/bg.png";

function App() {
  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div>

      {/* grid는 오리지널 부트스트랩 코드가 더 간단명료해서 사용했음 */}
      <div className="container">
        <div className="row">
          {shoes.map((shoe, i) => {
            return <Card shoe={shoe} i={i} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
        width="80%"
      />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </div>
  );
}
export default App;
