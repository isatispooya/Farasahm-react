import { useState, useEffect, useMemo } from "react";

import { OnRun } from "../config/config";
import axios from "axios";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import MiniLoader from "./Loader/miniLoader";
import NoData from "./Loader/NoData";

const AddGroup = (props) => {
  const [nameGroup, setNameGroup] = useState("");
  const handleEditMember = () => {
    console.log("name");
    if (nameGroup != "" && props.editGroupShow) {
      setTimeout(() => {
        console.log("codeChildren");
        tablesub.selectRow(props.editGroupShow._children.map((i) => i.code));
      }, 3000);
    }
  };
  if (props.codesDf.length > 0 && props.addGroupShow) {
    var tablesub = new Tabulator("#data-table-sub", {
      data: props.codesDf,
      layout: "fitColumns",
      responsiveLayout: true,
      columnHeaderSortMulti: true,
      pagination: "local",
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 50, 100, 200, 500],
      movableColumns: true,
      layoutColumnsOnNewData: false,
      textDirection: "rtl",
      autoResize: false,
      selectable: true,
      selectablePersistence: true,
      index: "کد",
      columns: [
        {
          title: "کد",
          field: "کد",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 4,
          headerFilter: "input",
        },
        {
          title: "نام",
          field: "نام",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 4,
          headerFilter: "input",
        },
        {
          title: "نام خانوادگی",
          field: "نام خانوادگی",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 4,
          headerFilter: "input",
        },
        {
          title: "محل صدور",
          field: "محل صدور",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 4,
          headerFilter: "input",
        },
        {
          title: "کد ملی",
          field: "کد ملی",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 4,
          headerFilter: "input",
        },
      ],
    });
    handleEditMember();
  }

  const setGrouping = () => {
    var rowSelected = tablesub.getSelectedData();
    if (nameGroup == "") {
      alert("نام گروه را پر کنید");
    } else if (rowSelected.length == 0) {
      alert("هیچ ردیفی انتخاب نشده است");
    } else {
      axios({
        method: "POST",
        url: OnRun + "/setgrouping",
        data: { access: props.access, name: nameGroup, members: rowSelected },
      }).then((response) => {
        if (response.data.replay) {
          props.setAddGroupShow(false);
        } else {
          alert(response.data.msg);
        }
      });
    }
  };

  const handleEdit = () => {
    if (props.editGroupShow) {
      setNameGroup(props.editGroupShow.name);
    }
  };

  useEffect(handleEdit, [props.codesDf, props.editGroupShow]);
  useEffect(handleEditMember, []);
  if (props.addGroupShow) {
    return (
      <div className="formPopUp">
        <div className="field">
          <input
            value={nameGroup}
            onChange={(e) => setNameGroup(e.target.value)}
            type="text"
            id="namegroup"
          />
          <label>نام گروه</label>
        </div>
        <div id="data-table-sub"></div>

        <div className="btnfield">
          <button onClick={setGrouping} className="btnfieldpos">
            ثبت
          </button>
          <button
            onClick={() => props.setAddGroupShow(false)}
            className="btnfieldneg"
          >
            لغو
          </button>
        </div>
      </div>
    );
  }
};

export default AddGroup;
