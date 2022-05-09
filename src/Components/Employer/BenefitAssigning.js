import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const EmployerBenefitsAssigningPage = () => {
  const urlavailablebenefits = "http://localhost:7000/employer-benefit/country";
  const urlcompanybenefits = "http://localhost:7000/employer-benefit";
  let headers = { Authorization: localStorage.getItem("accessToken") };
  let navigate = useNavigate();

  const [availableBenefitsList, setAvailableBenefitsList] = useState(null);
  const [companyBenefitsList, setCompanyBenefitsList] = useState([]);

  useEffect(() => {
    document.title = "Payflip - Benefits";
    (async () => await fetchItems())();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(urlavailablebenefits, { headers: headers });
      const response2 = await fetch(urlcompanybenefits, { headers: headers });
      const availablebenefits = await response.json();
      const companybenefits = await response2.json();

      let tempAvailableBenefitList = availablebenefits.data;
      let tempCompanyBenefitList = companybenefits.data;

      let companyBenefitsArray = [];

      if (tempCompanyBenefitList.length > 0) {
        tempCompanyBenefitList[0].benefits.forEach((benefit) => {
          companyBenefitsArray.push(
            tempAvailableBenefitList.find((benefit2) => benefit == benefit2.id)
          );
          tempAvailableBenefitList.splice(
            tempAvailableBenefitList.indexOf(
              tempAvailableBenefitList.find(
                (benefit2) => benefit == benefit2.id
              )
            ),
            1
          );
        });
      }

      setCompanyBenefitsList(companyBenefitsArray);
      setAvailableBenefitsList(tempAvailableBenefitList);
    } catch (err) {
      console.log(err);
      console.log("Error while trying to retrieve benefit data.");
    }
  };

  const addBenefit = (id) => {
    try {
      companyBenefitsList.push(
        availableBenefitsList.find((benefit) => benefit.id == id.target.value)
      );
      setCompanyBenefitsList([...companyBenefitsList]);
      console.log(companyBenefitsList);
      availableBenefitsList.splice(
        availableBenefitsList.indexOf(
          availableBenefitsList.find((benefit) => benefit.id == id.target.value)
        ),
        1
      );
      setAvailableBenefitsList([...availableBenefitsList]);
      console.log(availableBenefitsList);
    } catch (error) {
      console.log(error);
      console.log("Benefit couldn't be added");
    }
  };

  const saveBenefits = async () => {
    const response = await fetch("http://localhost:7000/auth/profile", {
      headers: headers,
    });
    const userprofile = await response.json();
    console.log(userprofile.data.id);
    console.log(companyBenefitsList.map((benefit) => benefit.id));
    axios
      .post(
        "http://localhost:7000/employer-benefit",
        {
          employer_id: userprofile.data.id,
          benefits: companyBenefitsList.map((benefit) => benefit.id),
        },
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
        document.getElementById("alertsuccess").hidden = false;
        setInterval(
          () => (document.getElementById("alertsuccess").hidden = true),
          5000
        );
        navigate("/employer/benefit");
      })
      .catch((err) => {
        document.getElementById("alertdanger").hidden = false;
        setInterval(
          () => (document.getElementById("alertdanger").hidden = true),
          5000
        );
      });
  };

  if (availableBenefitsList) {
    return (
      <div>
        <div className="g-sidenav-show  bg-gray-100">
          <div className="backgroundimg">
            <aside
              className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
              id="sidenav-main"
            >
              <div className="sidenav-header">
                <i
                  className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                  aria-hidden="true"
                  id="iconSidenav"
                ></i>
                <a
                  className="navbar-brand m-0"
                  href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html"
                  target="_blank"
                >
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fproxy%2F0*kYj1aQljmDquuw7Z&f=1&nofb=1"
                    className="navbar-brand-img h-100"
                    alt="main_logo"
                  />
                </a>
              </div>
              <hr className="horizontal dark mt-0" />
              <div
                className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100"
                id="sidenav-collapse-main"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      to="/employer/dashboard"
                      className="hoverableitem nav-link"
                    >
                      <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-home" aria-hidden="true"></i>
                      </div>
                      <span className="nav-link-text ms-1">Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/employer/benefits"
                      className="hoverableitem nav-link active"
                    >
                      <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i
                          className="fas fa-trophy selectedicon"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <span className="nav-link-text ms-1">Benefits</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/employer/employees"
                      className="hoverableitem nav-link"
                    >
                      <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-users" aria-hidden="true"></i>
                      </div>
                      <span className="nav-link-text ms-1">Employees</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/employer/companies"
                      className="hoverableitem nav-link"
                    >
                      <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-building" aria-hidden="true"></i>
                      </div>
                      <span className="nav-link-text ms-1">Companies</span>
                    </Link>
                  </li>
                  <li className="nav-item mt-3">
                    <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                      Account pages
                    </h6>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="hoverableitem nav-link">
                      <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                      </div>
                      <span className="nav-link-text ms-1">Sign Out</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
              {/* <!-- Navbar --> */}
              <nav
                className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
                id="navbarBlur"
                navbar-scroll="true"
              >
                <div className="container-fluid py-1 px-3">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                      <li className="breadcrumb-item text-sm">
                        <a className="opacity-5 text-dark">Company</a>
                      </li>
                      <li
                        className="breadcrumb-item text-sm text-dark active"
                        aria-current="page"
                      >
                        Benefits
                      </li>
                    </ol>
                    <h6 className="font-weight-bolder mb-0">Benefits</h6>
                  </nav>
                  <div
                    className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                    id="navbar"
                  >
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
                    <ul className="navbar-nav  justify-content-end">
                      <li className="nav-item d-flex align-items-center">
                        <Link
                          to="/login"
                          className="nav-link text-body font-weight-bold px-0"
                        >
                          <i className="fa fa-user me-sm-1"></i>
                          <span className="d-sm-inline d-none">Sign out</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              {/* <!-- End Navbar --> */}
              <div className="container-fluid py-4">
                <div
                  className="alert alert-success"
                  style={{ color: "white" }}
                  role="alert"
                  id="alertsuccess"
                  hidden={true}
                >
                  Benefits are saved.
                </div>
                <div
                  className="alert alert-danger"
                  style={{ color: "white" }}
                  role="alert"
                  id="alertdanger"
                  hidden={true}
                >
                  Error while trying to save the benefits. Please try again
                  later.
                </div>
                <div className="d-flex justify-content-between">
                  <ul className="list-group w-30 p-3">
                    <a
                      href="#"
                      className="list-group-item list-group-item-action active"
                    >
                      Available benefits:
                    </a>
                    {availableBenefitsList.length > 0 ? (
                      availableBenefitsList.map((benefit) => {
                        return (
                          <button
                            key={benefit.id}
                            value={benefit.id}
                            onClick={addBenefit}
                            className="list-group-item"
                          >
                            {benefit.name}
                          </button>
                        );
                      })
                    ) : (
                      <div className="list-group-item list-group-item-action disabled  d-flex justify-content-between align-items-center">
                        No more benefits to add.
                      </div>
                    )}
                  </ul>
                  <ul
                    className="list-group w-30 p-3"
                    style={{ listStyle: "none" }}
                  >
                    <a
                      href="#"
                      className="list-group-item list-group-item-action active"
                    >
                      The benefits in your package:
                    </a>
                    {companyBenefitsList.length > 0 ? (
                      companyBenefitsList.map((benefit) => {
                        return (
                          <a
                            key={benefit.id}
                            href="#"
                            className="list-group-item list-group-item-action disabled  d-flex justify-content-between align-items-center"
                          >
                            {benefit.name}
                          </a>
                        );
                      })
                    ) : (
                      <div className="list-group-item list-group-item-action disabled  d-flex justify-content-between align-items-center">
                        No benefits in your company package.
                      </div>
                    )}
                  </ul>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    onClick={fetchItems}
                    type="button"
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveBenefits}
                    type="button"
                    className="btn btn-success"
                  >
                    Save
                  </button>
                </div>
                <footer className="footer pt-3  ">
                  <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                      <div className="col-lg-6 mb-lg-0 mb-4">
                        <div className="copyright text-center text-sm text-muted text-lg-start">
                          ©2022, Payflip
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                          <li className="nav-item">
                            <a
                              href="https://en.payflip.be/team"
                              className="nav-link text-muted"
                              target="_blank"
                            >
                              About Us
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="https://en.payflip.be/blogs"
                              className="nav-link text-muted"
                              target="_blank"
                            >
                              Blog
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="https://en.payflip.be/partners"
                              className="nav-link pe-0 text-muted"
                              target="_blank"
                            >
                              Partners
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="g-sidenav-show  bg-gray-100">
        <div className="backgroundimg">
          <aside
            className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
            id="sidenav-main"
          >
            <div className="sidenav-header">
              <i
                className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true"
                id="iconSidenav"
              ></i>
              <a
                className="navbar-brand m-0"
                href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html"
                target="_blank"
              >
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fproxy%2F0*kYj1aQljmDquuw7Z&f=1&nofb=1"
                  className="navbar-brand-img h-100"
                  alt="main_logo"
                />
              </a>
            </div>
            <hr className="horizontal dark mt-0" />
            <div
              className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100"
              id="sidenav-collapse-main"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/employer/dashboard"
                    className="hoverableitem nav-link"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fas fa-home" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/employer/benefits"
                    className="hoverableitem nav-link active"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i
                        className="fas fa-trophy selectedicon"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <span className="nav-link-text ms-1">Benefits</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/employer/employees"
                    className="hoverableitem nav-link"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fas fa-users" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Employees</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/employer/companies"
                    className="hoverableitem nav-link"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fas fa-building" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Companies</span>
                  </Link>
                </li>
                <li className="nav-item mt-3">
                  <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                    Account pages
                  </h6>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="hoverableitem nav-link">
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Sign Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
            {/* <!-- Navbar --> */}
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li className="breadcrumb-item text-sm">
                      <a className="opacity-5 text-dark">Company</a>
                    </li>
                    <li
                      className="breadcrumb-item text-sm text-dark active"
                      aria-current="page"
                    >
                      Benefits
                    </li>
                  </ol>
                  <h6 className="font-weight-bolder mb-0">Benefits</h6>
                </nav>
                <div
                  className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                  id="navbar"
                >
                  <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
                  <ul className="navbar-nav  justify-content-end">
                    <li className="nav-item d-flex align-items-center">
                      <Link
                        to="/login"
                        className="nav-link text-body font-weight-bold px-0"
                      >
                        <i className="fa fa-user me-sm-1"></i>
                        <span className="d-sm-inline d-none">Sign out</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* <!-- End Navbar --> */}
            <div className="container-fluid py-4">
              <p>Benefits data is being loaded.</p>
              <footer className="footer pt-3  ">
                <div className="container-fluid">
                  <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                      <div className="copyright text-center text-sm text-muted text-lg-start">
                        ©2022, Payflip
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                        <li className="nav-item">
                          <a
                            href="https://en.payflip.be/team"
                            className="nav-link text-muted"
                            target="_blank"
                          >
                            About Us
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="https://en.payflip.be/blogs"
                            className="nav-link text-muted"
                            target="_blank"
                          >
                            Blog
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="https://en.payflip.be/partners"
                            className="nav-link pe-0 text-muted"
                            target="_blank"
                          >
                            Partners
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
