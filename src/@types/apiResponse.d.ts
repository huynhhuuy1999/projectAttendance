interface IResponseTimetableStudent {
    id?: number,
    userId?: string,
    year?: number,
    semester?: number,
    status?: number,
    timeTableCourses: Array<IResponseTimeTableCourses>;
}

interface IResponseTimeTableCourses {
    id?: number;
    clazz?: IResponseClass;
    start?: number;
    end?: number;
    dayOfWeek?: number;
}
interface IResponseClass {
    id?: string;
    startDate?: string;
    endDate?: string;
    status?: number;
    numberStudent?: number;
    teacher?: IResponseTeacher
}

interface IResponseTeacher {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    fullName?: string;
    birthday?: string;
    roles?: Array<IResponseRole>
}

interface IResponseRole {
    id?: number;
    name?: string;
}