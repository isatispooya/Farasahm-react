// import { useState, useEffect, useContext } from "react";
// import MiniLoader from "../../../../componet/Loader/miniLoader";
// import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
// import NoData from "../../../../componet/Loader/NoData";
// import { exportPdf } from "../../../../config/exportPdf";
// import { TabulatorFull as Tabulator } from "tabulator-tables";
// import { MdOutlineCreateNewFolder } from "react-icons/md";
// import ModalFilter from "../../../../componet/modalFilter";
// import { AccessContext } from "../../../../config/accessContext";
// import axios from "axios";
// import { OnRun } from "../../../../config/config";
// import Smspage from "../../../../componet/smspage";

// const CreateList = () => {
//   const access = useContext(AccessContext);
//   const [listConfig, setListConfig] = useState([]);
//   const [Config, setConfig] = useState(null);
//   const [df, setDf] = useState(null);
//   const [columns, setcolumns] = useState([]);
//   const [isOpenFilter, setIsOpenFilter] = useState(false);
//   const [isOpenSender, setIsOpenSender] = useState(false);
//   const [len, setLen] = useState(0);
//   const getConfigList = () => {
//     axios({
//       method: "POST",
//       url: OnRun + "/marketing/marketinglist",
//       data: { access: access },
//     }).then((response) => {
//       setListConfig(response.data);
//       setConfig(response.data[0]._id);
//     });
//   };

//   const getDf = () => {
//     if (Config) {
//       axios({
//         method: "POST",
//         url: OnRun + "/marketing/columnmarketing",
//         data: { access: access, _id: Config },
//       }).then((response) => {
//         console.log("log", response);
//         setDf(response.data.dic);
//         setcolumns(response.data.columns);
//         setLen(response.data.len);
//       });
//     }
//   };

//   var table;

//   useEffect(() => {
//     if (df) {
//       table = new Tabulator("#data-table", {
//         data: df,
//         layout: "fitColumns",
//         responsiveLayout: true,
//         columnHeaderSortMulti: true,
//         pagination: "local",
//         paginationSize: 50,
//         paginationSizeSelector: [10, 20, 50, 100, 200, 500],
//         movableColumns: true,
//         layoutColumnsOnNewData: false,
//         textDirection: "rtl",
//         autoResize: false,
//         dataTree: true,
//         dataTreeStartExpanded: false,
//         autoColumns: true,
//       });

//       return () => {
//         table.destroy();
//       };
//     }
//   }, [df]);
//   useEffect(getConfigList, []);
//   useEffect(getDf, [Config]);

//   const toggleModal = () => {
//     setIsOpenFilter(!isOpenFilter);
//   };
//   const toggleModalSender = () => {
//     setIsOpenSender(!isOpenSender);
//   };

//   return (
//     <div className="subPage tablePg">
//       <div className="tls">
//         <h2 className="titlePage">لیست</h2>
//         <p onClick={exportPdf}>
//           <BsFiletypePdf />
//           <span>خروجی PDF</span>
//         </p>
//         <p
//           onClick={() => {
//             table.download("csv", "data.csv");
//           }}
//         >
//           <BsFiletypeCsv />
//           <span>خروجی CSV</span>
//         </p>

//         <div className="btntls">
//           <button className="inp-fld" onClick={toggleModalSender}>
//             ارسال
//             <MdOutlineCreateNewFolder className="mt-1" />
//           </button>
//           <button className="inp-fld" onClick={toggleModal}>
//             ایجاد
//             <MdOutlineCreateNewFolder className="mt-1" />
//           </button>
//           <select value={Config} onChange={(e) => setConfig(e.target.value)}>
//             {listConfig.map((i) => (
//               <option key={i._id} value={i._id}>
//                 {i.title}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div>
//         {isOpenFilter && (
//           <ModalFilter
//             toggleModal={toggleModal}
//             getDf={getDf}
//             access={access}
//           />
//         )}
//       </div>
//       <div>
//         {isOpenSender && (
//           <Smspage
//             toggleModal={toggleModalSender}
//             len={len}
//             Config={Config}
//             columns={columns}
//             access={access}
//           />
//         )}
//       </div>
//       <div id="data-table"></div>
//     </div>
//   );
// };

// export default CreateList;
/* eslint-disable react-hooks/exhaustive-deps */
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
import Title from "../../../../componet/title";
import { ThemeProvider } from "styled-components";

const CreateList = () => {
  const access = useContext(AccessContext);
  const [listConfig, setListConfig] = useState([]);
  const [Config, setConfig] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [df, setDf] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSender, setIsOpenSender] = useState(false);
  const [isOpenTitle, setIsOpenTitle] = useState(false);
  const [len, setLen] = useState(0);

  const getConfigList = () => {
    axios({
      method: "POST",
      url: OnRun + "/marketing/marketinglist",
      data: { access: access },
    }).then((response) => {
      setListConfig(response.data);
      console.log("getConfigList", response.data);
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
      url: OnRun + "/marketing/addconfig",
      data: requestData,
    })
      .then((response) => {
        getConfigList(); // بروزرسانی لیست پس از افزودن آیتم جدید
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
      method: "DELETE",
      url: OnRun + "/marketing/deleteconfig",
      headers: { Authorization: `Bearer ${token}` },
      data: requestData,
    })
      .then((response) => {
        getConfigList(); // بروزرسانی لیست پس از حذف آیتم
        setSelectedItem(null);
        setConfig(null);
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

    deletTime(item); // فراخوانی تابع حذف برای هماهنگی با بک‌اند
  };

  const handleOptionClick = (item) => {
    const selectedConfig = listConfig.find((config) => config.title === item);
    setSelectedItem(item);
    setConfig(selectedConfig?._id || null);
  };

  var table;

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
        <p onClick={() => table.download("csv", "data.csv")}>
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
          <button className="inp-fld" onClick={toggleTitleModal}>
            عنوان
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
            addNewItem={addNewItem} // تابع افزودن آیتم جدید
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
