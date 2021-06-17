interface IStyle {
    width?: number,
    height?: number,
    padding?: number,
    paddingLeft?: number,
    paddingRight?: number,
    margin?: number,
    marginLeft?: number,
    marginRight?: number,
    textAlign?: string,
    borderRadius?: number,
    marginTop?: number,
    marginBottom?: number
}
interface IAvatar {
    image?: string;
    className?: string;
}
interface IBanner {
    title?: string;
}
interface IButton extends IStyle {
    className?: string;
    type?: any;
    isSecondaryBtn?: boolean;
    isThirBtn?: boolean;
    isOrderBtn?: boolean;
    color?: string;
    textColor?: string;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}
interface IDropdown {
    error?: string;
    data: Array<{ id?: string | number, name?: string }>;
    className?: string;
    onChange: (event: React.FormEvent<HTMLDivElement>) => void;
    placeholder?: string;
    value?: string | number;
}
interface IHeader {
    sidebar?: boolean;
    openSideBar?: any;
    isOpen?: boolean;
}
interface IInput {
    isLabel?: boolean;
    label?: string;
    value?: any;
    classNameInput?: string;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    placeholder?: string;
    type?: 'password' | 'text' | 'number' | 'radio' | 'email' | 'date';
    classNameLabel?: string;
    HTMLFor?: string;
    autoComplete?: string;
    id?: string;
    name?: string;
    error?: string;
    disable?: boolean;
}
interface ICardCourses {
    idCourse?: string | number;
    nameCourse?: string;
    numberClass?: number | string;
    handleEdit?: any;
    role?: number;
}
interface ICardClass {
    nameTeacher?: string;
    idClass?: string;
    numberStudent?: number | string;
    nameClass?: string;
    startTime?: string;
    endTime?: string;
    room?: string;
    role?: number;
    showModal?: (idClass: any) => void;
}
interface INumberRow {
    changeNumber: any;
}
interface IPagination {
    postPerPage?: any;
    totalPost: number;
    changePage?: any;
    currentPage?: number;
}
interface ISearch {
    placeholder?: string;
    className?: string;
}
interface ISideBar {
    isOpen?: boolean;
    openSideBar?: any;
}
interface IImageUploadInput {
    className?: string;
    onChange?: any;
    avatar?: any;
}
interface ITableStudent {
    data: Array<IResponseStudent>;
    showModal: (id: string) => void;
    isAttendance?: boolean;
    idClass: string;
}
interface ITableTeacher {
    data: Array<IResponseStudent>;
    showModal: (id: string) => void;
}
interface IBlankLayout {
    children?: any;
}
interface ISibarLayout {

}
interface IScheduleStudent {
    data?: Array<IResponseTimetableStudent>;
}
interface IPrivateRouter {
    component?: any;
    exact?: any;
    path?: string;
    isHasSideBar?: boolean;
}
interface IPublicRouter {
    component?: any;
    exact?: any;
    path?: string;
}

interface IModal {
    isShow?: boolean;
    className?: string;
    setIsShow?: any;
    backgroundColorOverlay?: string;
}

interface ISvg {
    width?: number;
    height?: number;
    onClick?: () => void;
}

interface INotiSuccess {
    isShow?: boolean;
    setIsShow?: any;
    message?: string;
    onClick?: () => void;
}

interface INotiOption {
    isShow?: boolean;
    setIsShow?: any;
    message?: string;
    btnLeft?: string;
    btnRight?: string;
    onClickBtnLeft?: () => void;
    onClickBtnRight?: () => void;
}