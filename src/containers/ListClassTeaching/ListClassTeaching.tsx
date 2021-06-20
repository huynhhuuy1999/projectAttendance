import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CardClass } from "../../components";
import { Banner, Search } from "../../components/common";
import { doGetListClassByTeacher } from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import "./ListClassTeaching.scss";
export const ListClassTeaching = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const listClass = useSelector(
    (state: RootState) => state.clazz.listClassByTeacher
  );
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isShowModalSuccess, setIsShowModalSucces] = useState(false);
  const [reload, setReload] = useState(false);
  // const listYear = [
  //   { label: "2019-2020", value: 1 },
  //   { label: "2020-2021", value: 2 },
  // ];
  useEffect(() => {
    if (currentUser) {
      dispatch(doGetListClassByTeacher(currentUser.id));
    }
  }, [reload]);
  return (
    <div className="listclassteaching">
      <Banner title="Danh sách lớp học đang dạy" />
      <div className="listclassteaching__header">
        <Search
          placeholder="Nhập khóa học"
          className="listclassteaching__search"
        />
      </div>
      <div className="listclassteaching__list">
        {listClass.map((item: IResponseListClass, index: number) => {
          return (
            <div className="listclassteaching__item">
              <CardClass
                idClass={item.id}
                numberStudent={item.numberStudent}
                nameClass={item.course?.name}
                nameTeacher={item.teacher?.fullName}
                room="P.B.04"
                startTime={moment(item.startDate).format("DD/MM/YYYY")}
                endTime={moment(item.endDate).format("DD/MM/YYYY")}
                key={index}
                // role={role}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
