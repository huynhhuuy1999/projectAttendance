import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { CardClass } from "../../components";
import {
  Banner,
  Button,
  Loader,
  LoaderModal,
  NotiFail,
  NotiOption,
  NotiSuccess,
  Pagination,
  Search,
} from "../../components/common";
import { Color, ROLE } from "../../constants";
import {
  doAddClassExcel,
  doDeleteClass,
  doGetListClass,
  doGetListClassByCourse,
} from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { doSearchListClass } from "../../redux/slice";
import { useAppDispatch } from "../../redux/store";
import "./ListClass.scss";
export const ListClass = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [role, setRole] = useState(0);
  const [postPerPage, setPostPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const listClass = useSelector((state: RootState) => state.clazz.listClass);
  const listClassSearch = useSelector(
    (state: RootState) => state.clazz.listClassSearch
  );
  const [isShowModalSuccess, setIsShowModalSucces] = useState(false);
  const [isShowModalOption, setIsShowModalOption] = useState(false);
  const [isShowModalExcelFail, setIsShowModalExcelFail] = useState(false);
  const [reload, setReload] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);
  const [idClass, setIdClass] = useState("");
  const { idCourse } = useParams<{ idCourse: string }>();
  const [showModalAddExcel, setShowModalAddExcel] = useState(false);

  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = listClassSearch?.slice(
    firstOfIndexCurrentPage,
    endOfIndexCurrentPage
  );

  const handleDeleteCourse = (id: string) => {
    dispatch(doDeleteClass({ id: id })).then(() => {
      setIsShowModalSucces(true);
      setReload(!reload);
    });
  };

  const handleAddExcelClass = (e: any) => {
    setLoaderModal(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    dispatch(doAddClassExcel(formData))
      .then(unwrapResult)
      .then(() => {
        setLoaderModal(false);
        setShowModalAddExcel(true);
        setReload(!reload);
      })
      .catch((err) => {
        setIsShowModalExcelFail(true);
        setLoaderModal(false);
      });
  };

  const handleSearch = (value: string) => {
    if (value === "" && !idCourse) {
      dispatch(doGetListClass());
      return;
    }
    if (value === "" && idCourse) {
      dispatch(doGetListClassByCourse(idCourse));
      return;
    }
    if (value !== "") {
      let newListClass = listClass?.filter((item: any) => {
        return (
          String(item.id)?.search(value) !== -1 ||
          String(item.course.id).search(value) !== -1 ||
          String(item.course.name).search(value) !== -1
        );
      });
      dispatch(doSearchListClass(newListClass));
    }
    setCurrentPage(1);
  };

  const changePage = (number: number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    setLoader(true);
    if (idCourse) {
      dispatch(doGetListClassByCourse(idCourse)).then(() => setLoader(false));
    } else {
      dispatch(doGetListClass()).then(() => setLoader(false));
    }
  }, [reload, idCourse]);

  useEffect(() => {
    if (currentUser.roles) {
      setRole(currentUser.roles[0].id);
    }
  }, [currentUser]);
  return (
    <div className="listclass">
      <Banner
        title={
          idCourse
            ? `Danh s??ch l???p h???c c???a kh??a ${idCourse}`
            : "Danh s??ch l???p h???c"
        }
      />
      <div className="listclass__header">
        <Search
          placeholder="Nh???p kh??a h???c"
          className="listclass__search"
          search={(value) => handleSearch(value)}
        />
        {role === ROLE.ADMIN ? (
          <>
            <Button
              className="listcourses__btn-add"
              color={Color.Yellow}
              onClick={() => history.push("/createclass")}
            >
              Th??m l???p h???c
            </Button>
            <label
              htmlFor="class"
              className="listclass__excel"
              style={{ backgroundColor: Color.Green }}
            >
              Nh???p Excel
            </label>
            <input
              type="file"
              name="class"
              id="class"
              style={{ display: "none" }}
              onChange={(e) => handleAddExcelClass(e)}
            />
          </>
        ) : role === ROLE.TEACHER && !idCourse ? (
          <Button
            className="listcourses__btn-add"
            color={Color.Green}
            onClick={() => history.push("./listclassteaching")}
          >
            Xem l???p ??ang d???y
          </Button>
        ) : null}
      </div>
      {loader ? (
        <Loader color={Color.Blue} />
      ) : (
        <>
          <div className="listclass__list">
            {currenPost?.map((item: IResponseListClass, index: number) => {
              return (
                <div className="listclass__item">
                  <CardClass
                    idClass={item.id}
                    numberStudent={item.numberStudent}
                    nameClass={item.course?.name}
                    nameTeacher={item.teacher?.fullName}
                    // room="P.B.04"
                    startTime={moment(item.startDate).format("DD/MM/YYYY")}
                    endTime={moment(item.endDate).format("DD/MM/YYYY")}
                    key={index}
                    role={role}
                    showModal={(idClass) => {
                      setIsShowModalOption(true);
                      setIdClass(idClass);
                    }}
                    viewListStudent={role === ROLE.ADMIN ? true : false}
                  />
                </div>
              );
            })}
          </div>
          <div className="list-student__pagination">
            <Pagination
              postPerPage={postPerPage}
              totalPost={listClassSearch?.length}
              changePage={changePage}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
      <LoaderModal isShow={loaderModal} color={Color.Blue} />

      <NotiOption
        isShow={isShowModalOption}
        setIsShow={setIsShowModalOption}
        btnLeft="X??a"
        btnRight="H???y"
        onClickBtnLeft={() => {
          handleDeleteCourse(idClass);
          setIsShowModalOption(false);
        }}
        onClickBtnRight={() => setIsShowModalOption(false)}
        message={`B???n ch???c ch???n mu???n x??a l???p h???c ${idClass}?`}
      />
      <NotiSuccess
        isShow={isShowModalSuccess}
        setIsShow={setIsShowModalSucces}
        message="X??a l???p h???c th??nh c??ng"
        onClick={() => {
          setIsShowModalSucces(false);
        }}
      />
      <NotiSuccess
        message="Th??m danh s??ch th??nh c??ng"
        isShow={showModalAddExcel}
        setIsShow={setShowModalAddExcel}
        onClick={() => setShowModalAddExcel(false)}
      />
      <NotiFail
        message="Th??m danh s??ch th???t b???i"
        isShow={isShowModalExcelFail}
        setIsShow={setIsShowModalExcelFail}
        onClick={() => setIsShowModalExcelFail(false)}
      />
    </div>
  );
};
