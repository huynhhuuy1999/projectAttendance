import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Banner, Button, Input, NotiSuccess } from "../../components/common";
import {
  doAddStudent,
  doGetOneStudent,
  doUpdateStudent,
} from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import * as Yup from "yup";
import "./UpdateStudent.scss";
import { Color, ROLE } from "../../constants";
import { HiCheckCircle } from "react-icons/hi";
import { regNumber } from "../../helper";

export const UpdateStudent = () => {
  const { idStudent } = useParams<{ idStudent: string }>();
  const dispatch = useAppDispatch();
  const infoStudent = useSelector(
    (state: RootState) => state.student.oneStudent
  );
  const [changePass, setChangePass] = useState(false);
  const history = useHistory();
  const [isShowModal, setIsShowModal] = useState(false);

  const validationSchema = Yup.object({
    mssv: Yup.string().required("Vui lòng nhập mssv"),
    username: Yup.string().required("Vui lòng nhập username"),
    fullname: Yup.string().required("Vui lòng nhập họ và tên"),
    birthday: Yup.string().required("Vui lòng chọn ngày sinh"),
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(regNumber, "Số điện thoại không hợp lệ"),
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
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
      if (idStudent !== undefined) {
        // check changepass to call api
        if (changePass) {
        } else {
        }

        dispatch(
          doUpdateStudent({
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
          doAddStudent({
            id: values.mssv,
            username: values.username,
            fullName: values.fullname,
            birthday: values.birthday,
            phone: values.phone,
            email: values.email,
            address: values.address,
            password: values.password,
            roles: [{ id: ROLE.STUDENT }],
          })
        ).then(() => setIsShowModal(true));
      }
    },
  });

  useEffect(() => {
    if (idStudent) {
      dispatch(doGetOneStudent(idStudent));
    } else {
      setChangePass(true);
    }
  }, []);
  useEffect(() => {
    if (infoStudent && idStudent) {
      formik.setFieldValue("mssv", infoStudent.id);
      formik.setFieldValue("username", infoStudent.username);
      formik.setFieldValue("fullname", infoStudent.fullName);
      formik.setFieldValue("birthday", infoStudent.birthday);
      formik.setFieldValue("phone", infoStudent.phone);
      formik.setFieldValue("email", infoStudent.email);
      formik.setFieldValue("address", infoStudent.address);
    }
  }, [infoStudent]);

  return (
    <div className="update-user">
      <Banner
        title={idStudent ? "Cập nhật thông tin sinh viên" : "Thêm sinh viên"}
      />
      <form className="formStudent" onSubmit={formik.handleSubmit}>
        <div className="formStudent__cover">
          <div className="formStudent__item">
            <Input
              isLabel={true}
              label="Mã số sinh viên:"
              placeholder="MSSV"
              onChange={formik.handleChange}
              value={formik.values.mssv}
              name="mssv"
              id="mssv"
              HTMLFor="mssv"
              type="text"
              classNameLabel="formStudent__label"
              error={formik.errors.mssv}
            />
          </div>
          <div className="formStudent__item">
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
              classNameLabel="formStudent__label"
              error={formik.errors.fullname}
            />
          </div>
          <div className="formStudent__item">
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
              classNameLabel="formStudent__label"
              error={formik.errors.username}
            />
          </div>
          <div className="formStudent__item">
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
              classNameLabel="formStudent__label"
              error={formik.errors.password}
              disable={changePass ? false : true}
            />
          </div>
          <div className="formStudent__item">
            <Input
              isLabel={true}
              label="Email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              HTMLFor="email"
              classNameLabel="formStudent__label"
              error={formik.errors.email}
            />
          </div>
          <div className="formStudent__item">
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
              classNameLabel="formStudent__label"
              error={formik.errors.phone}
            />
          </div>
          <div className="formStudent__item">
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
              classNameLabel="formStudent__label"
              error={formik.errors.address}
            />
          </div>
          <div className="formStudent__item">
            <Input
              isLabel={true}
              label="Ngày sinh"
              onChange={formik.handleChange}
              value={formik.values.birthday}
              name="birthday"
              id="birthday"
              HTMLFor="birthday"
              type="date"
              classNameInput="formStudent__item--date"
              classNameLabel="formStudent__label"
              error={formik.errors.birthday}
            />
          </div>
          {idStudent !== undefined ? (
            <div className="formStudent__item formStudent__checkbox">
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
                className="formStudent__label-checkbox"
              >
                Cập nhật mật khẩu
              </label>
            </div>
          ) : null}
        </div>
        <div className="update-user__group-btn">
          <Button color={Color.Blue} className="formStudent__btn" type="submit">
            {idStudent ? "Cập nhật" : "Thêm"}
          </Button>
        </div>
      </form>
      <NotiSuccess
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        message={
          idStudent ? "Cập nhật thành công" : "Thêm sinh viên thành công"
        }
        onClick={() => {
          setIsShowModal(false);
          history.push("/liststudent");
        }}
      />
    </div>
  );
};
