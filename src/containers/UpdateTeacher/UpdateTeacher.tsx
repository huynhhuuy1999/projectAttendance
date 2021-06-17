import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  Banner,
  Button,
  Input,
  Modal,
  NotiSuccess,
} from "../../components/common";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import * as Yup from "yup";
import "./UpdateTeacher.scss";
import {
  doAddTeacher,
  doGetOneTeacher,
  doUpdateTeacher,
} from "../../redux/action";
import { Color, ROLE } from "../../constants";
import { HiCheckCircle } from "react-icons/hi";

export const UpdateTeacher = () => {
  const { idTeacher } = useParams<{ idTeacher: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isShowModal, setIsShowModal] = useState(false);
  const infoTeacher = useSelector(
    (state: RootState) => state.teacher.oneTeacher
  );
  const [changePass, setChangePass] = useState(false);

  const validationSchema = Yup.object({
    mssv: Yup.string().required("Vui lòng nhập mã giáo viên"),
    username: Yup.string().required("Vui lòng nhập username"),
    fullname: Yup.string().required("Vui lòng nhập họ và tên"),
    birthday: Yup.string().required("Vui lòng chọn ngày sinh"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại"),
    email: Yup.string().required("Vui lòng nhập email"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });
  const formik = useFormik({
    initialValues: {
      mssv: "",
      username: "",
      fullname: "",
      birthday: "",
      phone: "",
      email: "",
      address: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values) => {
      if (idTeacher !== undefined) {
        dispatch(
          doUpdateTeacher({
            id: values.mssv,
            username: values.username,
            fullName: values.fullname,
            birthday: values.birthday,
            phone: values.phone,
            email: values.email,
            address: values.address,
            password: values.password,
            // roles: [{ id: 4, name: "ROLE_STUDENT" }],
          })
        ).then(() => setIsShowModal(true));
      } else {
        dispatch(
          doAddTeacher({
            id: values.mssv,
            username: values.username,
            fullName: values.fullname,
            birthday: values.birthday,
            phone: values.phone,
            email: values.email,
            address: values.address,
            password: values.password,
            roles: [{ id: ROLE.TEACHER }],
          })
        ).then(() => setIsShowModal(true));
      }
    },
  });

  useEffect(() => {
    if (idTeacher) dispatch(doGetOneTeacher(idTeacher));
    else {
      setChangePass(true);
    }
  }, []);
  useEffect(() => {
    if (infoTeacher && idTeacher) {
      formik.setFieldValue("mssv", infoTeacher.id);
      formik.setFieldValue("username", infoTeacher.username);
      formik.setFieldValue("fullname", infoTeacher.fullName);
      formik.setFieldValue("birthday", infoTeacher.birthday);
      formik.setFieldValue("phone", infoTeacher.phone);
      formik.setFieldValue("email", infoTeacher.email);
      formik.setFieldValue("address", infoTeacher.address);
    }
  }, [infoTeacher]);

  return (
    <div className="update-teacher">
      <Banner
        title={idTeacher ? "Cập nhật thông tin giáo viên" : "Thêm giáo viên"}
      />
      <form className="formTeacher" onSubmit={formik.handleSubmit}>
        <div className="formTeacher__cover">
          <div className="formTeacher__item">
            <Input
              isLabel={true}
              label="Mã số giáo viên:"
              placeholder="Mã giáo viên"
              onChange={formik.handleChange}
              value={formik.values.mssv}
              name="mssv"
              id="mssv"
              HTMLFor="mssv"
              type="text"
              classNameLabel="formTeacher__label"
              error={formik.errors.mssv}
            />
          </div>
          <div className="formTeacher__item">
            <Input
              isLabel={true}
              label="Họ tên:"
              placeholder="Họ tên"
              onChange={formik.handleChange}
              value={formik.values.fullname}
              name="fullname"
              id="fullname"
              HTMLFor="fullname"
              type="text"
              classNameLabel="formTeacher__label"
              error={formik.errors.fullname}
            />
          </div>
          <div className="formTeacher__item">
            <Input
              isLabel={true}
              label="Username"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
              name="username"
              id="username"
              HTMLFor="username"
              type="text"
              classNameLabel="formTeacher__label"
              error={formik.errors.username}
            />
          </div>
          <div className="formTeacher__item">
            <Input
              isLabel={true}
              label="Mật khẩu"
              placeholder="Mật khẩu"
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
              HTMLFor="password"
              type="password"
              classNameLabel="formTeacher__label"
              error={formik.errors.password}
              disable={changePass ? false : true}
            />
          </div>
          <div className="formTeacher__item">
            <Input
              isLabel={true}
              label="Email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              HTMLFor="email"
              type="email"
              classNameLabel="formTeacher__label"
              error={formik.errors.email}
            />
          </div>
          <div className="formTeacher__item">
            <Input
              isLabel={true}
              label="Điện thoại"
              placeholder="Nhập số điện thoại"
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              id="phone"
              HTMLFor="phone"
              type="text"
              classNameLabel="formTeacher__label"
              error={formik.errors.phone}
            />
          </div>
          <div className="formTeacher__item">
            <Input
              isLabel={true}
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              onChange={formik.handleChange}
              value={formik.values.address}
              name="address"
              id="address"
              HTMLFor="address"
              type="text"
              classNameLabel="formTeacher__label"
              error={formik.errors.address}
            />
          </div>
          <div className="formTeacher__item">
            <Input
              isLabel={true}
              label="Ngày sinh"
              onChange={formik.handleChange}
              value={formik.values.birthday}
              name="birthday"
              id="birthday"
              HTMLFor="birthday"
              type="date"
              classNameInput="formTeacher__item--date"
              classNameLabel="formTeacher__label"
              error={formik.errors.birthday}
            />
          </div>
          {idTeacher !== undefined ? (
            <div className="formTeacher__item formTeacher__checkbox">
              <input
                id="changepass"
                type="checkbox"
                onChange={() => {
                  setChangePass(!changePass);
                  console.log(changePass);
                }}
              />
              <label
                htmlFor="changepass"
                className="formTeacher__label-checkbox"
              >
                Cập nhật mật khẩu
              </label>
            </div>
          ) : null}
        </div>
        <div className="update-teacher__group-btn">
          <Button color={Color.Blue} className="formTeacher__btn" type="submit">
            {idTeacher ? "Cập nhật" : "Thêm"}
          </Button>
        </div>
      </form>
      <NotiSuccess
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        message={
          idTeacher ? "Cập nhật thành công" : "Thêm giảng viên thành công"
        }
        onClick={() => {
          setIsShowModal(false);
          history.push("/listteacher");
        }}
      />
    </div>
  );
};
