import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ImageUploadMulti } from "../../components";
import { Banner, Button } from "../../components/common";
import { Color } from "../../constants";
import { doUploadPhotoAttendance } from "../../redux/action/attendanceAction";
import { useAppDispatch } from "../../redux/store";
import "./ListImageAttendance.scss";

export const ListImageAttendance = () => {
  const [image, setImage]: any = useState([]);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const handleUploadAttendanceImage = () => {
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("files", image[i], image[i].name);
    }
    dispatch(
      doUploadPhotoAttendance({
        formData: formData,
        id: id,
      })
    );
  };
  return (
    <div className="list-image-attendance">
      <Banner title="Danh sách ảnh nhận diện" />
      <ImageUploadMulti onChange={(value: any) => setImage(value)} />
      {image.length > 0 ? (
        <Button
          color={Color.Green}
          marginTop={10}
          onClick={() => handleUploadAttendanceImage()}
        >
          Xong
        </Button>
      ) : null}
    </div>
  );
};
