import { useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TableTeacher } from "../../components";
import {
  Banner,
  Button,
  NumberRow,
  Pagination,
  Search,
  NotiSuccess,
} from "../../components/common";
import { Modal } from "../../components/common/Modal/Modal";
import { Color } from "../../constants";
import { doDeleteUser, doGetListTeacher } from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import "./ListTeacher.scss";

export const ListTeacher = () => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const listTeacher = useSelector(
    (state: RootState) => state.teacher.listTeacher
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = listTeacher?.slice(
    firstOfIndexCurrentPage,
    endOfIndexCurrentPage
  );
  const [showModal, setShowModal] = useState(false);
  const [idTeacher, setIdTeacher] = useState("");
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [reload, setReload] = useState(false);
  const [role, setRole] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(doGetListTeacher());
  }, [reload]);
  useEffect(() => {
    if (currentUser.roles) {
      setRole(currentUser.roles[0].id);
    }
  }, [currentUser.roles]);
  const changePage = (number: number) => {
    setCurrentPage(number);
  };
  const changeNumber = (number: number) => {
    setPostPerPage(number);
    setCurrentPage(1);
  };

  const handleDeleteStudent = () => {
    setShowModal(false);
    dispatch(
      doDeleteUser({
        id: idTeacher,
      })
    ).then(() => {
      setReload(!reload);
      setIsShowModalSuccess(true);
    });
  };

  return (
    <div className="list-teacher">
      <Banner title="Danh sách giảng viên" />

      <div className="list-teacher__header">
        <div className="list-teacher__number-row">
          <NumberRow changeNumber={changeNumber} />
        </div>
        <div className="list-teacher__search">
          <Search placeholder="Nhập họ tên, mã số giảng viên" />
        </div>
        {role === 1 ? (
          <>
            <Button
              color={Color.Yellow}
              marginLeft={10}
              onClick={() => history.push("/updateteacher")}
            >
              Thêm giảng viên
            </Button>
            <Button
              marginLeft={10}
              color={Color.Green}
              onClick={() => history.push("/updateteacher")}
            >
              Thêm Excel
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="list-teacher__table">
        <TableTeacher
          data={currenPost}
          showModal={(id) => {
            setShowModal(true);
            setIdTeacher(id);
          }}
        />
      </div>
      <div className="list-teacher__pagination">
        <Pagination
          postPerPage={postPerPage}
          totalPost={listTeacher.length}
          changePage={changePage}
          currentPage={currentPage}
        />
      </div>
      <Modal isShow={showModal} setIsShow={setShowModal}>
        <div className="list-teacher__noti">
          <p>
            Bạn có chắc chắn muốn xóa giảng viên{" "}
            <span className="list-teacher__idStudent">{idTeacher}</span> không?
          </p>
          <div className="list-teacher__group-btn">
            <Button
              width={100}
              color={Color.Red}
              onClick={() => handleDeleteStudent()}
            >
              Xóa
            </Button>
            <Button
              onClick={() => setShowModal(false)}
              marginLeft={25}
              width={100}
              color={Color.Yellow}
            >
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
      <NotiSuccess
        isShow={isShowModalSuccess}
        setIsShow={setIsShowModalSuccess}
        message="Xóa giảng viên thành công"
        onClick={() => setIsShowModalSuccess(false)}
      />
    </div>
  );
};
