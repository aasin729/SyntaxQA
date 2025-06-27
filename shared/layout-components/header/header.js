import React, { useState } from "react";
import { Navbar, Dropdown, Button, Form, Col, Row, Modal } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const { basePath } = useRouter();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    document.querySelector("body").classList.toggle("sidenav-toggled");
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    document.querySelector(".app").classList.toggle("dark-theme");
    document.querySelector(".app").classList.remove("light-theme");
  };

  // Toggle responsive search
  const toggleResponsiveSearch = () => {
    document.querySelector(".navbar-form").classList.toggle("active");
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (
      (document.fullScreenElement && document.fullScreenElement === null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  // Country data for language modal
  const countries = [
    { name: "Usa", flag: "us_flag.jpg" },
    { name: "Italy", flag: "italy_flag.jpg" },
    { name: "Spain", flag: "spain_flag.jpg" },
    { name: "India", flag: "india_flag.jpg" },
    { name: "France", flag: "french_flag.jpg" },
    { name: "Mexico", flag: "mexico.jpg" },
    { name: "Singapore", flag: "singapore.jpg" },
    { name: "Poland", flag: "poland.jpg" },
    { name: "Austria", flag: "austria.jpg" },
    { name: "Russia", flag: "russia_flag.jpg" },
    { name: "Germany", flag: "germany_flag.jpg" },
    { name: "Argentina", flag: "argentina.jpg" },
    { name: "Brazil", flag: "brazil.jpg" },
    { name: "U.A.E", flag: "uae.jpg" },
    { name: "China", flag: "china.jpg" },
    { name: "U.K", flag: "uk.jpg" },
    { name: "Malaysia", flag: "malaysia.jpg" },
    { name: "Canada", flag: "canada.jpg" }
  ];

  const getImagePath = (imageName) => {
    return `${process.env.NODE_ENV === 'production' ? basePath : ''}/assets/img/${imageName}`;
  };

  return (
    <Navbar className="main-header side-header sticky nav nav-item">
      <div className="main-container container-fluid">
        {/* Header Left Section */}
        <div className="main-header-left">
          <div className="responsive-logo">
            <Link href="/components/dashboards/dashboard1/" className="header-logo">
              <img
                src={getImagePath("brand/logo.png")}
                className="mobile-logo logo-1"
                alt="logo"
              />
              <img
                src={getImagePath("brand/logo-white.png")}
                className="mobile-logo dark-logo-1"
                alt="logo"
              />
            </Link>
          </div>
          
          <div
            className="app-sidebar__toggle"
            data-bs-toggle="sidebar"
            onClick={toggleSidebar}
          >
            <Link className="open-toggle" href="#!">
              <i className="header-icon fe fe-align-left"></i>
            </Link>
            <Link className="close-toggle" href="#!">
              <i className="header-icon fe fe-x"></i>
            </Link>
          </div>
          
          <div className="logo-horizontal">
            <Link href="/dashboard/dashboard-1" className="header-logo">
              <img
                src={getImagePath("brand/logo.png")}
                className="mobile-logo logo-1"
                alt="logo"
              />
              <img
                src={getImagePath("brand/logo-white.png")}
                className="mobile-logo dark-logo-1"
                alt="logo"
              />
            </Link>
          </div>
        </div>

        {/* Header Right Section */}
        <div className="main-header-right">
          <Navbar.Toggle
            className="navresponsive-toggler d-lg-none ms-auto"
            type="button"
          >
            <span className="navbar-toggler-icon fe fe-more-vertical"></span>
          </Navbar.Toggle>
          
          <div className="mb-0 navbar navbar-expand-lg navbar-nav-right responsive-navbar navbar-dark p-0">
            <Navbar.Collapse className="collapse" id="navbarSupportedContent-4">
              <ul className="nav nav-item header-icons navbar-nav-right">
                
                {/* Language Selector */}
                {/* <li className="dropdown nav-item">
                  <Link
                    className="new nav-link"
                    data-bs-target="#country-selector"
                    data-bs-toggle="modal"
                    href="#!"
                    onClick={() => setShowLanguageModal(true)}
                  >
                    <svg
                      className="header-icon-svgs"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z" />
                    </svg>
                  </Link>
                </li> */}

                {/* Dark Mode Toggle */}
                <li className="dropdown nav-item">
                  <a
                    className="new nav-link theme-layout nav-link-bg layout-setting"
                    onClick={toggleDarkMode}
                  >
                    <span className="dark-layout">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-icon-svgs"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z" />
                      </svg>
                    </span>
                    <span className="light-layout">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-icon-svgs"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" />
                      </svg>
                    </span>
                  </a>
                </li>

                {/* Fullscreen Toggle */}
                <li
                  className="nav-item full-screen fullscreen-button"
                  onClick={toggleFullscreen}
                >
                  <Link className="new nav-link full-screen-link" href="#!">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="header-icon-svgs"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z" />
                    </svg>
                  </Link>
                </li>

                {/* Mobile Search */}
                <li className="nav-link search-icon d-lg-none d-block">
                  <Form
                    className="navbar-form"
                    role="search"
                    onClick={toggleResponsiveSearch}
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                      <span className="input-group-btn">
                        <Button
                          variant=""
                          type="reset"
                          className="btn btn-default"
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                        <Button
                          variant=""
                          className="btn btn-default nav-link resp-btn"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            className="header-icon-svgs"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#000000"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                          </svg>
                        </Button>
                      </span>
                    </div>
                  </Form>
                </li>

                {/* User Profile Dropdown */}
                <Dropdown className="main-profile-menu nav nav-item nav-link ps-lg-2">
                  <Dropdown.Toggle
                    className="new nav-link profile-user d-flex"
                    variant=""
                  >
                    <img
                      alt=""
                      src={getImagePath("faces/2.jpg")}
                      className=""
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="menu-header-content p-3 border-bottom">
                      <div className="d-flex wd-100p">
                        <div className="main-img-user">
                          <img
                            alt=""
                            src={getImagePath("faces/2.jpg")}
                            className=""
                          />
                        </div>
                        <div className="ms-3 my-auto">
                          <h6 className="tx-15 font-weight-semibold mb-0">
                            Teri Dactyl
                          </h6>
                          <span className="dropdown-title-text subtext op-6 tx-12">
                            Premium Member
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link className="dropdown-item" href="/">
                      <i className="far fa-arrow-alt-circle-left"></i> Sign Out
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </Navbar.Collapse>
          </div>
        </div>
      </div>

      {/* Language Selection Modal */}
      <Modal
        show={showLanguageModal}
        onHide={() => setShowLanguageModal(false)}
        centered
        id="country-selector"
      >
        <Modal.Header>
          <h6 className="modal-title">Choose Country</h6>
          <Button
            variant=""
            type="button"
            onClick={() => setShowLanguageModal(false)}
          >
            <span aria-hidden="true" className="text-dark">X</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Row as="ul" className="p-3">
            {countries.map((country, index) => (
              <Col lg={6} as="li" className="mb-2" key={index}>
                <Link
                  href="#!"
                  className="btn btn-country btn-lg btn-block"
                >
                  <span className="country-selector">
                    <img
                      alt=""
                      src={getImagePath(`flags/${country.flag}`)}
                      className="me-3 language"
                    />
                  </span>
                  {country.name}
                </Link>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

Header.propTypes = {};

Header.defaultProps = {};
