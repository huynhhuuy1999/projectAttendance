import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { TableStudent } from "../../components";
import {
  Banner,
  Button,
  Loader,
  LoaderModal,
  NotiFail,
  NotiOption,
  NotiSuccess,
  NumberRow,
  Pagination,
  Search,
} from "../../components/common";
import { Color, ROLE } from "../../constants";
import {
  doAddExcelUser,
  doAddTimetable,
  doDeleteUser,
  doGetListStudent,
  doGetListStudentByClass,
} from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { doSearchListStudent } from "../../redux/slice";
import { useAppDispatch } from "../../redux/store";
import "./ListStudent.scss";

export const ListStudent = () => {
  const { idClass } = useParams<{ idClass: string }>();
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);
  const [idStudent, setIdStudent] = useState("");
  const [role, setRole] = useState(0);
  const [isShowModalSuccessAddTimetable, setIsShowModalSuccessAddTimetabe] =
    useState(false);
  const [isShowModalAddExcelSuccess, setIsShowModalAddExcelSuccess] =
    useState(false);
  const [isShowModalAddExcelFail, setIsShowModalAddExcelFail] = useState(false);
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [isShowModalFailAddTimetable, setIsShowModalFailAddTimetabe] =
    useState(false);
  const [reload, setReload] = useState(false);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const listStudent = useSelector(
    (state: RootState) => state.student.listStudent
  );
  const listStudentSearch = useSelector(
    (state: RootState) => state.student.listStudentSearch
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = listStudentSearch?.slice(
    firstOfIndexCurrentPage,
    endOfIndexCurrentPage
  );

  const handleDeleteStudent = () => {
    setShowModal(false);
    dispatch(
      doDeleteUser({
        id: idStudent,
      })
    ).then(() => {
      setReload(!reload);
      setIsShowModalSuccess(true);
    });
  };
  const handleAddTimetable = (e: any) => {
    setLoaderModal(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    dispatch(doAddTimetable(formData))
      .then(unwrapResult)
      .then(() => {
        setLoaderModal(false);
      })
      .then(() => setIsShowModalSuccessAddTimetabe(true))
      .catch((err) => {
        setLoaderModal(false);
        setIsShowModalFailAddTimetabe(true);
      });
  };

  const handelAddExcelUser = (e: any) => {
    setLoaderModal(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    dispatch(doAddExcelUser(formData))
      .then(unwrapResult)
      .then(() => {
        setReload(!reload);
        setLoaderModal(false);
      })
      .then(() => setIsShowModalAddExcelSuccess(true))
      .catch((err) => {
        setLoaderModal(false);
        setIsShowModalAddExcelFail(true);
      });
  };

  const changePage = (number: number) => {
    setCurrentPage(number);
  };
  const changeNumber = (number: number) => {
    setPostPerPage(number);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      dispatch(doGetListStudent());
      return;
    } else {
      let newListStudent = listStudent.filter((item) => {
        return (
          item.fullName?.search(value) !== -1 || item.id.search(value) !== -1
        );
      });
      dispatch(doSearchListStudent(newListStudent));
    }
  };

  useEffect(() => {
    setLoading(true);
    console.log("hello");
    if (idClass) {
      dispatch(doGetListStudentByClass(idClass)).then(() => setLoading(false));
    } else dispatch(doGetListStudent()).then((res) => setLoading(false));
  }, [reload]);
  useEffect(() => {
    if (currentUser.roles) {
      setRole(currentUser.roles[0].id);
    }
  }, [currentUser.roles]);

  return (
    <div className="list-student">
      <Banner
        title={
          idClass
            ? `Danh sách sinh viên của lớp ${idClass}`
            : `Danh sách sinh viên`
        }
      />
      <div className="list-student__header">
        <div className="list-student__number-row">
          <NumberRow changeNumber={changeNumber} />
        </div>
        <div className="list-student__search">
          <Search
            placeholder="Nhập họ tên, mã số sinh viên"
            search={(value) => handleSearch(value)}
          />
        </div>
        {role === ROLE.ADMIN ? (
          <>
            {idClass ? null : (
              <Button
                color={Color.Yellow}
                marginLeft={10}
                onClick={() => history.push("/updatestudent")}
              >
                Thêm sinh viên
              </Button>
            )}
            <label
              htmlFor="excelUser"
              className="list-student__addTimeTable"
              style={{ backgroundColor: Color.Green }}
            >
              Thêm Excel
            </label>
            <input
              type="file"
              name="excelUser"
              id="excelUser"
              style={{ display: "none" }}
              onChange={(e) => handelAddExcelUser(e)}
            />

            <label
              htmlFor="timetable"
              className="list-student__addTimeTable"
              style={{ backgroundColor: Color.Brown }}
            >
              Thêm thời khóa biểu
            </label>

            <input
              type="file"
              name="timetable"
              id="timetable"
              style={{ display: "none" }}
              onChange={(e) => handleAddTimetable(e)}
            />
          </>
        ) : (
          <></>
        )}
        {(role === ROLE.ADMIN || role === ROLE.TEACHER) && idClass ? (
          <Button
            color={Color.Red}
            marginLeft={10}
            onClick={() => history.push(`/ListAttendanceClass/${idClass}`)}
          >
            Xem lịch sử điểm danh
          </Button>
        ) : null}
      </div>
      {loading ? (
        <Loader color={Color.Blue} />
      ) : (
        <>
          <div className="list-student__table">
            <TableStudent
              data={currenPost}
              showModal={(id) => {
                setShowModal(true);
                setIdStudent(id);
              }}
              idClass="ACCT3603.L12"
              isAttendance={
                (role === ROLE.ADMIN && idClass) ||
                (role === ROLE.TEACHER && idClass)
                  ? true
                  : false
              }
            />
          </div>
          <div className="list-student__pagination">
            <Pagination
              postPerPage={postPerPage}
              totalPost={listStudentSearch.length}
              changePage={changePage}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
      <LoaderModal color={Color.Blue} isShow={loaderModal} />
      <NotiOption
        isShow={showModal}
        setIsShow={setShowModal}
        btnLeft="Xóa"
        btnRight="Hủy"
        onClickBtnLeft={() => {
          handleDeleteStudent();
        }}
        onClickBtnRight={() => setShowModal(false)}
        message={`Bạn có chắc chắn muốn xóa sinh viên ${idStudent} không?`}
      />

      <NotiSuccess
        isShow={isShowModalSuccess}
        setIsShow={setIsShowModalSuccess}
        message="Xóa sinh viên thành công"
        onClick={() => setIsShowModalSuccess(false)}
      />

      <NotiSuccess
        isShow={isShowModalSuccessAddTimetable}
        setIsShow={setIsShowModalSuccessAddTimetabe}
        message="Thêm thời khóa biểu thành công"
        onClick={() => setIsShowModalSuccessAddTimetabe(false)}
      />
      <NotiFail
        isShow={isShowModalFailAddTimetable}
        setIsShow={setIsShowModalFailAddTimetabe}
        message="Thêm thời khóa biểu thất bại"
        onClick={() => setIsShowModalFailAddTimetabe(false)}
      />
      <NotiFail
        isShow={isShowModalAddExcelFail}
        setIsShow={setIsShowModalAddExcelFail}
        message="Thêm user thất bại"
        onClick={() => setIsShowModalAddExcelFail(false)}
      />
      <NotiSuccess
        isShow={isShowModalAddExcelSuccess}
        setIsShow={setIsShowModalAddExcelSuccess}
        message="Thêm user thành công"
        onClick={() => setIsShowModalAddExcelSuccess(false)}
      />
    </div>
  );
};
