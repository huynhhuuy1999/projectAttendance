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
import "./CreateParent.scss";
import { Color, ROLE } from "../../constants";
import { HiCheckCircle } from "react-icons/hi";
import { regNumber } from "../../helper";

export const CreateParent = () => {
  const { idParent } = useParams<{ idParent: string }>();
  const dispatch = useAppDispatch();
  const infoParent = useSelector(
    (state: RootState) => state.student.oneStudent
  );
  const [changePass, setChangePass] = useState(false);
  const history = useHistory();
  const [isShowModal, setIsShowModal] = useState(false);

  const validationSchema = Yup.object({
    mssv: Yup.string().required("Vui lòng nhập mã phụ huynh"),
    username: Yup.string().required("Vui lòng nhập username"),
    fullname: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
    phone: Yup.string().matches(regNumber, "Số điện thoại không hợp lệ"),
    idStudent: Yup.string().required("Vui lòng nhập mssv"),
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
      idStudent: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values) => {
      if (idParent !== undefined) {
        // check changepass to call api
        if (changePass) {
        } else {
        }

        // dispatch(
        //   doUpdateStudent({
        //     id: values.mssv,
        //     username: values.username,
        //     fullName: values.fullname,
        //     birthday: values.birthday,
        //     phone: values.phone,
        //     email: values.email,
        //     address: values.address,
        //     password: values.password,
        //     // roles: [{ id: 4, name: "ROLE_STUDENT" }],
        //   })
        // ).then(() => setIsShowModal(true));
      } else {
        // dispatch(
        //   doAddStudent({
        //     id: values.mssv,
        //     username: values.username,
        //     fullName: values.fullname,
        //     birthday: values.birthday,
        //     phone: values.phone,
        //     email: values.email,
        //     address: values.address,
        //     password: values.password,
        //     roles: [{ id: ROLE.STUDENT }],
        //   })
        // ).then(() => setIsShowModal(true));
      }
    },
  });

  useEffect(() => {
    // if (idStudent) {
    //   dispatch(doGetOneStudent(idStudent));
    // } else {
    //   setChangePass(true);
    // }
  }, []);
  //   useEffect(() => {
  //     if (infoStudent && idStudent) {
  //       formik.setFieldValue("mssv", infoStudent.id);
  //       formik.setFieldValue("username", infoStudent.username);
  //       formik.setFieldValue("fullname", infoStudent.fullName);
  //       formik.setFieldValue("birthday", infoStudent.birthday);
  //       formik.setFieldValue("phone", infoStudent.phone);
  //       formik.setFieldValue("email", infoStudent.email);
  //       formik.setFieldValue("address", infoStudent.address);
  //     }
  //   }, [infoStudent]);

  return (
    <div className="update-user">
      <Banner
        title={idParent ? "Cập nhật thông tin phụ huynh" : "Thêm phụ huynh"}
      />
      <form className="formParent" onSubmit={formik.handleSubmit}>
        <div className="formParent__cover">
          <div className="formParent__item">
            <Input
              isLabel={true}
              label="Mã số phụ huynh:"
              placeholder="Mã số phụ huynh"
              onChange={formik.handleChange}
              value={formik.values.mssv}
              name="mssv"
              id="mssv"
              HTMLFor="mssv"
              type="text"
              classNameLabel="formParent__label"
              error={formik.errors.mssv}
            />
          </div>
          <div className="formParent__item">
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
              classNameLabel="formParent__label"
              error={formik.errors.fullname}
            />
          </div>
          <div className="formParent__item">
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
              classNameLabel="formParent__label"
              error={formik.errors.username}
            />
          </div>
          <div className="formParent__item">
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
              classNameLabel="formParent__label"
              error={formik.errors.password}
              disable={changePass ? false : true}
            />
          </div>
          <div className="formParent__item">
            <Input
              isLabel={true}
              label="MSSV"
              placeholder="Nhập mã số sinh viên"
              onChange={formik.handleChange}
              value={formik.values.idStudent}
              name="idStudent"
              id="idStudent"
              HTMLFor="idStudent"
              type="text"
              classNameLabel="formParent__label"
              error={formik.errors.idStudent}
            />
          </div>
          <div className="formParent__item">
            <Input
              isLabel={true}
              label="Email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              HTMLFor="email"
              classNameLabel="formParent__label"
              error={formik.errors.email}
            />
          </div>
          <div className="formParent__item">
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
              classNameLabel="formParent__label"
              error={formik.errors.phone}
            />
          </div>
          <div className="formParent__item">
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
              classNameLabel="formParent__label"
              error={formik.errors.address}
            />
          </div>
          <div className="formParent__item">
            <Input
              isLabel={true}
              label="Ngày sinh"
              onChange={formik.handleChange}
              value={formik.values.birthday}
              name="birthday"
              id="birthday"
              HTMLFor="birthday"
              type="date"
              classNameInput="formParent__item--date"
              classNameLabel="formParent__label"
              error={formik.errors.birthday}
            />
          </div>

          {idParent !== undefined ? (
            <div className="formParent__item formParent__checkbox">
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
                className="formParent__label-checkbox"
              >
                Cập nhật mật khẩu
              </label>
            </div>
          ) : null}
        </div>
        <div className="update-user__group-btn">
          <Button color={Color.Blue} className="formParent__btn" type="submit">
            {idParent ? "Cập nhật" : "Thêm"}
          </Button>
        </div>
      </form>
      <NotiSuccess
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        message={idParent ? "Cập nhật thành công" : "Thêm phụ huynh thành công"}
        onClick={() => {
          setIsShowModal(false);
          history.push("/listparent");
        }}
      />
    </div>
  );
};
