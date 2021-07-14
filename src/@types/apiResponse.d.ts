interface IResponseTimetableStudent {
  id?: number;
  userId?: string;
  year?: number;
  semester?: number;
  status?: number;
  dayOfWeek?: number;
  timeTableCourses: Array<IResponseTimeTableCourses>;
}

interface IResponseTimetableTeacher {
  id?: number;
  userId?: string;
  year?: number;
  semester?: number;
  status?: number;
  dayOfWeek?: number;
  timeTableCourses: Array<IResponseTimeTableCourses>;
}

interface IResponseTimeTableCourses {
  id?: number;
  clazz?: IResponseClass;
  start: number;
  end: number;
}
interface IResponseClass {
  id?: string;
  startDate?: string;
  endDate?: string;
  status?: number;
  numberStudent?: number;
  teacher?: IResponseTeacher;
  course?: IResponseCourse;
}

interface IResponseTeacher {
  id: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  fullName?: string;
  birthday?: string;
  roles: Array<IResponseRole>;
}

interface IResponseRole {
  id?: number;
  name?: string;
}
interface IResponseCourse {
  id?: string;
  name?: string;
}
interface IResponseListClass {
  id?: string;
  startDate?: string;
  endDate?: string;
  numberStudent?: number;
  status?: number;
  teacher?: IResponseTeacher;
  course?: IResponseCourse;
}

interface IResponseStudent {
  id: string;
  roles: Array<{ id: number; name: string }>;
  username?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  birthday?: string;
  password?: string;
  parentId?: string;
}

interface IResponseParent {
  id: string;
  roles: Array<{ id: number; name: string }>;
  username?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  birthday?: string;
  password?: string;
}

interface IResTeacher {
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

interface IResPhotoAttendance {
  id?: number;
  title?: string;
  image?: string;
  createAt?: string;
}

interface IResInfoAttandance {
  id?: string | number;
  time?: string;
  status?: number;
  student?: ICurrentUser;
  photos?: IResPhotoAttendance;
  clazz?: IResponseClass;
  photoUrl?: string;
}
