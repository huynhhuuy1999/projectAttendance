import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CardCourses } from "../../components";
import {
  Banner,
  Button,
  Search,
  NotiSuccess,
  NotiOption,
  Pagination,
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

export const ListCourses = () => {
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
  const [showModalAddExcel, setShowModalAddExcel] = useState(false);
  const [isShowModalOption, setIsShowModalOption] = useState(false);
  const [idCourse, setIdCourse] = useState("");
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);

  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = listCourseSearch?.slice(
    firstOfIndexCurrentPage,
    endOfIndexCurrentPage
  );

  const handleDeleteCourse = (id: string) => {
    dispatch(doDeleteCourse({ id: id })).then(() => {
      setIsShowModalSuccess(true);
      setReload(!reload);
    });
  };

  const handleEdit = (id: number, name: string) => {
    dispatch(doUpdateCourse({ id: id, name: name })).then(() => {
      setReload(!reload);
    });
    setIsShowModal(true);
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
    if (!showModalAddExcel) setReload(!reload);
  }, [showModalAddExcel]);

  useEffect(() => {
    console.log("ok");
    dispatch(doGetListCourse()).then((res) => console.log(res.payload));
  }, [reload]);
  useEffect(() => {
    if (currentUser.roles) setRole(currentUser.roles[0].id);
  }, [currentUser.roles]);
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
                handleEdit={(id: number, name: string) => handleEdit(id, name)}
                showModal={(idCourse) => {
                  setIsShowModalOption(true);
                  setIdCourse(idCourse);
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
    </div>
  );
};
