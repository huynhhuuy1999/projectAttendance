import React, { useState } from "react";
import "./ImageUploadInput.scss";

export const ImageUploadInput: React.FC<IImageUploadInput> = ({
  className,
  onChange,
  avatar,
}) => {
  const [image, setImage]: any = useState("");
  const handleChangeFile = (event: any) => {
    event.persist();
    event.preventDefault();
    const { files } = event.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result);
      };
      reader.readAsDataURL(files[0]);
      return onChange(files[0]);
    }
  };
  return (
    <div className={`image-upload-input ${className}`}>
      {image ? (
        <img
          className="image-upload-input__image"
          src={image}
          alt="cover-image"
        />
      ) : (
        ""
      )}
      <label className="image-upload-input__btn-upload">
        <input
          className="image-upload-input__file-input"
          type="file"
          onChange={(e) => {
            handleChangeFile(e);
          }}
        />
        Cập nhật ảnh
      </label>
    </div>
  );
};
