import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as YUP from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { UserContext } from "../../context/User/context";
import style from "./Login.module.css";

export default function Login() {
  let { setUserToken, setUserData } = useContext(UserContext);

  let regExPassword = /^[A-Z][a-z0-9_@#$]{6,}$/;

  let validationSchema = YUP.object({
    email: YUP.string().required("Email is required"),
    password: YUP.string()
      .matches(regExPassword, "Passwoed start with Uppercase")
      .required("Password is required"),
  });

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLodding, setisLodding] = useState(false);

  async function loginSubmit(values) {
    setisLodding(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setisLodding(false);
        seterror(err.response.data.message);
      });

    if (data.message === "success") {
      setisLodding(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setUserData(data.user);
      navigate("/");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className=" fix-height py-5">
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <h2 className=" fw-bold text-main text-center mb-5">Login Now</h2>
        <form
          onSubmit={formik.handleSubmit}
          className={`${style.loginForm} w-50 mx-auto`}
        >
          <label htmlFor="email" className="fw-bold">
            Email :
          </label>
          <input
            id="email"
            type="email"
            value={formik.values.email}
            name="email"
            className="form-control mb-3 border-3 mt-1 "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password" className="fw-bold">
            Password :
          </label>
          <input
            id="password"
            type="password"
            value={formik.values.password}
            name="password"
            className="form-control mb-3 border-3 mt-1"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          {isLodding ? (
            <button type="button" className="btn bg-main text-white mt-2">
              <RotatingLines
                strokeColor="white"
                strokeWidth="4"
                animationDuration="1"
                width="25"
                visible={true}
              />
            </button>
          ) : (
            <>
              <div
                className={`${style.btns} d-flex justify-content-between gap-3`}
              >
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn px-4 bg-main text-white mt-2 fw-bold"
                >
                  Login
                </button>
                <div className="d-flex justify-content-center align-items-center">
                  <p className="m-0 ">Create an account?</p>{" "}
                  <Link className="btn fs-6 text-main fw-bold" to={"/register"}>
                    Register
                  </Link>
                </div>
                {/* <div className="d-flex justify-content-center align-items-center">
                  <p className="m-0 ">Forgot your password?</p>{" "}
                  <Link className="btn fs-6 text-main fw-bold" to={"/register"}>
                    Forgot Password
                  </Link>
                </div> */}
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}
