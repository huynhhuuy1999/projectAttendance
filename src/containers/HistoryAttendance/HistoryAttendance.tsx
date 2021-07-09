import React from "react";
import { useParams } from "react-router-dom";
import { Banner, Modal, Search } from "../../components/common";
import { BsImages } from "react-icons/bs";
import "./HistoryAttendance.scss";
import { useState } from "react";
import { Test } from "../../constants/image";

export const HistoryAttendance = () => {
  const { idStudent, idClass } =
    useParams<{ idStudent: string; idClass: string }>();
  const [showModal, setShowModal] = useState(false);
  const handleSearch = (value: string) => {};
  const [date, setDate] = useState("");
  return (
    <div className="HistoryAttendance">
      <Banner
        title={`Lịch sử điểm danh của sinh viên ${idStudent} trong lớp ${idClass}`}
      />
      <div className="HistoryAttendance__content">
        <div className="HistoryAttendance__search">
          <Search
            placeholder="Nhập ngày cần tìm kiếm"
            search={(value) => handleSearch(value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <td>Ngày</td>
              <td>Thời gian điểm danh</td>
              <td>Trạng thái</td>
              <td>Xem ảnh</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01/02/2021</td>
              <td>15:00:23</td>
              <td></td>
              <td>
                <BsImages cursor="pointer" color="red" fontSize={17} />
              </td>
            </tr>
            <tr>
              <td>05/02/2021</td>
              <td>13:50:23</td>
              <td></td>
              <td>
                <BsImages cursor="pointer" color="red" fontSize={17} />
              </td>
            </tr>
            <tr>
              <td>08/02/2021</td>
              <td></td>
              <td>Vắng</td>
              <td></td>
            </tr>
            <tr>
              <td>12/02/2021</td>
              <td>13:48:23</td>
              <td></td>
              <td>
                <BsImages cursor="pointer" color="red" fontSize={17} />
              </td>
            </tr>
            <tr>
              <td>15/02/2021</td>
              <td>15:10:23</td>
              <td></td>
              <td>
                <BsImages cursor="pointer" color="red" fontSize={17} />
              </td>
            </tr>
            <tr>
              <td>19/02/2021</td>
              <td>13:00:23</td>
              <td></td>
              <td>
                <BsImages cursor="pointer" color="red" fontSize={17} />
              </td>
            </tr>
            <tr>
              <td>22/02/2021</td>
              <td>15:05:23</td>
              <td></td>
              <td>
                <BsImages cursor="pointer" color="red" fontSize={17} />
              </td>
            </tr>
            <tr>
              <td>26/02/2021</td>
              <td></td>
              <td>Vắng</td>
              <td></td>
            </tr>
            <tr>
              <td>01/03/2021</td>
              <td>15:00:23</td>
              <td></td>
              <td>
                <BsImages
                  cursor="pointer"
                  color="red"
                  fontSize={17}
                  onClick={() => {
                    setDate("01/03/2021 15:00:23");
                    setShowModal(true);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>05/03/2021</td>
              <td>13:00:23</td>
              <td></td>
              <td>
                <BsImages cursor="pointer" color="red" fontSize={17} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal
        className="HistoryAttendance__show-img"
        isShow={showModal}
        setIsShow={setShowModal}
      >
        <div className="HistoryAttendance__content-modal">
          <span>Thời gian: {date}</span>
          <img src={Test} alt="" />
        </div>
      </Modal>
    </div>
  );
};
