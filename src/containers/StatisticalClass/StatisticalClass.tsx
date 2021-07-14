import React, { useEffect } from "react";
import { Banner, Button, Modal } from "../../components/common";
import { PieChart } from "../../components";
import "./StatisticalClass.scss";
import { useState } from "react";
import { Color } from "../../constants";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { doGetCurrentUser } from "../../redux/action";
import { useHistory, useParams } from "react-router-dom";
import { doGetReportListAttendanceInSemester } from "../../redux/action/attendanceAction";
export const StatisticalClass = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const report = useAppSelector((state) => state.attendance.report);
  console.log("report", report);
  const [percentPresent, setPercentPresent] = useState(0);
  const [percentAbsent, setPercentAbsent] = useState(0);
  const [isShowViewPdf, setIsShowViewPdf] = useState(false);
  const { idClass } = useParams<{ idClass: string }>();

  const dispatch = useAppDispatch();
  const history = useHistory();

  // const dataAPI = {
  //   ClazzId: "ENG001",
  //   students: [
  //     { MSSV: "17521224", name: "Trần Anh Tuân", absent: 3, present: 10 },
  //     { MSSV: "17521284", name: "Huỳnh Hữu Ý", absent: 2, present: 10 },
  //     { MSSV: "17520973", name: "Lê Trần Duy Sang", absent: 3, present: 10 },
  //     { MSSV: "17521286", name: "Lê Thị Như Ý", absent: 1, present: 10 },
  //   ],
  //   present: 40,
  //   absent: 9,
  // };
  const data = {
    labels: ["Vắng", "Đi học"],
    datasets: [
      {
        label: "# of Votes",
        data: [report?.absent, report?.present],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const printPDF = () => {
    const input: any = document.getElementById("export-pdf");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf: any = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      pdf.save("Thống kê lớp ABC.pdf");
    });
  };

  useEffect(() => {
    if (!currentUser) {
      dispatch(doGetCurrentUser());
    }
    let x =
      Number(report.present * 100) / Number(report.present + report.absent);
    setPercentPresent(Math.round(x));
  }, []);
  useEffect(() => {
    setPercentAbsent(Number(100 - percentPresent));
  }, [percentPresent]);
  useEffect(() => {
    dispatch(doGetReportListAttendanceInSemester(idClass));
  }, []);

  return (
    <div className="StatisticalClass">
      <Banner title={`Thống kê tình trạng vắng học của lớp ${idClass}`} />
      <div className="StatisticalClass__content">
        <div className="StatisticalClass__chart">
          <PieChart
            data={data}
            className="StatisticalClass__piechart"
            title="Biểu đồ tình trạng vắng học"
          />
          {/* <div className="StatisticalClass__contain-percent">
            <span>Đi học: {percentPresent}%</span>
            <span style={{ marginTop: 10 }}>Vắng học: {percentAbsent}%</span>
          </div> */}
        </div>
        <div className="StatisticalClass__table">
          <p className="StatisticalClass__title-table">
            Danh sách thống kê từng học sinh
          </p>
          <table>
            <thead>
              <tr>
                <td>MSSV</td>
                <td>Họ tên</td>
                <td>Số buổi vắng</td>
                <td>Số buổi học</td>
                <td>Xem lịch sử</td>
              </tr>
            </thead>
            <tbody>
              {report.students.map((item, index) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.absent}</td>
                    <td>{item.present}</td>
                    <td
                      className="StatisticalClass__pointer"
                      onClick={() =>
                        history.push(`/historyAttendance/${item.id}/${idClass}`)
                      }
                    >
                      Xem
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="StatisticalClass__exportPDF">
            {/* <Button color={Color.Green} onClick={() => printPDF()}>
              Xuất PDF
            </Button> */}
            <Button color={Color.Green} onClick={() => setIsShowViewPdf(true)}>
              Xem trước PDF
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isShow={isShowViewPdf}
        setIsShow={setIsShowViewPdf}
        className="StatisticalClass__modal"
      >
        <div style={{ height: 500, overflowY: "auto" }}>
          <Button
            color={Color.Green}
            onClick={() => printPDF()}
            marginLeft={10}
            marginTop={10}
          >
            Xuất PDF
          </Button>
          <div className="StatisticalClass__pdf" id="export-pdf">
            <div className="StatisticalClass__cover-info-time">
              <div className="StatisticalClass__info-time">
                <p className="StatisticalClass__text-info-time">
                  Ngày xuất: {moment().format("DD-MM-YYYY hh:mm:ss")}
                </p>
                <p className="StatisticalClass__text-info-time StatisticalClass__text--margintop">
                  Người xuất: {currentUser.fullName}
                </p>
              </div>
            </div>
            <div className="StatisticalClass__title-pdf">
              <h2>BẢNG THỐNG KÊ TÌNH TRẠNG ĐI HỌC CỦA LỚP ABC</h2>
            </div>

            <table>
              <thead>
                <tr>
                  <td>MSSV</td>
                  <td>Họ tên</td>
                  <td>Số buổi vắng</td>
                  <td>Số buổi học</td>
                </tr>
              </thead>
              <tbody>
                {report.students.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.absent}</td>
                      <td>{item.present}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="StatisticalClass__text-sum" colSpan={2}>
                    Tổng
                  </td>
                  <td>{report.absent}</td>
                  <td>{report.present}</td>
                </tr>
              </tbody>
            </table>
            {/* <div className="StatisticalClass__total">
              <span>Tỉ lệ đi học chiếm: {percentPresent}%</span>
              <span className="StatisticalClass__text--margintop">
                Tỉ lệ vắng học chiếm: {percentAbsent}%
              </span>
            </div> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};
