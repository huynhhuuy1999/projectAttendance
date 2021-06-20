interface ICurrentUserInitialState {
    isLoading?: boolean;
    error?: any;
    currentUser: ICurrentUser;
}

interface ICourse {
    isLoading?: boolean,
    listCourse: Array<IListCourse>,
}
interface IClass {
    isLoading?: boolean,
    listClass?: Array,
    oneClass?: IResponseClass,
    listClassByTeacher?: Array,
    listClassByCourse?: Array,
}

interface IStudent {
    isLoading?: boolean,
    timeTableStudent?: Array<IResponseTimetableStudent>;
    listStudent: Array<ICurrentUser>;
    oneStudent: ICurrentUser;
}

interface ITeacher {
    isLoading?: boolean,
    timeTableTeacher?: Array<IResponseTimetableTeacher>;
    listTeacher: Array<ICurrentUser>
    oneTeacher: ICurrentUser;
}


interface IListCourse {
    id: string | number;
    name: string;
}

interface ICurrentUser {
    id: string;
    roles: Array<{ id: number, name: string }>;
    username?: string;
    email?: string;
    phone?: string;
    fullName?: string;
    birthday?: string;
    password?: string;
    address?: string;
}

interface ITimetableStudent {
    clazz: { id?: string }
}

interface IAttendance {
    isLoading?: boolean,
    error?: any;
    listPhotoAttendance: Array<IResPhotoAttendance>;
}
