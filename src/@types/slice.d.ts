interface ICurrentUserInitialState {
  isLoading?: boolean;
  error?: any;
  currentUser: ICurrentUser;
}

interface ICourse {
  isLoading?: boolean;
  listCourse: Array<IListCourse>;
  listCourseSearch: Array<IListCourse>;
}
interface IClass {
  isLoading?: boolean;
  listClass?: Array<IResponseClass>;
  listClassSearch?: Array<IResponseClass>;
  oneClass?: IResponseClass;
  listClassByTeacher?: Array<IResponseClass>;
  listClassByCourse?: Array;
}

interface ITeacher {
  isLoading?: boolean;
  timeTableTeacher?: Array<IResponseTimetableTeacher>;
  listTeacher: Array<ICurrentUser>;
  listTeacherSearch: Array<ICurrentUser>;
  oneTeacher: ICurrentUser;
}

interface IListCourse {
  id: string | number;
  name: string;
}

interface ICurrentUser {
  id: string;
  roles: Array<{ id: number; name: string }>;
  username?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  birthday?: string;
  password?: string;
  address?: string;
  parentId?: string;
}

interface ITimetableStudent {
  clazz: { id?: string };
}
