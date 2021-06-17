import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Banner,
  Button,
  Dropdown,
  Input,
  NotiSuccess,
} from "../../components/common";
import { Color } from "../../constants";
import {
  doAddClass,
  doGetListCourse,
  doGetListTeacher,
  doGetOneClass,
  doUpdateClass,
} from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import * as Yup from "yup";
import "./CreateClass.scss";
import { HiCheckCircle } from "react-icons/hi";
import { useHistory, useParams } from "react-router";
import moment from "moment";

export const CreateClass = () => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const history = useHistory();
  const { idClass } = useParams<{ idClass: string }>();
  const listCourse = useSelector((state: RootState) => state.course.listCourse);
  const listTeacher = useSelector(
    (state: RootState) => state.teacher.listTeacher
  );
  const oneClass = useSelector((state: RootState) => state.clazz.oneClass);
  const newListTeacher = listTeacher.map((item) => {
    return {
      id: item.id,
      name: item.fullName,
    };
  });
  const validationSchema = Yup.object({
    idClazz: Yup.string().required("Vui lòng nhập mã lớp học"),
    startdate: Yup.string().required("Vui lòng chọn ngày bắt đầu"),
    enddate: Yup.string().required("Vui lòng chọn ngày kết thúc"),
    numberStudent: Yup.string().required("Vui lòng nhập sỉ số lớp học"),
    idCourse: Yup.string().required("Vui lòng chọn khóa học"),
    idTeacher: Yup.string().required("Vui lòng chọn giáo viên"),
  });
  const formik = useFormik({
    initialValues: {
      idClazz: "qsdjhkj",
      idCourse: "",
      idTeacher: "",
      startdate: "",
      enddate: "",
      numberStudent: 0,
      idRoom: 0,
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, { setErrors }) => {
      const {
        idClazz,
        idTeacher,
        numberStudent,
        startdate,
        enddate,
        idCourse,
      } = values;
      if (moment(startdate).isAfter(enddate)) {
        setErrors({
          startdate: "Ngày bắt đầu không được lớn hơn ngày kết thúc",
        });
        return;
      }

      if (idClass !== undefined) {
        dispatch(
          doUpdateClass({
            id: idClazz,
            course: { id: idCourse },
            teacher: { id: idTeacher },
            startDate: startdate,
            endDate: enddate,
            numberStudent: numberStudent,
          })
        ).then(() => setIsShowModal(true));
      } else {
        dispatch(
          doAddClass({
            id: idClazz,
            course: { id: idCourse },
            teacher: { id: idTeacher },
            startDate: startdate,
            endDate: enddate,
            numberStudent: numberStudent,
          })
        ).then(() => setIsShowModal(true));
      }
    },
  });
  const listRoom = [
    { name: "B.5.02", id: 1 },
    { name: "A.20", id: 2 },
  ];

  useEffect(() => {
    dispatch(doGetListCourse());
    dispatch(doGetListTeacher());
    if (idClass !== undefined) {
      dispatch(doGetOneClass(idClass));
    }
  }, []);
  useEffect(() => {
    if (oneClass && idClass) {
      formik.setFieldValue("idClazz", oneClass.id);
      formik.setFieldValue("idCourse", oneClass.course?.id);
      formik.setFieldValue("idTeacher", oneClass.teacher?.id);
      formik.setFieldValue("startdate", oneClass.startDate);
      formik.setFieldValue("enddate", oneClass.endDate);
      formik.setFieldValue("numberStudent", oneClass.numberStudent);
      // formik.setFieldValue("idRoom", infoStudent.address);
    }
  }, [oneClass]);
  return (
    <div className="createclass">
      <Banner title="Tạo lớp học" />
      <form onSubmit={formik.handleSubmit} className="createclass__form">
        <div className="createclass__group-form">
          <Input
            disable={idClass ? true : false}
            isLabel={true}
            name="idClazz"
            value={formik.values.idClazz}
            id="idClazz"
            label="Mã lớp học"
            type="text"
            placeholder="Nhập mã lớp học"
            classNameInput="createclass__input"
            classNameLabel="createclass__label"
            error={formik.errors.idClazz}
            onChange={formik.handleChange}
          />
          <div className="createclass__box-input">
            <span className="margin-bottom bold">Tên khóa học</span>
            <Dropdown
              data={listCourse}
              placeholder="Chọn khóa học"
              className="createclass__dropdown createclass__dropdown-course"
              onChange={(value: any) =>
                formik.setFieldValue("idCourse", value.id)
              }
              value={idClass ? oneClass?.course?.id : undefined}
              error={formik.errors.idCourse}
            />
          </div>
          <div className="createclass__box-input">
            <span className="margin-bottom bold">Tên giảng viên</span>
            <Dropdown
              placeholder="Chọn giáo viên"
              data={newListTeacher}
              className="createclass__dropdown createclass__dropdown-teacher"
              onChange={(value: any) =>
                formik.setFieldValue("idTeacher", value.id)
              }
              error={formik.errors.idTeacher}
              value={idClass ? oneClass?.teacher?.id : undefined}
            />
          </div>
          <div className="createclass__box-input">
            <span className="margin-bottom bold">Phòng học</span>
            <Dropdown
              placeholder="Chọn phòng học"
              data={listRoom}
              className="createclass__dropdown createclass__dropdown-room"
              onChange={(value: any) => console.log(value)}
            />
          </div>
          <Input
            isLabel={true}
            value={formik.values.numberStudent}
            label="Sỉ số"
            name="numberStudent"
            id="numberStudent"
            type="text"
            placeholder="Nhập sĩ số"
            classNameInput="createclass__input"
            classNameLabel="createclass__label"
            error={formik.errors.numberStudent}
            onChange={formik.handleChange}
          />
          <div className="createclass__box-input">
            <Input
              isLabel={true}
              label="Ngày bắt đầu"
              onChange={formik.handleChange}
              value={formik.values.startdate}
              name="startdate"
              id="startdate"
              HTMLFor="startdate"
              type="date"
              classNameInput="createclass__input"
              classNameLabel="createclass__label"
              error={formik.errors.startdate}
            />
          </div>
          <div className="createclass__box-input">
            <Input
              isLabel={true}
              label="Ngày kết thúc"
              onChange={formik.handleChange}
              value={formik.values.enddate}
              name="enddate"
              id="enddate"
              HTMLFor="enddate"
              type="date"
              classNameInput="createclass__input"
              classNameLabel="createclass__label"
              error={formik.errors.enddate}
            />
          </div>
        </div>
        <div className="createclass__group-btn">
          <Button color={Color.Blue}>
            {idClass ? "Cập nhật" : "Thêm lớp học"}
          </Button>
        </div>
      </form>
      <NotiSuccess
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        message={idClass ? "Cập nhật thành công" : "Thêm lớp học thành công"}
        onClick={() => {
          setIsShowModal(false);
          history.push("/listclass");
        }}
      />
    </div>
  );
};
