import { useState, useEffect, useContext, useRef } from "react";
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
import Title from "../../../../componet/title";
import StepperSlide from "../../../../componet/stepper";
import { ThemeProvider } from "styled-components";

const CreateList = () => {
  const access = useContext(AccessContext);
  const [listConfig, setListConfig] = useState([]);
  const [isOpenStepper, setIsOpenStepper] = useState(false);
  const [Config, setConfig] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [df, setDf] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSender, setIsOpenSender] = useState(false);
  const [isOpenTitle, setIsOpenTitle] = useState(false);
  const [len, setLen] = useState(0);
  const [titleList,setTitleList]=useState('');
  const [table, setTable] = useState(null); 
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);


  // تعریف متغیر table
console.log('message',message);


  const getConfigList = () => {
    axios({
      method: "POST",
      url: OnRun + "/marketing/marketinglist",
      data: { access: access },
    }).then((response) => {
      setListConfig(response.data);
      console.log("getConfigList", response.data);
      setTitleList(response.data)
      setConfig(response.data[0]?._id);
      setSelectedItem(response.data[0]?.title);
    });
  };

  const getDf = () => {
    if (Config) {
      axios({
        method: "POST",
        url: OnRun + "/marketing/columnmarketing",
        data: { access: access, _id: Config },
      }).then((response) => {
        setDf(response.data.dic);
        setColumns(response.data.columns);
        console.log("getDf", getDf);
        setLen(response.data.len);
      });
    }
  };

  const addNewItem = async (newItemTitle) => {
    const requestData = {
      access: access,
      title: newItemTitle,
    };

    axios({
      method: "POST",
      url: OnRun + "/marketing/marketinglist",
      data: requestData,
    })
      .then((response) => {
        getConfigList();
        setSelectedItem(newItemTitle);
        setConfig(response.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletTime = async (item) => {
    console.log(item);
    const requestData = {
      access: access,
      title: item,
    };

    axios({
      method: "Post",
      url: OnRun + "/marketing/deleteconfig",
      data: requestData,
    })
      .then((response) => {
        getConfigList(); 
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = (item) => {
    const updatedList = listConfig.filter((config) => config.title !== item);
    setListConfig(updatedList);

    if (item === selectedItem) {
      setSelectedItem(updatedList[0]?.title || null);
      setConfig(updatedList[0]?._id || null);
    }

    deletTime(item);
  };

  const handleOptionClick = (item) => {
    const selectedConfig = listConfig.find((config) => config.title === item);
    setSelectedItem(item);
    setConfig(selectedConfig?._id || null);
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
  const toggleTitleModal = () => {
    setIsOpenTitle(!isOpenTitle);
  };

  const toggleStepperSlide = () => {
    setIsOpenStepper(!isOpenStepper); // تغییر به isOpenStepper
  };

  const handleWordSelect = (word) => {
    setMessage((prevMessage) => prevMessage + " " + word + " ");
    textareaRef.current.focus();
  };

  const theme = {
    colors: {
      primary: "#6200ee",
      background: "#ffffff",
      surface: "#ffffff",
      error: "#B00020",
      text: "#000000",
      onPrimary: "#ffffff",
      onSecondary: "#000000",
      onBackground: "#000000",
      onSurface: "#000000",
      onError: "#ffffff",
    },
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
          <select
            value={Config}
            onChange={(e) => handleOptionClick(e.target.options[e.target.selectedIndex].text)}
          >
            {listConfig.map((i) => (
              <option key={i._id} value={i._id}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {df === null ? <MiniLoader /> : df === false ? <NoData /> : null}

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
        {isOpenTitle && (
          <Title
            listConfig={listConfig.map((i) => i.title)} 
            selectedItem={selectedItem}
            handleDeleteItem={handleDeleteItem}
            handleOptionClick={handleOptionClick}   
            addNewItem={addNewItem}    
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
            message={message}
            setMessage={setMessage}
            handleWordSelect={handleWordSelect}
            textareaRef={textareaRef}
          />
        )}
      </div>
      <div>
        {isOpenStepper && (
          <ThemeProvider theme={theme}>
            <StepperSlide
            titleList={titleList}
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

