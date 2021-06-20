import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ImageUploadMulti } from "../../components";
import { Banner, Button } from "../../components/common";
import { Color } from "../../constants";
import {
  doGetPhotoAttendance,
  doUploadPhotoAttendance,
} from "../../redux/action/attendanceAction";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import "./ListImageAttendance.scss";

export const ListImageAttendance = () => {
  // const [image, setImage]: any = useState([]);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const listImage = useSelector(
    (state: RootState) => state.attendance.listPhotoAttendance
  );
  // const history = useHistory();
  const [reload, setReload] = useState(false);
  const handleUploadAttendanceImage = (value: any) => {
    const formData = new FormData();
    for (let i = 0; i < value.length; i++) {
      formData.append("files", value[i], value[i].name);
    }
    dispatch(
      doUploadPhotoAttendance({
        formData: formData,
        id: id,
      })
    ).then(() => {
      setReload(!reload);
    });
  };

  useEffect(() => {
    dispatch(doGetPhotoAttendance(id));
  }, [reload]);

  return (
    <div className="list-image-attendance">
      <Banner title="Danh sách ảnh nhận diện" />
      <ImageUploadMulti
        onChange={(value: any) => {
          handleUploadAttendanceImage(value);
        }}
      />
      <div className="list-image-attendance__list">
        {listImage.map((item, index) => {
          return (
            <div
              key={index}
              className="list-image-attendance__item"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          );
        })}
      </div>
    </div>
  );
};
