import { Container, Navbar, Nav } from "react-bootstrap";
import "./Topbar.css";

function Topbar() {
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            bg="light"
            fixed="top"
            className="topbar"
        >
            <Container className="nav justify-content-end toptext">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto toptext">
                        <Nav.Link href="#home" className="active anchor-text">Home</Nav.Link>
                        <Nav.Link href="#about" className="active anchor-text">About Us</Nav.Link>
                        <Nav.Link href="#party" className="active anchor-text">Wedding Party</Nav.Link>
                        <Nav.Link href="#details" className="active anchor-text">Details</Nav.Link>
                        <Nav.Link href="#rsvp" className="active anchor-text">RSVP</Nav.Link>
                        <Nav.Link href="#contact" className="active anchor-text">Contact Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Topbar;
