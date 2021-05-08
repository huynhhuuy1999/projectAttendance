
interface ICurrentUserInitialState {
    isLoading?: boolean;
    error?: any;
    currentUser: ICurrentUser;
    timeTableStudent: IResponseTimetableStudent
}

interface ICurrentUser {
    id: string;
    roles: Array<{ id: number, name: string }>;
    username?: string;
    email?: string;
    phone?: string;
    fullName?: string;
    birthday?: string;
}

interface ITimetableStudent {
    clazz: { id?: string }
}