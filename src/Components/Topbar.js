import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, animateScroll as scroll } from "react-scroll";
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
                        <Link to="home" smooth={true} duration={500}>
                            <Nav.Link
                                href="#home"
                                className="active anchor-text"
                            >
                                Home
                            </Nav.Link>
                        </Link>
                        <Link to="about" smooth={true} duration={500}>
                            <Nav.Link
                                href="#about"
                                className="active anchor-text"
                            >
                                About Us
                            </Nav.Link>
                        </Link>
                        <Link to="party" smooth={true} duration={500}>
                            <Nav.Link
                                href="#party"
                                className="active anchor-text"
                            >
                                Wedding Party
                            </Nav.Link>
                        </Link>
                        <Link to="events" smooth={true} duration={500}>
                            <Nav.Link
                                href="#events"
                                className="active anchor-text"
                            >
                                Events
                            </Nav.Link>
                        </Link>
                        <Link to="rsvp" smooth={true} duration={500}>
                            <Nav.Link
                                href="#rsvp"
                                className="active anchor-text"
                            >
                                RSVP
                            </Nav.Link>
                        </Link>
                        <Link to="contact" smooth={true} duration={500}>
                            <Nav.Link
                                href="#contact"
                                className="active anchor-text"
                            >
                                Contact Us
                            </Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Topbar;
