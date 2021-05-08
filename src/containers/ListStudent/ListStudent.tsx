import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
import { TableStudent } from "../../components";
import {
  Banner,
  Button,
  NumberRow,
  Pagination,
  Search,
} from "../../components/common";
// import { readCookie } from "../../helper";
// import { RootState } from "../../redux/rootReducer";
// import { doGetCurrentUser } from "../../redux/slice";
import "./ListStudent.scss";

export const ListStudent = () => {
  const [data, setData] = useState([]);
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = data.slice(firstOfIndexCurrentPage, endOfIndexCurrentPage);
  const getListData: any = () => {
    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push(
        <tr>
          <td>17521284</td>
          <td>Huỳnh Hữu Ý</td>
          <td>31/08/1999</td>
          <td>0345790193</td>
          <td>2</td>
          <td>5</td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/detailStudent")}
          >
            Chi tiết
          </td>
        </tr>
      );
    }
    for (let i = 0; i < 10; i++) {
      list.push(
        <tr>
          <td>999999</td>
          <td>Huỳnh abc def</td>
          <td>31/08/1999</td>
          <td>0345790193</td>
          <td>2</td>
          <td>5</td>
          <td style={{ cursor: "pointer" }}>Chi tiết</td>
        </tr>
      );
    }
    return list;
  };
  const changePage = (number: number) => {
    setCurrentPage(number);
  };
  const changeNumber = (number: number) => {
    // console.log("abc:", number);
    setPostPerPage(number);
    setCurrentPage(1);
  };

  useEffect(() => {
    setData(getListData());
    // if()
  }, []);

  return (
    <div className="list-student">
      <Banner title="Danh sách sinh viên" />
      <Button isOrderBtn className="list-student__btn-add">
        Thêm sinh viên
      </Button>
      <div className="list-student__header">
        <div className="list-student__number-row">
          <NumberRow changeNumber={changeNumber} />
        </div>
        <div className="list-student__search">
          <Search placeholder="Nhập họ tên, mã số sinh viên" />
        </div>
      </div>
      <div className="list-student__table">
        <TableStudent data={currenPost} />
      </div>
      <div className="list-student__pagination">
        <Pagination
          postPerPage={postPerPage}
          totalPost={data.length}
          changePage={changePage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
