import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TableParent } from "../../components";
import {
  Banner,
  Button,
  NumberRow,
  Pagination,
  NotiSuccess,
  Search,
  NotiOption,
  Loader,
} from "../../components/common";
import { Color } from "../../constants";
import { doDeleteUser, doGetListParent } from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import { doSearchListParent } from "../../redux/slice/SliceAPI/parentSlice";
import { useAppDispatch } from "../../redux/store";
import "./ListParent.scss";

export const ListParent = () => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [idParent, setIdParent] = useState("");
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [reload, setReload] = useState(false);
  const history = useHistory();

  const listParent = useSelector((state: RootState) => state.parent.listParent);
  const listParentSearch = useSelector(
    (state: RootState) => state.parent.listParentSearch
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const endOfIndexCurrentPage = postPerPage * currentPage;
  const firstOfIndexCurrentPage = endOfIndexCurrentPage - postPerPage;
  const currenPost = listParentSearch?.slice(
    firstOfIndexCurrentPage,
    endOfIndexCurrentPage
  );
  const [role, setRole] = useState(0);
  const dispatch = useAppDispatch();

  const handleDeleteParent = () => {
    setShowModal(false);
    dispatch(
      doDeleteUser({
        id: idParent,
      })
    ).then(() => {
      setReload(!reload);
      setIsShowModalSuccess(true);
    });
  };

  const changePage = (number: number) => {
    setCurrentPage(number);
  };
  const changeNumber = (number: number) => {
    setPostPerPage(number);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      dispatch(doGetListParent());
      return;
    } else {
      let newListStudent = listParent.filter((item) => {
        return (
          item.fullName?.search(value) !== -1 || item.id.search(value) !== -1
        );
      });
      dispatch(doSearchListParent(newListStudent));
    }
  };

  useEffect(() => {
    setLoader(true);
    dispatch(doGetListParent()).then(() => setLoader(false));
  }, [reload]);
  useEffect(() => {
    if (currentUser.roles) {
      setRole(currentUser.roles[0].id);
    }
  }, [currentUser.roles]);

  return (
    <div className="list-parent">
      <Banner title="Danh s??ch ph??? huynh" />
      <div className="list-parent__header">
        <div className="list-parent__number-row">
          <NumberRow changeNumber={changeNumber} />
        </div>
        <div className="list-parent__search">
          <Search
            placeholder="Nh???p h??? t??n, m?? s??? ph??? huynh"
            search={(value) => handleSearch(value)}
          />
        </div>
        {role === 1 ? (
          <>
            <Button
              color={Color.Yellow}
              marginLeft={10}
              onClick={() => history.push("/createparent")}
            >
              Th??m ph??? huynh
            </Button>
            <Button
              color={Color.Green}
              marginLeft={10}
              // onClick={() => history.push("/updatestudent")}
            >
              Th??m Excel
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
      {loader ? (
        <Loader color={Color.Blue} />
      ) : (
        <>
          <div className="list-parent__table">
            <TableParent
              data={currenPost}
              showModal={(id) => {
                setShowModal(true);
                setIdParent(id);
              }}
            />
          </div>
          <div className="list-parent__pagination">
            <Pagination
              postPerPage={postPerPage}
              totalPost={listParentSearch.length}
              changePage={changePage}
              currentPage={currentPage}
            />
          </div>
        </>
      )}

      <NotiOption
        isShow={showModal}
        setIsShow={setShowModal}
        btnLeft="X??a"
        btnRight="H???y"
        onClickBtnLeft={() => {
          handleDeleteParent();
        }}
        onClickBtnRight={() => setShowModal(false)}
        message={`B???n c?? ch???c ch???n mu???n x??a ph??? huynh ${idParent} kh??ng?`}
      />

      <NotiSuccess
        isShow={isShowModalSuccess}
        setIsShow={setIsShowModalSuccess}
        message="X??a ph??? huynh th??nh c??ng"
        onClick={() => setIsShowModalSuccess(false)}
      />
    </div>
  );
};
