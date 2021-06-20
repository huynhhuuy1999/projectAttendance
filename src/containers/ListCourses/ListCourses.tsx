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

export const ListCourses = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const listCourse = useSelector((state: RootState) => state.course.listCourse);
  const [role, setRole] = useState(0);
  const history = useHistory();
  const [reload, setReload] = useState(false);
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [showModalAddExcel, setShowModalAddExcel] = useState(false);
  const [isShowModalOption, setIsShowModalOption] = useState(false);
  const [idCourse, setIdCourse] = useState("");
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  // const listYear = [
  //   { label: "2019-2020", value: 1 },
  //   { label: "2020-2021", value: 2 },
  // ];
  const handleDeleteCourse = (id: string) => {
    dispatch(doDeleteCourse({ id: id })).then(() => {
      setIsShowModalSuccess(true);
      setReload(!reload);
    });
  };

  const handleEdit = (id: number, name: string) => {
    setReload(!reload);
    dispatch(doUpdateCourse({ id: id, name: name }));
    setIsShowModal(true);
  };
  const handleAddExcelCourse = (e: any) => {
    const formData = new FormData();
    // const token = localStorage.getItem("TOKEN");
    formData.append("file", e.target.files[0], e.target.files[0].name);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // axios
    //   .post("http://localhost:8080/api/excel/courses", formData, config)
    //   .then(() => {
    //     console.log("ok");
    //   })
    //   .catch((err) => console.log(err));
    dispatch(doAddCourseExcel(formData)).then(() => {
      setShowModalAddExcel(true);
      setReload(!reload);
    });
  };

  useEffect(() => {
    if (!showModalAddExcel) setReload(!reload);
  }, [showModalAddExcel]);

  useEffect(() => {
    dispatch(doGetListCourse());
  }, [reload]);
  useEffect(() => {
    if (currentUser.roles) setRole(currentUser.roles[0].id);
  }, [currentUser.roles]);
  return (
    <div className="listcourses">
      <Banner title="Danh sách khóa học" />
      <div className="listcourses__header">
        <Search placeholder="Nhập khóa học" className="listcourses__search" />
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
        {listCourse.map((item, index: number) => {
          return (
            <div className="listcourses__item">
              <CardCourses
                role={role}
                idCourse={item.id}
                nameCourse={item.name}
                numberClass={3}
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
