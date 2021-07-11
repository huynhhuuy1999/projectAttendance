import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { CardCourses } from "../../components";
import {
  Banner,
  Button,
  Search,
  NotiSuccess,
  NotiOption,
  Pagination,
  Modal,
  Input,
} from "../../components/common";
import {
  doAddCourseExcel,
  doDeleteCourse,
  doGetListCourse,
  doUpdateCourse,
} from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import "./ListCourses.scss";
import { Color, ROLE } from "../../constants";
import { doSearchListCourse } from "../../redux/slice";
import { useFormik } from "formik";

export const ListCourses = () => {
  const validationSchema = Yup.object({
    id: Yup.string().required("Vui lòng nhập mã khóa học"),
    name: Yup.string().required("Vui lòng nhập tên khóa học"),
  });

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const listCourse = useSelector((state: RootState) => state.course.listCourse);
  const listCourseSearch = useSelector(
    (state: RootState) => state.course.listCourseSearch
  );
  const [postPerPage, setPostPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState(0);
  const history = useHistory();
  const [reload, setReload] = useState(false);
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [nameCourse, setNameCourse] = useState("");
  const [showModalAddExcel, setShowModalAddExcel] = useState(false);
  const [isShowModalOption, setIsShowModalOption] = useState(false);
  const [idCourse, setIdCourse] = useState("");
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalSuccessUpdate, setIsShowModalSuccessUpdate] =
    useState(false);

  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = listCourseSearch?.slice(
    firstOfIndexCurrentPage,
    endOfIndexCurrentPage
  );

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values) => {
      setIsShowModal(false);
      dispatch(doUpdateCourse({ id: values.id, name: values.name }))
        .then(() => {
          setReload(!reload);
          setIsShowModalEdit(false);
        })
        .then((res) => {
          setIsShowModalSuccessUpdate(true);
        });
    },
  });

  const handleDeleteCourse = (id: string) => {
    dispatch(doDeleteCourse({ id: id })).then(() => {
      setIsShowModalSuccess(true);
      setReload(!reload);
    });
  };
  const handleAddExcelCourse = (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    dispatch(doAddCourseExcel(formData)).then(() => {
      setShowModalAddExcel(true);
      setReload(!reload);
    });
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      dispatch(doGetListCourse());
      return;
    } else {
      let newListCourse = listCourse.filter((item) => {
        return (
          String(item.id)?.search(value) !== -1 ||
          String(item.name).search(value) !== -1
        );
      });
      dispatch(doSearchListCourse(newListCourse));
      setCurrentPage(1);
    }
  };

  const changePage = (number: number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    if (currentUser.id) {
      if (currentUser.roles[0].id === ROLE.PARENT) {
        history.push("/schedulestudent");
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (!showModalAddExcel) setReload(!reload);
  }, [showModalAddExcel]);

  useEffect(() => {
    dispatch(doGetListCourse()).then((res) => {});
  }, [reload]);

  useEffect(() => {
    if (currentUser.roles) setRole(currentUser.roles[0].id);
  }, [currentUser.roles]);

  useEffect(() => {
    if (isShowModalEdit) {
      formik.setFieldValue("id", idCourse);
      formik.setFieldValue("name", nameCourse);
    }
  }, [isShowModalEdit]);
  return (
    <div className="listcourses">
      <Banner title="Danh sách khóa học" />
      <div className="listcourses__header">
        <Search
          placeholder="Nhập khóa học"
          className="listcourses__search"
          search={(value) => handleSearch(value)}
        />
        {role === ROLE.ADMIN ? (
          <>
            <Button
              className="listcourses__btn-add"
              color={Color.Yellow}
              onClick={() => {
                history.push("/createcourse");
              }}
            >
              Thêm khóa học
            </Button>
            <label
              htmlFor="course"
              className="listcourses__excel"
              style={{ backgroundColor: Color.Green }}
            >
              Nhập Excel
            </label>
            <input
              type="file"
              name="course"
              id="course"
              style={{ display: "none" }}
              onChange={(e) => handleAddExcelCourse(e)}
            />
          </>
        ) : null}
      </div>

      <div className="listcourses__list">
        {currenPost.map((item, index: number) => {
          return (
            <div className="listcourses__item">
              <CardCourses
                role={role}
                idCourse={item.id}
                nameCourse={item.name}
                // numberClass={3}
                key={index}
                showModal={(idCourse) => {
                  setIsShowModalOption(true);
                  setIdCourse(idCourse);
                }}
                showModalEdit={(idCourse, nameCourse) => {
                  setIsShowModalEdit(true);
                  setIdCourse(idCourse);
                  setNameCourse(nameCourse);
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="list-student__pagination">
        <Pagination
          postPerPage={postPerPage}
          totalPost={listCourseSearch.length}
          changePage={changePage}
          currentPage={currentPage}
        />
      </div>

      <NotiSuccess
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        message="Cập nhật thành công"
        onClick={() => {
          setIsShowModal(false);
        }}
      />
      <NotiSuccess
        message="Thêm danh sách thành công"
        isShow={showModalAddExcel}
        setIsShow={setShowModalAddExcel}
        onClick={() => setShowModalAddExcel(false)}
      />
      <NotiOption
        isShow={isShowModalOption}
        setIsShow={setIsShowModalOption}
        btnLeft="Xóa"
        btnRight="Hủy"
        onClickBtnLeft={() => {
          handleDeleteCourse(idCourse);
          setIsShowModalOption(false);
        }}
        onClickBtnRight={() => setIsShowModalOption(false)}
        message={`Bạn chắc chắn muốn xóa khóa học ${idCourse}?`}
      />
      <NotiSuccess
        isShow={isShowModalSuccess}
        setIsShow={setIsShowModalSuccess}
        message="Xóa khóa học thành công"
        onClick={() => {
          setIsShowModalSuccess(false);
        }}
      />
      <NotiSuccess
        isShow={isShowModalSuccessUpdate}
        setIsShow={setIsShowModalSuccessUpdate}
        message="Cập nhật khóa học thành công"
        onClick={() => {
          setIsShowModalSuccessUpdate(false);
        }}
      />
      <Modal isShow={isShowModalEdit} setIsShow={setIsShowModalEdit}>
        <div className="listcourses__modal-content">
          <span className="bold pink">Cập nhật khóa học</span>
          <span className="margintop">{nameCourse}</span>
          <form onSubmit={formik.handleSubmit} className="listcourses__form">
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
              classNameLabel="listcourses__modal-label"
              error={formik.errors.id}
              classNameInput="listcourses__modal-input"
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
              classNameLabel="listcourses__modal-label"
              error={formik.errors.name}
              classNameInput="listcourses__modal-input"
              autoComplete="false"
            />
            <div className="listcourses__group-btn">
              <Button width={100} color={Color.Blue} type="submit">
                Cập nhật
              </Button>
              <Button
                width={100}
                className="listcourses__btn-cancel"
                color={Color.Yellow}
                marginLeft={20}
                onClick={() => setIsShowModalEdit(false)}
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
