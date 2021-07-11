import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Banner, Button } from "../../components/common";
import { Color } from "../../constants";
import { doGetOneParent } from "../../redux/action";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./DetailParent.scss";

export const DetailParent = () => {
  const { idParent } = useParams<{ idParent: string }>();
  const oneParent = useAppSelector((state) => state.parent.oneParent);
  const history = useHistory();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(doGetOneParent(idParent));
  }, []);

  return (
    <div className="DetailParent">
      <Banner title={`Chi tiết phụ huynh ${idParent}`} />
      <div className="DetailParent__content">
        <span className="bold">Mã phụ huynh:</span>
        <span>{oneParent.id}</span>
        <span className="bold">Họ tên:</span>
        <span>{oneParent.fullName}</span>
        <span className="bold">Mã sinh viên:</span>
        <span>17521284</span>
        <span className="bold">Email:</span>
        <span>{oneParent.email}</span>
        <span className="bold">Số điện thoại:</span>
        <span>{oneParent.phone}</span>
        <span className="bold">Địa chỉ:</span>
        <span>{oneParent.address}</span>
        <span className="bold">Ngày sinh:</span>
        <span>{moment(oneParent.birthday).format("DD-MM-YYYY")}</span>
      </div>
      <div className="DetailParent__group-btn">
        <Button
          color={Color.Blue}
          className="DetailParent__btn-update"
          onClick={() => history.push(`/createparent/${idParent}`)}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  );
};
