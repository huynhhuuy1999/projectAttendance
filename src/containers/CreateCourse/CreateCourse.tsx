import { unwrapResult } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import React, { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { useHistory } from "react-router";
import {
  Banner,
  Button,
  Input,
  NotiFail,
  NotiSuccess,
} from "../../components/common";
import { Color } from "../../constants";
import { doAddCourse } from "../../redux/action";
import { useAppDispatch } from "../../redux/store";
import "./CreateCourse.scss";

export const CreateCourse = () => {
  const [errorId, setErrorId] = useState("");
  const [errorName, setErrorName] = useState("");
  const dispatch = useAppDispatch();
  const [noti, setNoti] = useState(false);
  const [isShowModalFail, setIsShowModalFail] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      if (!values.name) {
        setErrorName("Vui lòng nhập tên khóa học");
        return;
      }
      if (!values.id) {
        setErrorId("Vui lòng nhập id khóa học");
        return;
      }
      dispatch(
        doAddCourse({
          id: values.id,
          name: values.name,
        })
      )
        .then(unwrapResult)
        .then(() => setIsShowModal(true))
        .catch((err) => setIsShowModalFail(true));
    },
  });

  return (
    <div className="createcourse">
      <Banner title="Tạo khóa học" />
      <form onSubmit={formik.handleSubmit} className="createcourse__form">
        <Input
          name="id"
          isLabel={true}
          label="Mã khóa học"
          type="text"
          placeholder="Nhập mã khóa học"
          classNameInput="createcourse__input"
          classNameLabel="createcourse__label"
          value={formik.values.id}
          onChange={formik.handleChange}
          error={errorId}
        />
        <Input
          name="name"
          isLabel={true}
          label="Tên khóa học"
          type="text"
          placeholder="Nhập tên khóa học"
          classNameInput="createcourse__input"
          classNameLabel="createcourse__label"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={errorName}
        />
        <Button color={Color.Blue} type="submit" className="createcourse__btn">
          Thêm
        </Button>
        <NotiSuccess
          isShow={isShowModal}
          setIsShow={setIsShowModal}
          message="Thêm khóa học thành công"
          onClick={() => {
            setIsShowModal(false);
            history.push("/listcourses");
          }}
        />
        <NotiFail
          isShow={isShowModalFail}
          setIsShow={setIsShowModalFail}
          message="Đã tồn tại mã khóa học"
          onClick={() => setIsShowModalFail(false)}
        />
      </form>
    </div>
  );
};
