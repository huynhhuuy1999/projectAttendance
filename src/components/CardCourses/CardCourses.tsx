import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { EditSvg } from "../../constants/image";
import { Button, Input, Modal } from "../common";
import * as Yup from "yup";
import "./CardCourses.scss";
import { Color, ROLE } from "../../constants";
import { useHistory } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";

export const CardCourses: React.FC<ICardCourses> = ({
  idCourse,
  nameCourse,
  numberClass,
  handleEdit,
  showModal,
  role,
}) => {
  const history = useHistory();
  const validationSchema = Yup.object({
    id: Yup.string().required("Vui lòng nhập mã khóa học"),
    name: Yup.string().required("Vui lòng nhập tên khóa học"),
  });

  const [isShowModal, setIsShowModal] = useState(false);
  const formik = useFormik({
    initialValues: {
      id: idCourse,
      name: nameCourse,
    },
    validationSchema,
    onSubmit: (values) => {
      setIsShowModal(false);
      handleEdit(values.id, values.name);
    },
  });
  useEffect(() => {
    if (isShowModal) {
      formik.setFieldValue("id", idCourse);
      formik.setFieldValue("name", nameCourse);
    }
  }, [isShowModal]);
  return (
    <div className="card-courses">
      {role === ROLE.ADMIN ? (
        <>
          <img
            src={EditSvg}
            alt=""
            className="card-courses__icon"
            onClick={() => {
              setIsShowModal(true);
            }}
          />
          <AiTwotoneDelete
            color="#dd1a35"
            size={20}
            className="card-courses__icon-trash"
            onClick={() => {
              if (showModal) {
                showModal(idCourse);
              }
            }}
          />
        </>
      ) : null}

      <div className="card-courses__id card-courses--bold">({idCourse})</div>
      <div className="card-courses__name card-courses--margin-top">
        {nameCourse}
      </div>
      {/* <div className="card-courses__number card-courses--margin-top card-courses--bold">
        Số lớp: {numberClass}
      </div> */}
      <div
        className="card-courses__detail card-courses--margin-top"
        onClick={() => history.push(`/listclass/${idCourse}`)}
      >
        Xem danh sách lớp
      </div>
      <Modal isShow={isShowModal} setIsShow={setIsShowModal}>
        <div className="card-courses__modal-content">
          <span className="bold pink">Cập nhật khóa học</span>
          <span className="margintop">{nameCourse}</span>
          <form onSubmit={formik.handleSubmit} className="card-courses__form">
            <Input
              isLabel={true}
              label="Mã khóa học:"
              placeholder="Mã khóa học"
              onChange={formik.handleChange}
              value={formik.values.id}
              name="id"
              id="id"
              HTMLFor="id"
              type="text"
              classNameLabel="card-courses__modal-label"
              error={formik.errors.id}
              classNameInput="card-courses__modal-input"
              autoComplete="false"
            />
            <Input
              isLabel={true}
              label="Tên khóa học:"
              placeholder="Tên khóa học"
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              HTMLFor="name"
              type="text"
              classNameLabel="card-courses__modal-label"
              error={formik.errors.name}
              classNameInput="card-courses__modal-input"
              autoComplete="false"
            />
            <div className="card-courses__group-btn">
              <Button width={100} color={Color.Blue} type="submit">
                Cập nhật
              </Button>
              <Button
                width={100}
                className="card-courses__btn-cancel"
                color={Color.Yellow}
                marginLeft={20}
                onClick={() => setIsShowModal(false)}
                type="button"
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
