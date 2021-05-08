interface IAvatar {
    image?: string;
    className?: string;
}
interface IBanner {
    title?: string;
}
interface IButton {
    className?: string;
    type?: any;
    isSecondaryBtn?: boolean;
    isThirBtn?: boolean;
    isOrderBtn?: boolean;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}
interface IDropdown {
    data: Array<{ value: number, label: string }>;
    className?: string;
    onChange: (event: React.FormEvent<HTMLDivElement>) => void;
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
}
interface ICardCourses {
    idCourse?: string | number;
    nameCourse?: string;
    numberClass?: number | string;
}
interface ICardClass {
    nameTeacher?: string;
    idClass?: string;
    numberStudent?: number | string;
    nameClass?: string;
    startTime?: string;
    endTime?: string;
    room?: string;
}
interface INumberRow {
    changeNumber: any;
}
interface IPagination {
    postPerPage: any;
    totalPost: number;
    changePage: any;
    currentPage: number;
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
    data: any;
}
interface IBlankLayout {
    children?: any;
}
interface ISibarLayout {

}
interface IScheduleStudent {
    data?: any;
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