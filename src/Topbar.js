import { Container, Navbar } from "react-bootstrap";
import "./Topbar.css"

function Topbar() {
    return <Navbar  bg="light" fixed="top" className="topbar">
        <Container className="topbar-text">
            <Navbar.Brand href="#home">Home</Navbar.Brand>
        </Container></Navbar>;
}

export default Topbar;
