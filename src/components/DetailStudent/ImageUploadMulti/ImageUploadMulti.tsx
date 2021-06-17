import React, { useEffect, useState } from "react";
import { BsPersonBoundingBox } from "react-icons/bs";
import "./ImageUploadMulti.scss";

export const ImageUploadMulti: React.FC<IImageUploadInput> = ({
  className,
  onChange,
  avatar,
}) => {
  const [image, setImage]: any = useState([]);
  const [filesUpload, setFilesUpload]: any = useState([]);
  const [flag, setFlag]: any = useState([]);
  const setImageList = (value: any) => {
    setFlag(value);
  };

  useEffect(() => {
    if (flag.length > 0) {
      setImage([...image, flag]);
    }
  }, [flag]);

  useEffect(() => {
    onChange(filesUpload);
    console.log("filesUpload", filesUpload);
  }, [filesUpload]);

  const handleChangeImage = (e: any) => {
    e.persist();
    e.preventDefault();
    const files = e.target.files;
    // setFilesUpload([...filesUpload, files]);
    setFilesUpload(files);
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          setImageList(event.target?.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className={`image-upload-multi ${className}`}>
      <input
        id="uploadMulti"
        multiple
        type="file"
        onChange={(e) => handleChangeImage(e)}
        style={{ display: "none" }}
      />
      <label className="image-upload-multi__label" htmlFor="uploadMulti">
        Chọn ảnh train
      </label>
      {image.length > 0 ? (
        <div className="image-upload-multi__list-image">
          {image.map((item: any, index: number) => {
            return <img src={item} alt="" key={index} />;
          })}
        </div>
      ) : (
        <div className="image-upload-multi__list-image">
          <div className="image-upload-multi__img-empty">
            <BsPersonBoundingBox size={50} color="#555" />
          </div>
        </div>
      )}
    </div>
  );
};
