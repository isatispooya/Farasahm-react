import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BsArrowRepeat } from "react-icons/bs";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import MiniLoader from "../../../../componet/Loader/miniLoader";
import { AccessContext } from "../../../../config/accessContext";
import { OnRun } from "../../../../config/config";
import InvoiceDetail from "./InvoiceDetail";

const Invoices = () => {
  const [df, setDf] = useState(null);
  const access = useContext(AccessContext);
  const tableRef = useRef(null);
  const [seller, setSeller] = useState([]);
  const [sellerSelected, setSellerSelected] = useState("");
  const [invoiceDetail, setInvoiceDetail] = useState(null);
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  const getDf = () => {
    setLoading(true);
    axios
      .post(OnRun + "/moadian/getinvoice", {
        access: access,
        seller: sellerSelected,
      })
      .then((response) => {
        if (response.data.reply) {
          setDf(response.data.df);
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch data", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const rowMenu = [
    {
      label: "مشاهده",
      action: function (e, row) {
        axios
          .post(OnRun + "/moadian/detail", {
            access: access,
            id: row.getData()["_id"],
          })
          .then((response) => {
            if (response.data.reply) {
              setInvoiceDetail(response.data.df);
              setShowInvoiceDetail(true); // Show the InvoiceDetail component
            } else {
              toast.warning(response.data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          });
      },
    },
    {
      label: "کپی گرفتن",
      action: function (e, row) {
        axios
          .post(OnRun + "/moadian/cloninvoce", {
            access: access,
            id: row.getData()["_id"],
          })
          .then((response) => {
            if (response.data.reply) {
              toast.success("کپی گرفته شد", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            } else {
              toast.warning(response.data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          });
      },
    },
    {
      label: "چاپ",
      action: function (e, row) {
        axios
          .post(
            OnRun + "/moadian/print",
            { access: access, id: row.getData()["_id"] },
            { responseType: "blob" }
          )
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "invoice.png");
            document.body.appendChild(link);
            link.click();
          });
      },
    },
    {
      label: "حذف",
      action: function (e, row) {
        axios
          .post(OnRun + "/moadian/delinvoice", {
            access: access,
            id: row.getData()["_id"],
          })
          .then((response) => {
            if (response.data.reply) {
              toast.success("حذف شد", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              getDf(); // Refresh data after deletion
            } else {
              toast.success(response.data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          });
      },
    },
    {
      label: "ارسال",
      action: function (e, row) {
        axios
          .post(OnRun + "/sendinvoce", {
            access: access,
            id: row.getData()["_id"],
          })
          .then((response) => {
            if (response.data.reply) {
              toast.success("ارسال شد", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              getDf();
            }
          });
      },
    },
    {
      label: "استعلام",
      action: function (e, row) {
        axios
          .post(OnRun + "/inquiryinvoce", {
            access: access,
            id: row.getData()["_id"],
          })
          .then((response) => {
            if (response.data.reply) {
              toast.success("ارسال شد", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              getDf();
            } else {
              toast.success(response.data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          });
      },
    },
    {
      label: "ابطال",
      action: function (e, row) {
        axios
          .post(OnRun + "/moadian/cloninvoiceebtal", {
            access: access,
            id: row.getData()["_id"],
          })
          .then((response) => {
            if (response.data.reply) {
              toast.success("ارسال شد", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              getDf();
            } else {
              toast.success(response.data.msg, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          });
      },
    },
  ];

  const SellerCompany = () => {
    axios
      .post(OnRun + "/moadian/getSellerMoadian", { access: access })
      .then((response) => {
        setSeller(response.data.df);
        if (response.data.df.length > 0) {
          setSellerSelected(response.data.df[0].idNum);
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch sellers", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  useEffect(() => {
    SellerCompany();
  }, []);

  useEffect(() => {
    if (df != null) {
      tableRef.current = new Tabulator("#data-table", {
        data: df,
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
        dataTreeStartExpanded: true,
        rowContextMenu: rowMenu,

        columns: [
          {
            title: "شناسه",
            field: "_id",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 1,
            headerFilter: "input",
          },
          {
            title: "عنوان",
            field: "name",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 6,
            headerFilter: "input",
          },
          {
            title: "شناسه یکتا",
            field: "taxid",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 4,
            headerFilter: "input",
          },
          {
            title: "تاریخ صدور",
            field: "indatim",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 2,
            headerFilter: "input",
          },
          {
            title: "تاریخ ایجاد",
            field: "indati2m",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 2,
            headerFilter: "input",
          },
          {
            title: "شناسه فروشنده",
            field: "tinb",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 3,
            headerFilter: "input",
          },
          {
            title: "قبل از تخفیف",
            field: "tprdis",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 4,
            headerFilter: "input",
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return "<p>" + (value * 1).toLocaleString() + "</p>";
            },
          },
          {
            title: "ارزش افزوده",
            field: "tvam",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 4,
            headerFilter: "input",
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return "<p>" + (value * 1).toLocaleString() + "</p>";
            },
          },
          {
            title: "کل صورت حساب",
            field: "tbill",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 4,
            headerFilter: "input",
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return "<p>" + (value * 1).toLocaleString() + "</p>";
            },
          },
          {
            title: "تعداد ردیف",
            field: "lenBody",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 4,
            headerFilter: "input",
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return "<p>" + (value * 1).toLocaleString() + "</p>";
            },
          },
          {
            title: "نتیجه",
            field: "result",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 4,
            headerFilter: "input",
          },
        ],
      });
    }
  }, [df]);

  return (
    <div className="subPage tablePg">
      <ToastContainer autoClose={3000} />

      <div className="tls">
        <h2 className="titlePage">لیست صورت حساب ها</h2>
        <div className="btntls">
          <button className="inp-fld" onClick={getDf}>
            درخواست
            <BsArrowRepeat />
          </button>
          <select
            value={sellerSelected}
            onChange={(e) => setSellerSelected(e.target.value)}
          >
            {seller.map((i) => (
              <option key={i.idNum} value={i.idNum}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading && <MiniLoader />}
      <div id="data-table"></div>
      {showInvoiceDetail && (
        <InvoiceDetail
          invoiceDetail={invoiceDetail}
          onClose={() => setShowInvoiceDetail(false)}
        />
      )}
    </div>
  );
};

export default Invoices;

