import { useState, useContext, useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { OnRun } from "../../../../config/config";
import { AccessContext } from "../../../../config/accessContext";
import { TabulatorFull as Tabulator } from "tabulator-tables";

const CompanyMoadian = () => {
  const [newCompany, setNewCompany] = useState({
    enable: false,
    name: "",
    idTax: "",
    key: "",
    idNum: "",
  });
  const access = useContext(AccessContext);

  const submit = () => {
    if (newCompany.name.length <= 3) {
      toast.warning("نام شرکت را درست وارد کنید", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (newCompany.idTax.length !== 6) {
      toast.warning("شناسه مالیاتی صحیح نیست", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (newCompany.idNum.length !== 11) {
      toast.warning("شناسه اقتصادی/ملی صحیح نیست", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (newCompany.key === "") {
      toast.warning("کلید خصوصی وارد نشده", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      const data = new FormData();
      data.append("key", newCompany.key);
      data.append("name", newCompany.name);
      data.append("idTax", newCompany.idTax);
      data.append("idNum", newCompany.idNum);
      data.append("access", access);
      axios
        .post(OnRun + "/addcompany", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.reply) {
            toast.success("ثبت شد", { position: toast.POSITION.BOTTOM_RIGHT });
            setNewCompany({
              enable: false,
              name: "",
              idTax: "",
              key: "",
              idNum: "",
            });
          } else {
            toast.warning(response.data.msg, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        });
    }
  };

  var rowMenu = [
    {
      label: "حذف",
      action: function (e, row) {
        axios
          .post(OnRun + "/delcompanymoadian", {
            access: access,
            row: row.getData(),
          })
          .then((response) => {
            toast.success("حذف شد", { position: toast.POSITION.BOTTOM_RIGHT });
            getDf();
          });
      },
    },
  ];

  const getDf = () => {
    axios
      .post(OnRun + "/getcompanymoadian", { access: access })
      .then((response) => {
        var table = new Tabulator("#data-table", {
          data: response.data.df,
          layout: "fitColumns",
          responsiveLayout: true,
          columnHeaderSortMulti: true,
          pagination: "local",
          paginationSize: 50,
          paginationSizeSelector: [10, 20, 50, 100, 200, 500],
          movableColumns: true,
          layoutColumnsOnNewData: false,
          textDirection: "rtl",
          autoResize: false,
          dataTree: true,
          dataTreeStartExpanded: false,
          height: "auto",
          rowContextMenu: rowMenu,
          columns: [
            {
              title: "نام",
              field: "name",
              hozAlign: "center",
              headerHozAlign: "center",
              resizable: true,
              widthGrow: 4,
              headerFilter: "input",
            },
            {
              title: "شناسه اقتصادی/ملی",
              field: "idNum",
              hozAlign: "center",
              headerHozAlign: "center",
              resizable: true,
              widthGrow: 4,
              headerFilter: "input",
            },
            {
              title: "شناسه حافظه مالیاتی",
              field: "idTax",
              hozAlign: "center",
              headerHozAlign: "center",
              resizable: true,
              widthGrow: 4,
              headerFilter: "input",
            },
            {
              title: "کلیدخصوصی",
              field: "key",
              hozAlign: "center",
              headerHozAlign: "center",
              resizable: true,
              widthGrow: 4,
              headerFilter: "input",
            },
            {
              title: "تاریخ ثبت",
              field: "date",
              hozAlign: "center",
              headerHozAlign: "center",
              resizable: true,
              widthGrow: 4,
              headerFilter: "input",
            },
          ],
        });
      });
  };

  useEffect(getDf, [access, newCompany.enable, rowMenu]);

  return (
    <div className="subPage tablePg">
      <ToastContainer autoClose={3000} />
      {newCompany.enable ? (
        <div className="popupInp">
          <div
            className="soul"
            onClick={() => setNewCompany({ ...newCompany, enable: false })}
          ></div>
          <div className="win">
            <fieldset>
              <label>نام شرکت</label>
              <input
                value={newCompany.name}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, name: e.target.value })
                }
              ></input>
            </fieldset>
            <fieldset>
              <label>شناسه حافظه مالیاتی</label>
              <input
                value={newCompany.idTax}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, idTax: e.target.value })
                }
              ></input>
            </fieldset>
            <fieldset>
              <label>شناسه اقتصادی/ملی</label>
              <input
                value={newCompany.idNum}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, idNum: e.target.value })
                }
              ></input>
            </fieldset>
            <fieldset>
              <label>کلید خصوصی</label>
              <input
                type="file"
                onChange={(e) =>
                  setNewCompany({ ...newCompany, key: e.target.files[0] })
                }
              ></input>
            </fieldset>
            <button onClick={submit}>ثبت</button>
          </div>
        </div>
      ) : null}
      <div className="tls">
        <h2 className="titlePage">مدیریت شرکت ها</h2>
        <p
          className="btntls"
          onClick={() => setNewCompany({ ...newCompany, enable: true })}
        >
          <span>
            <IoMdAddCircle />
          </span>
          افزودن
        </p>
      </div>
      <div id="data-table"></div>
    </div>
  );
};

export default CompanyMoadian;
