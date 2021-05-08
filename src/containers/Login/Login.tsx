import { useFormik } from "formik";
import "./Login.scss";
import { ImageLogin } from "../../constants/image";
// import { useDispatch } from "react-redux";
// import { doLogin } from "../../redux/slice";
import { Button, Input } from "../../components/common";
// import { useHistory } from "react-router";
import axios from "axios";
export const Login = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      // alert(values.username);
      // dispatch(
      //   doLogin({
      //     username: values.username,
      //     password: values.password,
      //   })
      // ).then(res=>{
      //   setCookie(1, action.payload.token, "TOKEN");
      // });

      // setTimeout(() => {
      //   history.push("/liststudent");
      // }, 1000);
      axios
        .post("http://localhost:8080/api/auth", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          // setCookie(1, res.data.token, "TOKEN");
          window.localStorage.setItem("TOKEN", res.data.token);
          window.location.replace("/liststudent");
        })
        .then(() => {
          // history.push("/liststudent");
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>

              <i>Quên mật khẩu</i>
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
