import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Input } from "../../components/common";
import { ImageLogin } from "../../constants/image";
import { useAppDispatch } from "../../redux/store";
import "./Login.scss";
export const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post(`${process.env.REACT_APP_URL_API}api/auth`, {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          window.localStorage.setItem("TOKEN", res.data.token);
          window.location.replace("/listcourses");
        })
        .catch((err) => {
          setMessage("Tài khoản hoặc mật khẩu sai");
        });
    },
  });
  return (
    <div className="login">
      <div className="login__grid">
        <div className="login__form">
          <div className="login__background"></div>
          <div className="login__form-main">
            <form onSubmit={formik.handleSubmit} className="form">
              <h3>Đăng nhập</h3>
              <div className="form__item">
                <Input
                  isLabel={true}
                  label="Tên đăng nhập"
                  HTMLFor="username"
                  id="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form__item">
                <Input
                  isLabel={true}
                  label="Mật khẩu"
                  HTMLFor="password"
                  id="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
              {message !== "" ? (
                <span className="login__error">{message}</span>
              ) : null}
              {/* <i onClick={() => history.push("/listAttendance")}>
                Quên mật khẩu
              </i> */}
              <div className="form__group-btn">
                <Button type="Submit" className="login__btn">
                  Đăng nhập
                </Button>
                {/* <Button type="button" className="login__btn">
                  Đăng ký
                </Button> */}
              </div>
            </form>
          </div>
        </div>
        <div className="login__img">
          <img src={ImageLogin} alt="" />
        </div>
      </div>
    </div>
  );
};
