import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./TableParent.scss";
import { useAppDispatch } from "../../../redux/store";

export const TableParent: React.FC<ITableParent> = ({ data, showModal }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  return (
    <>
      <table className="table-parent">
        <thead>
          <tr>
            <th>Mã phụ huynh</th>
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Số điện thoại</th>
            <th>Chi tiết</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{moment(item.birthday).format("DD/MM/YYYY")}</td>
                <td>{item.phone}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/detailparent/${item.id}`)}
                >
                  Chi tiết
                </td>
                <td>
                  <IoMdCloseCircleOutline
                    size={24}
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={() => showModal(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
