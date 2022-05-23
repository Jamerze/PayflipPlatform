import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AdminEmployeesPage = () => {
  const url = "http://localhost:7000/employee";
  let headers = { Authorization: localStorage.getItem("accessToken") };
  let navigate = useNavigate();

  const [employeeList, setEmployeeList] = useState(null);

  useEffect(() => {
    document.title = "Payflip - Employees";
    const fetchItems = async () => {
      try {
        const response = await fetch(url, { headers: headers });
        const employees = await response.json();
        console.log(employees.data);

        employees.data.sort(function (employee1, employee2) {
          if (employee1.employer_id < employee2.employer_id) {
            return -1;
          } else if (employee1.employer_id == employee2.employer_id) {
            return 0;
          } else {
            return 1;
          }
        });
        setEmployeeList(employees.data);
      } catch (err) {}
    };

    (async () => await fetchItems())();
  }, []);

  const deleteEmployee = (id) => {
    console.log(id.target.value);
    try {
      axios.delete(`http://localhost:7000/employee/${id.target.value}`, {
        headers: headers,
      });
      window.location.reload();
    } catch (error) {
      console.log(`Employee with id ${id.target.value} couldn't be deleted.`);
    }
  };

  const addEmployee = () => {
    navigate("/admin/employee/add");
  };

  const editEmployee = (id) => {
    navigate(`/admin/employee/${id.target.value}`);
  };

  if (employeeList) {
    return (
      <>
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
                      to="/admin/dashboard"
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
                      to="/admin/benefits"
                      className="hoverableitem nav-link"
                    >
                      <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-trophy" aria-hidden="true"></i>
                      </div>
                      <span className="nav-link-text ms-1">Benefits</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/admin/employees"
                      className="hoverableitem nav-link active"
                    >
                      <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i
                          className="fas fa-users selectedicon"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <span className="nav-link-text ms-1">Employees</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/admin/companies"
                      className="hoverableitem nav-link "
                    >
                      <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="fas fa-building " aria-hidden="true"></i>
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
                        <a className="opacity-5 text-dark">Admin</a>
                      </li>
                      <li
                        className="breadcrumb-item text-sm text-dark active"
                        aria-current="page"
                      >
                        Employees
                      </li>
                    </ol>
                    <h6 className="font-weight-bolder mb-0">Overview</h6>
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
                <div className="row">
                  <div className="col-12">
                    <div className="card mb-4">
                      <div className="card-header pb-0">
                        <div className="row-md-1 col-md-0">
                          <nav
                            className="
          navbar navbar-main navbar-expand-lg
          px-0    
          shadow-none
          border-radius-xl
        "
                            id="navbarBlur"
                            navbar-scroll="true"
                          />
                          <h6 className="text-redpayflipfg">Employees</h6>
                          <div className="container-fluid py-1 px-3">
                            <div
                              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                              id="navbar"
                            >
                              <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
                              <ul className="navbar-nav justify-content-end">
                                <li className="nav-item d-flex align-items-center">
                                  <a
                                    href="hln.be"
                                    className="nav-link text-body font-weight-bold px-0"
                                  >
                                    <button
                                      href=""
                                      className="fa fa-user-plus me-sm-1 btn btn-link"
                                    ></button>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <button
                            onClick={addEmployee}
                            className="fa fa-user-plus btn btn-link text-secondary mb-0"
                          ></button>
                        </div>
                      </div>
                      <div className="card-body px-0 pt-0 pb-2">
                        <div className="table-responsive p-0">
                          <table className="table align-items-center justify-content-center mb-0">
                            <thead>
                              <tr>
                                <th
                                  className="
                            text-uppercase text-secondary text-xxs
                            font-weight-bolder
                            opacity-7
                          "
                                >
                                  EmployeeName
                                </th>
                                <th
                                  className="
                            text-uppercase text-secondary text-xxs
                            font-weight-bolder
                            opacity-7
                            ps-2
                          "
                                >
                                  Contact Mail
                                </th>
                                <th
                                  className="
                            text-uppercase text-secondary text-xxs
                            font-weight-bolder
                            opacity-7
                            ps-2
                          "
                                >
                                  Country
                                </th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {employeeList.map((employee) => {
                                return (
                                  <tr>
                                    <td>
                                      <div className="d-flex px-3">
                                        <div className="my-auto">
                                          <h6 className="mb-0 text-sm">
                                            {employee.name}
                                          </h6>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <p className="text-sm font-weight-bold mb-0">
                                        {employee.user.email}
                                      </p>
                                    </td>
                                    <td>
                                      <span className="text-xs font-weight-bold">
                                        {employee.country}
                                      </span>
                                    </td>
                                    <td className="align-middle">
                                      <button
                                        onClick={editEmployee}
                                        className="fas fa-edit btn btn-link text-secondary mb-0"
                                        style={{ marginRight: "10px" }}
                                        value={employee.id}
                                      ></button>
                                      <button
                                        onClick={deleteEmployee}
                                        className="fa fa-trash btn btn-link text-secondary mb-0"
                                        value={employee.id}
                                      ></button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
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
      </>
    );
  }

  return (
    <>
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
                    to="/admin/dashboard"
                    className="hoverableitem nav-link"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fas fa-home" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/benefits" className="hoverableitem nav-link">
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fas fa-trophy" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Benefits</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/employees"
                    className="hoverableitem nav-link active"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i
                        className="fas fa-users selectedicon"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <span className="nav-link-text ms-1">Employees</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/companies"
                    className="hoverableitem nav-link "
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fas fa-building " aria-hidden="true"></i>
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
                      <a className="opacity-5 text-dark">Admin</a>
                    </li>
                    <li
                      className="breadcrumb-item text-sm text-dark active"
                      aria-current="page"
                    >
                      Companies
                    </li>
                  </ol>
                  <h6 className="font-weight-bolder mb-0">Overview</h6>
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
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-header pb-0">
                      <div className="row-md-1 col-md-0">
                        <nav
                          className="
          navbar navbar-main navbar-expand-lg
          px-0    
          shadow-none
          border-radius-xl
        "
                          id="navbarBlur"
                          navbar-scroll="true"
                        />
                        <h6 className="text-redpayflipfg">Companies</h6>
                        <div className="container-fluid py-1 px-3">
                          <div
                            className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                            id="navbar"
                          >
                            <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
                            <ul className="navbar-nav justify-content-end">
                              <li className="nav-item d-flex align-items-center">
                                <a
                                  href="hln.be"
                                  className="nav-link text-body font-weight-bold px-0"
                                >
                                  <i
                                    className="fa fa-user-plus me-sm-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addEmployeeModal"
                                  ></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <button
                          onClick={addEmployee}
                          className="fa fa-user-plus btn btn-link text-secondary mb-0"
                        ></button>
                      </div>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center justify-content-center mb-0">
                          <thead>
                            <tr>
                              <th
                                className="
                            text-uppercase text-secondary text-xxs
                            font-weight-bolder
                            opacity-7
                          "
                              >
                                Company
                              </th>
                              <th
                                className="
                            text-uppercase text-secondary text-xxs
                            font-weight-bolder
                            opacity-7
                            ps-2
                          "
                              >
                                Contact Mail
                              </th>
                              <th
                                className="
                            text-uppercase text-secondary text-xxs
                            font-weight-bolder
                            opacity-7
                            ps-2
                          "
                              >
                                Country
                              </th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Data is still being loaded in</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
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
    </>
  );
};
