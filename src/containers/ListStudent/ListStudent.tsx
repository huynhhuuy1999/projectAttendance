import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TableStudent } from "../../components";
import {
  Banner,
  Button,
  NumberRow,
  Pagination,
  NotiSuccess,
  Search,
  NotiOption,
} from "../../components/common";
import { Color } from "../../constants";
import {
  doAddTimetable,
  doDeleteUser,
  doGetListStudent,
} from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import "./ListStudent.scss";

export const ListStudent = () => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [idStudent, setIdStudent] = useState("");
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [reload, setReload] = useState(false);
  const history = useHistory();

  const listStudent = useSelector(
    (state: RootState) => state.student.listStudent
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = listStudent?.slice(
    firstOfIndexCurrentPage,
    endOfIndexCurrentPage
  );
  const [role, setRole] = useState(0);
  const dispatch = useAppDispatch();

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
    const formData = new FormData();
    const token = localStorage.getItem("TOKEN");
    formData.append("file", e.target.files[0], e.target.files[0].name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        // "content-type": "application/json",
      },
    };
    axios
      .post("http://localhost:8080/api/excel/timetables", formData, config)
      .then(() => {
        console.log("ok");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dispatch(doGetListStudent());
  }, [reload]);
  useEffect(() => {
    if (currentUser.roles) {
      setRole(currentUser.roles[0].id);
    }
  }, [currentUser.roles]);
  const changePage = (number: number) => {
    setCurrentPage(number);
  };
  const changeNumber = (number: number) => {
    setPostPerPage(number);
    setCurrentPage(1);
  };

  return (
    <div className="list-student">
      <Banner title="Danh sách sinh viên" />

      <div className="list-student__header">
        <div className="list-student__number-row">
          <NumberRow changeNumber={changeNumber} />
        </div>
        <div className="list-student__search">
          <Search placeholder="Nhập họ tên, mã số sinh viên" />
        </div>
        {role === 1 ? (
          <>
            <Button
              color={Color.Yellow}
              marginLeft={10}
              onClick={() => history.push("/updatestudent")}
            >
              Thêm sinh viên
            </Button>
            <Button
              color={Color.Green}
              marginLeft={10}
              // onClick={() => history.push("/updatestudent")}
            >
              Thêm Excel
            </Button>
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
      </div>
      <div className="list-student__table">
        <TableStudent
          data={currenPost}
          showModal={(id) => {
            setShowModal(true);
            setIdStudent(id);
          }}
          idClass="ACCT3603.L12"
          isAttendance={true}
        />
      </div>
      <div className="list-student__pagination">
        <Pagination
          postPerPage={postPerPage}
          totalPost={listStudent.length}
          changePage={changePage}
          currentPage={currentPage}
        />
      </div>

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
    </div>
  );
};
