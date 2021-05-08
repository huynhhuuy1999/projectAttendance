import { useFormik } from "formik";
import React from "react";
import { Banner, Button, Input } from "../../components/common";
import "./CreateCourse.scss";

export const CreateCourse = () => {
  // id, name, numberclass, year
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {},
  });
  return (
    <div className="createcourse">
      <Banner title="Tạo khóa học" />
      <form onSubmit={formik.handleSubmit} className="createcourse__form">
        <Input
          isLabel={true}
          label="Mã khóa học"
          type="text"
          placeholder="Nhập mã khóa học"
          classNameInput="createcourse__input"
          classNameLabel="createcourse__label"
        />
        <Input
          isLabel={true}
          label="Tên khóa học"
          type="text"
          placeholder="Nhập tên khóa học"
          classNameInput="createcourse__input"
          classNameLabel="createcourse__label"
        />
        <Button isSecondaryBtn className="createcourse__btn">
          Thêm
        </Button>
      </form>
    </div>
  );
};
