import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AdminDash() {
  let navigate = useNavigate();
  const url = "http://localhost:7000/dashboard";

  const [stats, setStats] = useState(null);

  useEffect(async () => {
    document.title = "Payflip - Dashboard";

    (async () => await roleAuthentication())();
    (async () => await fetchItems())();
  }, []);

  const signout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const roleAuthentication = async () => {
    let roleUrl = "http://localhost:7000/auth/role";
    const roleResponse = await fetch(roleUrl, {
      headers: { Authorization: localStorage.getItem("accessToken") },
    });
    const roleJson = await roleResponse.json();
    let newRole = roleJson.data;
    if (newRole != "admin") {
      signout();
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(url, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      const statslist = await response.json();
      console.log(statslist);
      if (statslist.statusCode != 401) {
        setStats(statslist);
      } else if (statslist.statusCode == 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } catch (err) {}
  };

  if (stats) {
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
                      className="hoverableitem nav-link active"
                    >
                      <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i
                          className="fas fa-home selectedicon"
                          aria-hidden="true"
                        ></i>
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
                      to="/admin/companies"
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
                    <Link
                      to="/login"
                      onClick={signout}
                      className="hoverableitem nav-link"
                    >
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
                        Dashboard
                      </li>
                    </ol>
                    <h6 className="font-weight-bolder mb-0">Dashboard</h6>
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
                          onClick={signout}
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
                  <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card hoverablecnt">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-8">
                            <div className="numbers">
                              <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                Total Employees
                              </p>
                              <h5 className="font-weight-bolder mb-0">
                                {stats.data.total_employees}
                              </h5>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-payflip shadow text-center border-radius-md">
                              <i
                                className="fas fa-users text-lg opacity-10"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card hoverablecnt">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-8">
                            <div className="numbers">
                              <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                Total Companies
                              </p>
                              <h5 className="font-weight-bolder mb-0">
                                {stats.data.total_employers}
                              </h5>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-payflip shadow text-center border-radius-md">
                              <i
                                className="fas fa-building text-lg opacity-10"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6">
                    <div className="card hoverablecnt">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="col-8">
                            <div className="numbers">
                              <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                Total Salary Spent
                              </p>
                              <h5 className="font-weight-bolder mb-0">
                                €{stats.data.total_salary_used}
                              </h5>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-payflip shadow text-center border-radius-md">
                              <i
                                className="fas fa-piggy-bank text-lg opacity-10"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
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
                    className="hoverableitem nav-link active"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i
                        className="fas fa-home selectedicon"
                        aria-hidden="true"
                      ></i>
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
                    to="/admin/companies"
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
                  <Link
                    to="/login"
                    onClick={signout}
                    className="hoverableitem nav-link"
                  >
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
                      Dashboard
                    </li>
                  </ol>
                  <h6 className="font-weight-bolder mb-0">Dashboard</h6>
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
                        onClick={signout}
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
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                  <div className="card hoverablecnt">
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="numbers">
                            <p className="text-sm mb-0 text-capitalize font-weight-bold">
                              Total Employees
                            </p>
                            <h5 className="font-weight-bolder mb-0">no data</h5>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="icon icon-shape bg-gradient-payflip shadow text-center border-radius-md">
                            <i
                              className="fas fa-users text-lg opacity-10"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                  <div className="card hoverablecnt">
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="numbers">
                            <p className="text-sm mb-0 text-capitalize font-weight-bold">
                              Total Companies
                            </p>
                            <h5 className="font-weight-bolder mb-0">no data</h5>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="icon icon-shape bg-gradient-payflip shadow text-center border-radius-md">
                            <i
                              className="fas fa-building text-lg opacity-10"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="card hoverablecnt">
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="numbers">
                            <p className="text-sm mb-0 text-capitalize font-weight-bold">
                              Total Salary Spent
                            </p>
                            <h5 className="font-weight-bolder mb-0">no data</h5>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="icon icon-shape bg-gradient-payflip shadow text-center border-radius-md">
                            <i
                              className="fas fa-piggy-bank text-lg opacity-10"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
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
