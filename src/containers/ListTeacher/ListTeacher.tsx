import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { TableTeacher } from "../../components";
import {
  Banner,
  Button,
  NumberRow,
  Pagination,
  Search,
  NotiSuccess,
  NotiOption,
  Loader,
  NotiFail,
} from "../../components/common";
import { Color } from "../../constants";
import {
  doAddExcelUser,
  doDeleteUser,
  doGetListTeacher,
} from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { doSearchListTeacher } from "../../redux/slice";
import { useAppDispatch } from "../../redux/store";
import "./ListTeacher.scss";

export const ListTeacher = () => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const { idClass } = useParams<{ idClass: string }>();
  const listTeacher = useSelector(
    (state: RootState) => state.teacher.listTeacher
  );
  const listTeacherSearch = useSelector(
    (state: RootState) => state.teacher.listTeacherSearch
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = listTeacherSearch?.slice(
    firstOfIndexCurrentPage,
    endOfIndexCurrentPage
  );
  const [showModal, setShowModal] = useState(false);
  const [idTeacher, setIdTeacher] = useState("");
  const [loader, setLoader] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);
  const [isShowModalAddExcelSuccess, setIsShowModalAddExcelSuccess] =
    useState(false);
  const [isShowModalAddExcelFail, setIsShowModalAddExcelFail] = useState(false);
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [reload, setReload] = useState(false);
  const [role, setRole] = useState(0);
  const dispatch = useAppDispatch();

  const changePage = (number: number) => {
    setCurrentPage(number);
  };
  const changeNumber = (number: number) => {
    setPostPerPage(number);
    setCurrentPage(1);
  };

  const handleDeleteStudent = () => {
    setShowModal(false);
    dispatch(
      doDeleteUser({
        id: idTeacher,
      })
    ).then(() => {
      setReload(!reload);
      setIsShowModalSuccess(true);
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

  const handleSearch = (value: string) => {
    if (value === "") {
      dispatch(doGetListTeacher());
      return;
    } else {
      let newListTeacher = listTeacher.filter((item) => {
        return (
          item.fullName?.search(value) !== -1 || item.id.search(value) !== -1
        );
      });
      dispatch(doSearchListTeacher(newListTeacher));
    }
  };

  useEffect(() => {
    setLoader(true);
    dispatch(doGetListTeacher()).then(() => setLoader(false));
  }, [reload]);

  useEffect(() => {
    if (currentUser.roles) {
      setRole(currentUser.roles[0].id);
    }
  }, [currentUser.roles]);

  return (
    <div className="list-teacher">
      <Banner title="Danh sách giảng viên" />

      <div className="list-teacher__header">
        <div className="list-teacher__number-row">
          <NumberRow changeNumber={changeNumber} />
        </div>
        <div className="list-teacher__search">
          <Search
            placeholder="Nhập họ tên, mã số giảng viên"
            search={(value) => handleSearch(value)}
          />
        </div>
        {role === 1 ? (
          <>
            <Button
              color={Color.Yellow}
              marginLeft={10}
              onClick={() => history.push("/updateteacher")}
            >
              Thêm giảng viên
            </Button>
            {/* <Button
              marginLeft={10}
              color={Color.Green}
              // onClick={() => history.push("/updateteacher")}
            >
              Thêm Excel
            </Button> */}

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
          </>
        ) : (
          <></>
        )}
      </div>
      {loader ? (
        <Loader color={Color.Blue} />
      ) : (
        <>
          <div className="list-teacher__table">
            <TableTeacher
              data={currenPost}
              showModal={(id) => {
                setShowModal(true);
                setIdTeacher(id);
              }}
            />
          </div>
          <div className="list-teacher__pagination">
            <Pagination
              postPerPage={postPerPage}
              totalPost={listTeacherSearch.length}
              changePage={changePage}
              currentPage={currentPage}
            />
          </div>
        </>
      )}

      <NotiOption
        isShow={showModal}
        setIsShow={setShowModal}
        btnLeft="Xóa"
        btnRight="Hủy"
        onClickBtnLeft={() => {
          handleDeleteStudent();
        }}
        onClickBtnRight={() => setShowModal(false)}
        message={`Bạn có chắc chắn muốn xóa giảng viên ${idTeacher} không?`}
      />
      <NotiSuccess
        isShow={isShowModalSuccess}
        setIsShow={setIsShowModalSuccess}
        message="Xóa giảng viên thành công"
        onClick={() => setIsShowModalSuccess(false)}
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
