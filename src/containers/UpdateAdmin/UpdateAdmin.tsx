import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Banner, Button, Input, NotiSuccess } from "../../components/common";
import { Color, ROLE } from "../../constants";
import { regNumber } from "../../helper";
import { doUpdateUser } from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import "./UpdateAdmin.scss";

export const UpdateAdmin = () => {
  const infoPerson = useSelector((state: RootState) => state.user.currentUser);
  const [role, setRole] = useState(0);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const validationSchema = Yup.object({
    id: Yup.string().required("Vui lòng nhập id"),
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
  });
  useEffect(() => {
    if (infoPerson.roles) {
      setRole(infoPerson.roles[0].id);
    }
  }, [infoPerson]);
  const formik = useFormik({
    initialValues: {
      id: "",
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
      const {
        id,
        username,
        fullname,
        address,
        birthday,
        email,
        password,
        phone,
      } = values;
      dispatch(
        doUpdateUser({
          id: id,
          username,
          fullName: fullname,
          address,
          birthday,
          email,
          password,
          phone,
        })
      ).then(() => {
        setShowModal(true);
      });
    },
  });
  useEffect(() => {
    if (infoPerson) {
      formik.setFieldValue("id", infoPerson.id);
      formik.setFieldValue("username", infoPerson.username);
      formik.setFieldValue("fullname", infoPerson.fullName);
      formik.setFieldValue("birthday", infoPerson.birthday);
      formik.setFieldValue("phone", infoPerson.phone);
      formik.setFieldValue("email", infoPerson.email);
      formik.setFieldValue("address", infoPerson.address);
    }
  }, [infoPerson]);
  return (
    <div className="updateAdmin">
      <Banner title={"Xem thông tin cá nhân"} />
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form__cover">
          <div className="form__item">
            <Input
              isLabel={true}
              label="Mã số id:"
              placeholder="Mã số id"
              onChange={formik.handleChange}
              value={formik.values.id}
              name="id"
              id="id"
              HTMLFor="id"
              type="text"
              classNameLabel="form__label"
              error={formik.errors.id}
              disable={role === ROLE.ADMIN ? false : true}
            />
          </div>
          <div className="form__item">
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
              classNameLabel="form__label"
              error={formik.errors.fullname}
              disable={role === ROLE.ADMIN ? false : true}
            />
          </div>
          <div className="form__item">
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
              classNameLabel="form__label"
              error={formik.errors.username}
              disable={role === ROLE.ADMIN ? false : true}
            />
          </div>
          <div className="form__item">
            <Input
              isLabel={true}
              label="Email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              HTMLFor="email"
              classNameLabel="form__label"
              error={formik.errors.email}
              disable={role === ROLE.ADMIN ? false : true}
            />
          </div>
          <div className="form__item">
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
              classNameLabel="form__label"
              error={formik.errors.phone}
              disable={role === ROLE.ADMIN ? false : true}
            />
          </div>
          <div className="form__item">
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
              classNameLabel="form__label"
              error={formik.errors.address}
              disable={role === ROLE.ADMIN ? false : true}
            />
          </div>
          <div className="form__item">
            <Input
              isLabel={true}
              label="Ngày sinh"
              onChange={formik.handleChange}
              value={formik.values.birthday}
              name="birthday"
              id="birthday"
              HTMLFor="birthday"
              type="date"
              classNameInput="form__item--date"
              classNameLabel="form__label"
              error={formik.errors.birthday}
              disable={role === ROLE.ADMIN ? false : true}
            />
          </div>
        </div>
        {role === ROLE.ADMIN ? (
          <div className="form__group-btn">
            <Button color={Color.Blue} className="form__btn" type="submit">
              Cập nhật
            </Button>
          </div>
        ) : null}
      </form>
      <NotiSuccess
        isShow={showModal}
        setIsShow={setShowModal}
        message="Cập nhật thành công"
        onClick={() => setShowModal(false)}
      />
    </div>
  );
};
