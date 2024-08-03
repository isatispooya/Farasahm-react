import { useState, useEffect, useContext } from "react";
import MiniLoader from "../../../../componet/Loader/miniLoader";
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import NoData from "../../../../componet/Loader/NoData";
import { exportPdf } from "../../../../config/exportPdf";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import ModalFilter from "../../../../componet/modalFilter";
import { AccessContext } from "../../../../config/accessContext";
import axios from "axios";
import { OnRun } from "../../../../config/config";
import Smspage from "../../../../componet/smspage";
import StepperSlide from "../../../../componet/stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CreateList = () => {
  const access = useContext(AccessContext);
  const [listConfig, setListConfig] = useState([]);
  const [Config, setConfig] = useState(null);
  const [df, setDf] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSender, setIsOpenSender] = useState(false);
  const [isOpenStepper, setIsOpenStepper] = useState(false);
  const [len, setLen] = useState(0);
  const [table, setTable] = useState(null); // New state for table

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
        light: "#64b5f6",
        dark: "#115293",
      },
      grey: {
        600: "#757575",
      },
    },
  });

  const getConfigList = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/marketinglist`,
      data: { access: access },
    }).then((response) => {
      setListConfig(response.data);
      setConfig(response.data[0]._id);
    });
  };

  const getDf = () => {
    if (Config) {
      axios({
        method: "POST",
        url: `${OnRun}/marketing/columnmarketing`,
        data: { access: access, _id: Config },
      }).then((response) => {
        console.log("log", response);
        setDf(response.data.dic);
        setColumns(response.data.columns);
        setLen(response.data.len);
      });
    }
  };

  useEffect(() => {
    if (df) {
      const newTable = new Tabulator("#data-table", {
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
        dataTreeStartExpanded: false,
        autoColumns: true,
      });

      setTable(newTable); // Set the table instance in state

      return () => {
        newTable.destroy(); // Clean up the table instance on unmount
      };
    }
  }, [df]);

  useEffect(getConfigList, []);
  useEffect(getDf, [Config]);

  const toggleModal = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const toggleModalSender = () => {
    setIsOpenSender(!isOpenSender);
  };

  const toggleStepperSlide = () => {
    setIsOpenStepper(!isOpenStepper); 
  };

  return (
    <div className="subPage tablePg">
      <div className="tls">
        <h2 className="titlePage">لیست</h2>
        <p onClick={exportPdf}>
          <BsFiletypePdf />
          <span>خروجی PDF</span>
        </p>
        <p
          onClick={() => {
            if (table) {
              table.download("csv", "data.csv");
            }
          }}
        >
          <BsFiletypeCsv />
          <span>خروجی CSV</span>
        </p>

        <div className="btntls">
          <button className="inp-fld" onClick={toggleModalSender}>
            ارسال
            <MdOutlineCreateNewFolder className="mt-1" />
          </button>
          <button className="inp-fld" onClick={toggleStepperSlide}>
            ایجاد
            <MdOutlineCreateNewFolder className="mt-1" />
          </button>
          <select value={Config} onChange={(e) => setConfig(e.target.value)}>
            {listConfig.map((i) => (
              <option key={i._id} value={i._id}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {isOpenFilter && (
          <ModalFilter
            toggleModal={toggleModal}
            getDf={getDf}
            access={access}
          />
        )}
      </div>
      <div>
        {isOpenSender && (
          <Smspage
            toggleModal={toggleModalSender}
            len={len}
            Config={Config}
            columns={columns}
            access={access}
          />
        )}
      </div>
      <div>
        {isOpenStepper && (
          <ThemeProvider theme={theme}>
            <StepperSlide
              toggleModal={toggleStepperSlide}
            />
          </ThemeProvider>
        )}
      </div>
      <div id="data-table"></div>
    </div>
  );
};

export default CreateList;
