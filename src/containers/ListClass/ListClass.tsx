import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CardClass } from "../../components";
import { Banner, Button, Dropdown, Search } from "../../components/common";
import { RootState } from "../../redux/rootReducer";
import "./ListClass.scss";
export const ListClass = () => {
  const listCourse = [1, 2, 4, 1, 1, 1];
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [role, setRole] = useState(0);
  const history = useHistory();
  const listYear = [
    { label: "2019-2020", value: 1 },
    { label: "2020-2021", value: 2 },
  ];
  useEffect(() => {
    if (currentUser.roles) {
      setRole(currentUser.roles[0].id);
    }
  }, [currentUser]);
  return (
    <div className="listclass">
      <Banner title="Danh sách lớp học" />
      <div className="listclass__header">
        <Search placeholder="Nhập khóa học" className="listcourses__search" />
        {/* <div className="listclass__year">
          <span style={{ fontWeight: "bold", fontSize: 16 }}>Năm học</span>
          <Dropdown
            data={listYear}
            className="listclass__dropdown"
            onChange={(value: any) => console.log(value)}
          />
        </div> */}
        {/* <Button isSecondaryBtn className="listclass__btn">
          Tìm kiếm
        </Button> */}
        {role === 1 ? (
          <>
            <Button
              className="listcourses__btn-add"
              onClick={() => history.push("/createclass")}
            >
              Thêm lớp học
            </Button>
            <Button className="listcourses__btn-excel" isThirBtn>
              Nhập Excel
            </Button>
          </>
        ) : null}
      </div>
      <div className="listclass__list">
        {listCourse.map((item, index) => {
          return (
            <div className="listclass__item">
              <CardClass
                idClass="SS001.J13"
                numberStudent={50}
                nameClass="Những nguyên lý cơ bản của chủ nghĩa Mác Lênin"
                nameTeacher="Nguyễn Ngọc Kỳ Duyên"
                room="P.B.04"
                startTime="04/07/2020"
                endTime="04/12/2021"
                key={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
