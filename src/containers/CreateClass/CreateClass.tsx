import { useFormik, useFormikContext } from "formik";
import React from "react";
import { Banner, Button, Dropdown, Input } from "../../components/common";
import "./CreateClass.scss";

export const CreateClass = () => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {},
  });
  const listCourse = [
    { label: "PHP", value: 1 },
    { label: "Android", value: 2 },
  ];
  const listTeacher = [
    { label: "Nguyễn Thị Kim Liên", value: 1 },
    { label: "Hồ Ngọc Hà", value: 2 },
  ];
  const listRoom = [
    { label: "B.5.02", value: 1 },
    { label: "A.20", value: 2 },
  ];
  const listYear = [
    { label: "2019-2020", value: 1 },
    { label: "2020-2021", value: 2 },
  ];
  return (
    <div className="createclass">
      <Banner title="Tạo lớp học" />
      <form onSubmit={formik.handleSubmit} className="createclass__form">
        <div className="createclass__group-form">
          <Input
            isLabel={true}
            label="Mã lớp học"
            type="text"
            placeholder="Nhập mã lớp học"
            classNameInput="createclass__input"
            classNameLabel="createclass__label"
          />
          <Input
            isLabel={true}
            label="Tên lớp học"
            type="text"
            placeholder="Nhập tên lớp học"
            classNameInput="createclass__input"
            classNameLabel="createclass__label"
          />
          <div className="createclass__box-input">
            <span className="margin-bottom">Tên khóa học</span>
            <Dropdown
              data={listCourse}
              className="createclass__dropdown createclass__dropdown-course"
              onChange={(value: any) => console.log(value)}
            />
          </div>
          <div className="createclass__box-input">
            <span className="margin-bottom">Tên giảng viên</span>
            <Dropdown
              data={listTeacher}
              className="createclass__dropdown createclass__dropdown-teacher"
              onChange={(value: any) => console.log(value)}
            />
          </div>
          <div className="createclass__box-input">
            <span className="margin-bottom">Phòng học</span>
            <Dropdown
              data={listRoom}
              className="createclass__dropdown createclass__dropdown-room"
              onChange={(value: any) => console.log(value)}
            />
          </div>

          <Input
            isLabel={true}
            label="Sỉ số"
            type="text"
            placeholder="Nhập sĩ số"
            classNameInput="createclass__input"
            classNameLabel="createclass__label"
          />
          <div className="createclass__box-input">
            <span className="margin-bottom">Năm</span>
            <Dropdown
              data={listYear}
              className="createclass__dropdown createclass__dropdown-year"
              onChange={(value: any) => console.log(value)}
            />
          </div>
        </div>
        <div className="createclass__group-btn">
          <Button isSecondaryBtn className="createclass__btn">
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
};
