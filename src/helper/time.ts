export const changeNameDay = (value: number) => {
  switch (value) {
    case 0:
      return "Chủ nhật";
    case 1:
      return "Thứ hai";
    case 2:
      return "Thứ ba";
    case 3:
      return "Thứ tư";
    case 4:
      return "Thứ năm";
    case 5:
      return "Thứ sáu";
    case 6:
      return "Thứ bảy";
  }
};
