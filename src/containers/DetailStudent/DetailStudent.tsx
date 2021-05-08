import React from "react";
import { ImageUploadInput } from "../../components";
import TestAvatar from "../../assets/images/cong-nghe-nhan-dien-khuon-mat-1.jpg";
import "./DetailStudent.scss";
import { Banner, Button } from "../../components/common";
import { useHistory } from "react-router";

export const DetailStudent = () => {
  const imageOnChange = (f: File) => {
    // formik.setFieldValue('groupCoverImage', f);
  };
  const history = useHistory();
  return (
    <div className="detailStudent">
      <Banner title="Chi tiết sinh viên" />
      <div className="detailStudent__content">
        <div className="detailStudent__avatar">
          <ImageUploadInput avatar={TestAvatar} onChange={imageOnChange} />
        </div>
        <div className="detailStudent__infor-right">
          <div className="detailStudent__info">
            <span className="detailStudent__label">MSSV:</span>
            <span>17521284</span>
            <span className="detailStudent__label">Họ tên:</span>
            <span>Taylor Swift</span>
            <span className="detailStudent__label">Ngày sinh:</span>
            <span>31/08/1999</span>
            <span className="detailStudent__label">Số điện thoại:</span>
            <span>0345790493</span>
            <span className="detailStudent__label">Email:</span>
            <span className="detailStudent__info-address">
              huynhhuuy1@gmail.com
            </span>
            <span className="detailStudent__label">Địa chỉ:</span>
            <span className="detailStudent__info-address">
              25/250 Trường Chinh, phường 1, quận 5, thành phố Hồ Chí Minh
            </span>
            <span className="detailStudent__label">Số buổi vắng:</span>
            <span>2</span>
            <span className="detailStudent__label">Số buổi trễ:</span>
            <span>5</span>
            <span className="detailStudent__label">Họ tên bố</span>
            <span>Taylor Swat</span>
            <span className="detailStudent__label">Số điện thoại:</span>
            <span>999999999</span>
            <span className="detailStudent__label">Họ tên mẹ:</span>
            <span>Nguyễn Thị Swoft</span>
            <span className="detailStudent__label">Số điện thoại:</span>
            <span>888888888</span>
          </div>
          <div className="detailStudent__group-btn">
            <Button isSecondaryBtn={true}>Liên hệ phụ huynh</Button>
            <Button
              isSecondaryBtn={true}
              className="detailStudent__btn--margin-left"
              onClick={() => history.push("/updatestudent")}
            >
              Cập nhật thông tin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
