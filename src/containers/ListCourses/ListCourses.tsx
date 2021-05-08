import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CardCourses } from "../../components";
import { Banner, Button, Dropdown, Search } from "../../components/common";
import { RootState } from "../../redux/rootReducer";
import "./ListCourses.scss";

export const ListCourses = () => {
  const listCourse = [1, 2, 4, 1, 1, 1];
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [role, setRole] = useState(0);
  const history = useHistory();
  const listYear = [
    { label: "2019-2020", value: 1 },
    { label: "2020-2021", value: 2 },
  ];
  useEffect(() => {
    if (currentUser.roles) setRole(currentUser.roles[0].id);
  }, [currentUser.roles]);
  return (
    <div className="listcourses">
      <Banner title="Danh sách khóa học" />
      <div className="listcourses__header">
        <Search placeholder="Nhập khóa học" className="listcourses__search" />
        {/* <div className="listcourses__year">
          <span style={{ fontWeight: "bold", fontSize: 16 }}>Năm học</span>
          <Dropdown
            data={listYear}
            className="listcourses__dropdown"
            onChange={(value: any) => console.log(value)}
          />
        </div> */}
        {/* <Button isSecondaryBtn className="listcourses__btn">
          Tìm kiếm
        </Button> */}
        {role === 1 ? (
          <>
            <Button
              className="listcourses__btn-add"
              // isSecondaryBtn
              onClick={() => {
                history.push("/createcourse");
              }}
            >
              Thêm khóa học
            </Button>
            <Button
              className="listcourses__btn-excel"
              isThirBtn
              // onClick={() => {
              //   history.push("/createcourse");
              // }}
            >
              Nhập Excel
            </Button>
          </>
        ) : null}
      </div>

      <div className="listcourses__list">
        {listCourse.map((item, index) => {
          return (
            <div className="listcourses__item">
              <CardCourses
                idCourse="PHP"
                nameCourse="Phát triển ứng dụng di động"
                numberClass={3}
                key={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
