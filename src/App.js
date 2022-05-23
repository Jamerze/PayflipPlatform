import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { AdminAddEmployerPage } from "./Components/Admin/AddEmployer";
import { AdminBenefits } from "./Components/Admin/Benefit";
import { AdminAddBenefitPage } from "./Components/Admin/AddBenefit";
import { AdminEditBenefitPage } from "./Components/Admin/EditBenefit";
import { AdminDash } from "./Components/Admin/Dashboard";
import { EmployerDash } from "./Components/Employer/Dashboard";
import { AdminEditEmployerPage } from "./Components/Admin/EditEmployer";
import { AdminEmployeesPage } from "./Components/Admin/Employee";
import { AdminEmployersPage } from "./Components/Admin/Employer";
import Login from "./Components/Login";
import { Signup } from "./Components/Signup";
import { useEffect } from "react";
import { EmployerBenefitsPage } from "./Components/Employer/Benefit";
import { AuthenticationPage } from "./Components/BeingAuthenticated";
import { EmployerBenefitsAssigningPage } from "./Components/Employer/BenefitAssigning";

function App() {
  let navigate = useNavigate();
  let validateurl = "http://localhost:7000/auth/validate";
  let refreshurl = "http://localhost:7000/auth/refreshToken";

  useEffect(() => {
    setInterval(() => {
      if (localStorage.getItem("accessToken") != null) {
        const refreshTokens = async () => {
          try {
            let response = await fetch(validateurl, {
              headers: { Authorization: localStorage.getItem("accessToken") },
            });
            let responseinjson = await response.json();
            if (responseinjson.message == "Authorized") {
              let newtokenresponse = await fetch(refreshurl, {
                headers: { Authorization: localStorage.getItem("accessToken") },
              });
              let newtokenresponseinjson = await newtokenresponse.json();
              localStorage.setItem(
                "accessToken",
                `Bearer ${newtokenresponseinjson.data.token.accessToken}`
              );
            } else {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("role");
            }
          } catch (err) {
            console.log(err);
          }
        };
        (async () => await refreshTokens())();
      }
    }, 14 * 60 * 1000);

    setInterval(() => {
      const authentication = async () => {
        if (localStorage.getItem("accessToken") != null) {
          let response = await fetch(validateurl, {
            headers: { Authorization: localStorage.getItem("accessToken") },
          });
          let responseinjson = await response.json();
          if (responseinjson.message != "Authorized") {
            signout();
          }
        }
      };
      (async () => await authentication())();
    }, 5000);
  });

  const signout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Routes>
      if(tr)
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="admin/dashboard" element={<AdminDash />}></Route>
      <Route path="admin/employees" element={<AdminEmployeesPage />}></Route>
      <Route path="admin/benefits" element={<AdminBenefits />}></Route>
      <Route path="admin/addBenefit" element={<AdminAddBenefitPage />}></Route>
      <Route
        path="admin/editBenefit"
        element={<AdminEditBenefitPage />}
      ></Route>
      <Route path="admin/employees" element={<AdminEmployeesPage />}></Route>
      <Route path="admin/companies" element={<AdminEmployersPage />}></Route>
      <Route
        path="admin/companies/add"
        element={<AdminAddEmployerPage />}
      ></Route>
      <Route
        path="admin/companies/:id"
        element={<AdminEditEmployerPage />}
      ></Route>
      <Route path="employer/dashboard" element={<EmployerDash />}></Route>
      <Route
        path="employer/benefits"
        element={<EmployerBenefitsAssigningPage />}
      ></Route>
      <Route path="authentication" element={<AuthenticationPage />}></Route>
      <Route path="*" element={<Navigate to="/login" />}></Route>
    </Routes>
  );
}

export default App;
