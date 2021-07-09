import { useFormik } from "formik";
import React from "react";
import { Color } from "../../../constants";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./Search.scss";

export const Search: React.FC<ISearch> = ({
  placeholder,
  className,
  search,
}) => {
  const formik = useFormik({
    initialValues: {
      searchText: "",
    },
    onSubmit: (value) => {
      if (search) search(value.searchText);
    },
  });
  return (
    <div className={`search ${className}`}>
      <form onSubmit={formik.handleSubmit} className="form">
        <Input
          value={formik.values.searchText}
          type="text"
          id="searchText"
          name="searchText"
          isLabel={false}
          placeholder={placeholder}
          classNameInput="search__input"
          onChange={formik.handleChange}
        />
        <Button
          color={Color.Blue}
          textColor="#FFF"
          type="Submit"
          className="form__btn"
        >
          Tìm kiếm
        </Button>
      </form>
    </div>
  );
};
