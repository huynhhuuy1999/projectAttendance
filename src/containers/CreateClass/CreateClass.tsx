import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Banner,
  Button,
  Dropdown,
  Input,
  Modal,
  NotiSuccess,
} from "../../components/common";
import { Color, ROLE } from "../../constants";
import {
  doAddClass,
  doGetCurrentUser,
  doGetListCourse,
  doGetListTeacher,
  doGetOneClass,
  doUpdateClass,
} from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import * as Yup from "yup";
import "./CreateClass.scss";
import { useHistory, useParams } from "react-router";
import moment from "moment";

export const CreateClass = () => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const history = useHistory();
  const [isShowModalAddStudent, setIsShowModalAddStudent] = useState(false);
  const { idClass } = useParams<{ idClass: string }>();
  const [role, setRole] = useState(0);
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
  const user = useSelector((state: RootState) => state.user.currentUser);
  const validationSchema = Yup.object({
    idClazz: Yup.string().required("Vui lòng nhập mã lớp học"),
    startdate: Yup.string().required("Vui lòng chọn ngày bắt đầu"),
    enddate: Yup.string().required("Vui lòng chọn ngày kết thúc"),
    numberStudent: Yup.string().required("Vui lòng nhập sỉ số lớp học"),
    idCourse: Yup.string().required("Vui lòng chọn khóa học"),
    idTeacher: Yup.string().required("Vui lòng chọn giáo viên"),
  });
  const validationSchema2 = Yup.object({
    idClazz: Yup.string().required("Vui lòng nhập mã lớp học"),
  });

  const formik2 = useFormik({
    initialValues: {
      idClazz: "dfd",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, { setErrors }) => {
      const { idClazz } = values;
      if (idClazz === "") {
        setErrors({ idClazz: "Vui lòng nhập mã lớp học" });
      }
      console.log("idClazz", idClazz);
    },
  });
  const formik = useFormik({
    initialValues: {
      idClazz: "",
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
    if (!user) {
      dispatch(doGetCurrentUser());
    }
  }, []);
  useEffect(() => {
    if (user.id) {
      setRole(user.roles[0].id);
    }
  }, [user]);
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
      <Banner title={idClass ? `Cập nhật lớp học ${idClass}` : "Tạo lớp học"} />
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
          {/* <div className="createclass__box-input">
            <span className="margin-bottom bold">Phòng học</span>
            <Dropdown
              placeholder="Chọn phòng học"
              data={listRoom}
              className="createclass__dropdown createclass__dropdown-room"
              onChange={(value: any) => console.log(value)}
            />
          </div> */}
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
          <Button color={Color.Blue} type="submit">
            {idClass ? "Cập nhật" : "Thêm lớp học"}
          </Button>
          {role === ROLE.ADMIN && idClass ? (
            <>
              <Button
                marginLeft={10}
                color={Color.Yellow}
                type="button"
                onClick={() => setIsShowModalAddStudent(true)}
              >
                Thêm sinh viên
              </Button>
              <Button
                marginLeft={10}
                color={Color.Green}
                type="button"
                // onClick={() => setIsShowModalAddStudent(true)}
              >
                Thêm excel
              </Button>
            </>
          ) : null}
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
      <Modal
        isShow={isShowModalAddStudent}
        setIsShow={setIsShowModalAddStudent}
      >
        <div className="createclass__modal-content">
          <span>Thêm sinh viên vào lớp {idClass}</span>

          <form
            onSubmit={formik2.handleSubmit}
            className="createclass__modal-form"
          >
            <Input
              isLabel={true}
              label="Mã sinh viên:"
              placeholder="Mã sinh viên"
              onChange={formik2.handleChange}
              value={formik2.values.idClazz}
              name="idClazz"
              id="idClazz"
              HTMLFor="idClazz"
              type="text"
              classNameLabel="createclass__modal-label"
              error={formik2.errors.idClazz}
              classNameInput="createclass__modal-input"
              autoComplete="false"
            />
            <div className="createclass__modal-btn">
              <Button type="submit" color={Color.Blue}>
                Thêm
              </Button>
              <Button
                type="button"
                color={Color.Yellow}
                onClick={() => setIsShowModalAddStudent(false)}
                marginLeft={10}
              >
                Hủy
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
