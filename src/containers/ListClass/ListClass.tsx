import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { CardClass } from "../../components";
import {
  Banner,
  Button,
  Dropdown,
  Search,
  NotiSuccess,
  NotiOption,
} from "../../components/common";
import { Color, ROLE } from "../../constants";
import {
  doAddClassExcel,
  doDeleteClass,
  doGetListClass,
  doGetListClassByCourse,
} from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./ListClass.scss";
export const ListClass = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [role, setRole] = useState(0);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const listClass = useSelector((state: RootState) => state.clazz.listClass);
  const [isShowModalSuccess, setIsShowModalSucces] = useState(false);
  const [isShowModalOption, setIsShowModalOption] = useState(false);
  const [reload, setReload] = useState(false);
  const [idClass, setIdClass] = useState("");
  const { idCourse } = useParams<{ idCourse: string }>();
  const [showModalAddExcel, setShowModalAddExcel] = useState(false);
  // console.log("listClassByCourse", listClassByCourse);
  // const listYear = [
  //   { label: "2019-2020", value: 1 },
  //   { label: "2020-2021", value: 2 },
  // ];
  const handleDeleteCourse = (id: string) => {
    dispatch(doDeleteClass({ id: id })).then(() => {
      setIsShowModalSucces(true);
      setReload(!reload);
    });
  };

  const handleAddExcelClass = (e: any) => {
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
    //   .post("http://localhost:8080/api/excel/classes", formData, config)
    //   .then(() => {
    //     // console.log("ok");
    //   })
    //   .catch((err) => console.log(err));
    dispatch(doAddClassExcel(formData)).then(() => {
      setShowModalAddExcel(true);
      setReload(!reload);
    });
  };
  useEffect(() => {
    if (idCourse) {
      dispatch(doGetListClassByCourse(idCourse));
    } else {
      dispatch(doGetListClass());
    }
  }, [reload]);

  useEffect(() => {
    if (currentUser.roles) {
      setRole(currentUser.roles[0].id);
    }
  }, [currentUser]);
  return (
    <div className="listclass">
      <Banner title="Danh sách lớp học" />
      <div className="listclass__header">
        <Search placeholder="Nhập khóa học" className="listclass__search" />
        {role === ROLE.ADMIN ? (
          <>
            <Button
              className="listcourses__btn-add"
              color={Color.Yellow}
              onClick={() => history.push("/createclass")}
            >
              Thêm lớp học
            </Button>
            <label
              htmlFor="class"
              className="listclass__excel"
              style={{ backgroundColor: Color.Green }}
            >
              Nhập Excel
            </label>
            <input
              type="file"
              name="class"
              id="class"
              style={{ display: "none" }}
              onChange={(e) => handleAddExcelClass(e)}
            />
          </>
        ) : role === ROLE.TEACHER ? (
          <Button
            className="listcourses__btn-add"
            color={Color.Green}
            onClick={() => history.push("./listclassteaching")}
          >
            Xem lớp đang dạy
          </Button>
        ) : null}
      </div>
      <div className="listclass__list">
        {listClass.map((item: IResponseListClass, index: number) => {
          return (
            <div className="listclass__item">
              <CardClass
                idClass={item.id}
                numberStudent={item.numberStudent}
                nameClass={item.course?.name}
                nameTeacher={item.teacher?.fullName}
                room="P.B.04"
                startTime={moment(item.startDate).format("DD/MM/YYYY")}
                endTime={moment(item.endDate).format("DD/MM/YYYY")}
                key={index}
                role={role}
                showModal={(idClass) => {
                  setIsShowModalOption(true);
                  setIdClass(idClass);
                }}
              />
            </div>
          );
        })}
      </div>
      <NotiOption
        isShow={isShowModalOption}
        setIsShow={setIsShowModalOption}
        btnLeft="Xóa"
        btnRight="Hủy"
        onClickBtnLeft={() => {
          handleDeleteCourse(idClass);
          setIsShowModalOption(false);
        }}
        onClickBtnRight={() => setIsShowModalOption(false)}
        message={`Bạn chắc chắn muốn xóa lớp học ${idClass}?`}
      />
      <NotiSuccess
        isShow={isShowModalSuccess}
        setIsShow={setIsShowModalSucces}
        message="Xóa lớp học thành công"
        onClick={() => {
          setIsShowModalSucces(false);
        }}
      />
      <NotiSuccess
        message="Thêm danh sách thành công"
        isShow={showModalAddExcel}
        setIsShow={setShowModalAddExcel}
        onClick={() => setShowModalAddExcel(false)}
      />
    </div>
  );
};
