import { useFormik } from "formik";
import React from "react";
import { Banner, Button, Input } from "../../components/common";
import "./UpdateStudent.scss";

export const UpdateStudent = () => {
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
    onSubmit: (values) => {},
  });
  return (
    <div className="update-user">
      <Banner title="Cập nhật thông tin sinh viên" />
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form__item">
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
            classNameLabel="form__label"
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
          />
        </div>
        <div className="form__item">
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
            classNameLabel="form__label"
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
            type="email"
            classNameLabel="form__label"
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
          />
        </div>
        <Button isSecondaryBtn={true} className="form__btn" type="submit">
          Cập nhật
        </Button>
      </form>
    </div>
  );
};
