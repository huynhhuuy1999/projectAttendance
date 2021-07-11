import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CardClass } from "../../components";
import { Banner, Search } from "../../components/common";
import { doGetListClass, doGetListClassByTeacher } from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./ListClassTeaching.scss";
export const ListClassTeaching = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const listClass = useSelector(
    (state: RootState) => state.clazz.listClassByTeacher
  );
  const listClassAll = useAppSelector((state) => state.clazz.listClass);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isShowModalSuccess, setIsShowModalSucces] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (currentUser) {
      console.log("currentUser.username", currentUser.username);
      if (listClassAll?.length === 0) {
        dispatch(doGetListClass());
      }
      dispatch(doGetListClassByTeacher(currentUser.username));
    }
  }, [reload, currentUser]);
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
        {listClass?.map((item: IResponseListClass, index: number) => {
          return (
            <div className="listclassteaching__item">
              <CardClass
                idClass={item.id}
                numberStudent={item.numberStudent}
                nameClass={item.course?.name}
                nameTeacher={item.teacher?.fullName}
                // room="P.B.04"
                startTime={moment(item.startDate).format("DD/MM/YYYY")}
                endTime={moment(item.endDate).format("DD/MM/YYYY")}
                key={index}
                viewListStudent={true}
                // role={role}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
