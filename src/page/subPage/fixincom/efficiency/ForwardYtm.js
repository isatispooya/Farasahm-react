
import { useState, useContext, useEffect } from "react"
import { AccessContext } from "../../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../../config/config'
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import DatePiBroker from "../../../../componet/datepicker/DatePiBroker"
import { exportPdf } from "../../../../config/exportPdf";
import { BsFiletypePdf, BsFiletypeCsv, BsArrowRepeat } from "react-icons/bs"
import LoaderCircle from "../../../../componet/Loader/LoadingCircle";


const ForwardYtm = () => {
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const [input, setInput] = useState({ target: 30, befor: 50, after: 50 })
    const [beforDay, setBeforday] = useState(1)
    const [afterDay, setAfterday] = useState(4)
    const access = useContext(AccessContext)
    const [dateSelection, setDateSelection] = useState(null)
    const [updateDataClicked, setUpdateDataClicked] = useState(false);
    const [table, setTable] = useState(null);



    const changeBeforDay = (day) => {
        if (day > 0 && day <= 5) {
            setBeforday(day)
        }
    }
    const changAfterDay = (day) => {
        if (day > 0 && day <= 5) {
            setAfterday(day)
        }
    }


    const handleBefor = (e) => {
        var bef = e.target.value
        var aft = input.after
        if (bef <= 100 && bef >= 0) {
            setInput({ ...input, befor: bef, after: 100 - bef })
        }
    }

    const handleAfter = (e) => {
        var aft = e.target.value
        if (aft <= 100 && aft >= 0) {
            setInput({ ...input, befor: 100 - aft, after: aft })
        }
    }


    const getDf = () => {
        setDf(null)
        axios.post(OnRun + '/getpriceforward', { access: access, target: input.target, befor: input.befor, after: input.after, afterDay: afterDay, beforDay: beforDay, date: dateSelection })
            .then(response => {
                setDf(response.data.df)
            })
    }

    const initializeTable = () => {
        if (df != null && !table) {
            const newTable = new Tabulator("#data-table", {
            });
            setTable(newTable);
        }
    };
    if (df != null && !table) {
        console.log(df);
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
            columns: [
                {
                    title:"خروجی",
                    columns:[
                        { title: "تاریخ", field: "dateInt", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input" },
                        { title: "روز", field: "week", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input" },
                        {
                            title: "وضعیت", field: "workday", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                if (value == false) {
                                    return ("<p class='holiday'>تعطیل</p>")
                                } else {
                                    return ("<p class='nonHoliday'>کاری</p>")
                                }
        
                            },
                        },
                        {
                            title: "قیمت پایانی", field: "real", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                return ("<p>" + (value).toLocaleString() + "</p>")
                            },
                        },
                        {
                            title: "قیمت پیش بینی", field: "final_price", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                return ("<p>" + (value).toLocaleString() + "</p>")
                            },
                        },
                        {
                            title: "انحراف", field: "diff_real", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                return ("<p>" + (value).toLocaleString() + "</p>")
                            },
                        },
                        {
                            title: "تغییر", field: "rate", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                return ("<p>" + (value).toLocaleString() + " %</p>")
                            },
                        },
        
                    ]
                },
                {
                    title:'مبنای محاسبه',
                    columns:[
                        {
                            title: "تغییرات روز کاری", field: "normal_grow", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                return ("<p>" + (value).toLocaleString() + " %</p>")
                            },
                        },
                        {
                            title: "تغییرات بعد تعطیلات", field: "after_diff", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                return ("<p>" + (value).toLocaleString() + " %</p>")
                            },
                        },
                        {
                            title: "تغییرات قبل تعطیلات", field: "befor_diff", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                return ("<p>" + (value).toLocaleString() + " %</p>")
                            },
                        },
                        {
                            title: "ضرب تغییرات روز", field: "diff_addon", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                return ("<p>" + (value).toLocaleString() + " %</p>")
                            },
                        },
                        {
                            title: "ضرب تغییرات کل", field: "diff_addon_cum", hozAlign: 'center', headerHozAlign: 'center', resizable: true, widthGrow: 4, headerFilter: "input",
                            formatter: function (cell, formatterParams) {
                                var value = cell.getValue();
                                return ("<p>" + (value).toLocaleString() + " %</p>")
                            },
                        },
        
                    ]
                },

                
            ],
        })
        setTable(newTable);

    }

    const destroyTable = () => {
        if (table) {
            table.destroy();
            setTable(null);
        }
    };


    useEffect(() => {
        if (updateDataClicked) {
            getDf();
            destroyTable();

            setUpdateDataClicked(false);
        }
    }, [updateDataClicked, input.after, input.befor, input.target, dateSelection]);

    useEffect(() => {
        if (!updateDataClicked) {
            getDf();
            initializeTable();
        }
    }, [input.after, input.befor, input.target, dateSelection]);

    const handleUpdateData = () => {
        setUpdateDataClicked(true);
    };

    return (
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">بازده آتی</h2>
                <div className="btntls">
                    <p className="inp-fld" onClick={handleUpdateData}>
                        درخواست
                        <BsArrowRepeat />
                    </p>
                    <div className="inp-fld">
                        <p>%</p>
                        <input max={100} min={0} value={input.target} onChange={(e) => setInput({ ...input, target: e.target.value })} type="number" placeholder="نرخ هدف"></input>
                        <p>هدف</p>
                    </div>
                    <div className="inp-fld">
                        <p>%</p>
                        <input max={100} min={0} value={input.befor} onChange={(e) => handleBefor(e)} type="number" placeholder="نرخ هدف"></input>
                        <p>قبل تعطیلات</p>
                    </div>
                    <div className="inp-fld">
                        <p>%</p>
                        <input max={100} min={0} value={input.after} onChange={(e) => handleAfter(e)} type="number" placeholder="نرخ هدف"></input>
                        <p>بعد تعطیلات</p>
                    </div>
                    <div className="inp-fld">
                        <p>روز</p>
                        <input max={5} min={1} value={beforDay} onChange={(e) => changeBeforDay(e.target.value)} type="number" placeholder="روز"></input>
                        <p>اثر قبل تعطیلات</p>
                    </div>
                    <div className="inp-fld">
                        <p>روز</p>
                        <input max={5} min={1} value={afterDay} onChange={(e) => changAfterDay(e.target.value)} type="number" placeholder="روز"></input>
                        <p>اثر بعد تعطیلات</p>
                    </div>
                    <div className="inp-fld">
                        <DatePiBroker setDateSelection={setDateSelection} />
                        <p>مبدا محاسبه</p>
                    </div>
                    <p onClick={() => { table.download("csv", "data.csv") }}><BsFiletypeCsv /><span>خروجی CSV</span></p>
                </div>
            </div>
            <LoaderCircle loading={df==null} />
            <div id="data-table"></div>
        </div>
    )
}

export default ForwardYtm