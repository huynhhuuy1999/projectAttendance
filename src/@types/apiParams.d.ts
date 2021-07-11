interface IParamLogin {
  password?: string;
  username?: string;
}
interface IParamTimeTableStudent {
  userId?: string;
  year?: number;
  semester?: number;
}
interface IParamCreateCourse {
  id?: string | number;
  name?: string;
}
interface IParamStudent {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  birthday?: string;
  password?: string;
  address?: string;
  roles?: Array<{ id: number }>;
}
interface IParamTeacher {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  birthday?: string;
  password?: string;
  address?: string;
  roles?: Array<{ id: number }>;
}

interface IParamUpdateUser {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  birthday?: string;
  password?: string;
  address?: string;
  roles?: Array<{ id: number }>;
}

interface IParamClass {
  id?: string | number;
  course?: { id: string };
  teacher?: { id: string };
  startDate?: string;
  endDate?: string;
  numberStudent?: number;
}

interface IParamClassByTeacher {
  userid?: string | number;
}

interface IParamUSer {
  id?: string | number;
}

interface IParamAttendance {
  student?: {
    id: string;
  };
  clazz?: {
    id: string;
  };
}

interface IParamFile {
  formData?: any;
  id?: string | number;
}
