import { useState, useContext, useEffect } from "react"
import { AccessContext } from "../../../../config/accessContext";
import { ToastContainer } from "react-toastify";
import { IoReloadSharp } from "react-icons/io5";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa'
import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";
import { OnRun } from "../../../../config/config";
import LoaderCircle from "../../../../componet/Loader/LoadingCircle";
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { GoLinkExternal } from "react-icons/go";
import { Box, Chip, Modal, Stack, Typography } from "@mui/material";
import { getCookie, setCookie } from "../../../../componet/cookie/cookie";


const Bank = () => {
    const access = useContext(AccessContext)
    const [loading, setLoading] = useState(false)
    const [toDay, setsetToday] = useState(new Date)
    const [effective, setEffective] = useState([])
    const [showEffective, setShowEffective] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {

        if (JSON.parse(getCookie('eff')).length) {
            setEffective(JSON.parse(getCookie('eff')))
        console.log('sss',JSON.parse(getCookie('eff')));


        }
    }, [])

    useEffect(() => {
        setCookie('eff', JSON.stringify(effective), 60)

    }, [effective])

    var rowMenu = [
        {
            label: 'افزودن/حذف به حساب های غیر موثر',
            action: (e, row) => {
                if (row.getData()['Acc_Code'].length > 0) {
                    var casebank = { 'bank': row.getData()['bank'], 'Acc_Code': row.getData()['Acc_Code'] }
                    setEffective((prevItems) => {
                        const itemIndex = prevItems.findIndex((i) => i.Acc_Code === casebank.Acc_Code);
                        if (itemIndex !== -1) {
                            return prevItems.filter((i) => i.Acc_Code !== casebank.Acc_Code);
                        } else {
                            return [...prevItems, casebank];
                        }
                    })
                }
            }
        }
    ]

    const DropEffective = (item) => {
        setEffective((prevItems) => {
            const itemIndex = prevItems.findIndex((i) => i.Acc_Code === item.Acc_Code);
            if (itemIndex !== -1) {
                return prevItems.filter((i) => i.Acc_Code !== item.Acc_Code);
            }
            return prevItems;
        })
    }

    const getdf = () => {
        setLoading(true)
        axios.post(OnRun + '/getaccbank', { access: access, toDay: toDay, effective: effective })
            .then(response => {
                setLoading(false)
                if (response.data.reply) {
                    var table = new Tabulator("#data-table", {
                        data: response.data.df,
                        layout: "fitColumns",
                        responsiveLayout: true,
                        columnHeaderSortMulti: true,
                        pagination: "local",
                        paginationSize: 1000,
                        paginationSizeSelector: [10, 20, 50, 100, 200, 500, 1000],
                        movableColumns: true,
                        layoutColumnsOnNewData: false,
                        textDirection: "rtl",
                        autoResize: false,
                        dataTree: true,
                        dataTreeStartExpanded: true,
                        rowContextMenu: rowMenu,
                        columns: [
                            { title: "گروه", field: "Name", hozAlign: 'center', widthGrow: 4, headerHozAlign: 'center', resizable: true, headerFilter: "input" },
                            { title: "حساب", field: "bank", hozAlign: 'center', widthGrow: 5, headerHozAlign: 'center', resizable: true, headerFilter: "input" },
                            { title: "موثر", field: "eff", hozAlign: 'center', widthGrow: 1, headerHozAlign: 'center', resizable: true, headerFilter: "input", formatter: "tickCross" },
                            { title: "کد", field: "Acc_Code", hozAlign: 'center', widthGrow: 3, headerHozAlign: 'center', resizable: true, headerFilter: "input" },
                            {
                                title: "مانده", field: "balance", hozAlign: 'center', widthGrow: 4, headerHozAlign: 'center', resizable: true, headerFilter: "input",
                                formatter: function (cell, formatterParams) {
                                    var value = cell.getValue();
                                    return ("<div class='StocksTableChartContiner'><p>" + (value * 1).toLocaleString() + "</p></div>")
                                },
                            },
                        ]
                    })
                }
            })
    }

    return (
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">موجودی بانک ها</h2>
                <div className="btntls">
                    <p onClick={getdf} className=""><span><IoReloadSharp /></span>بارگزاری</p>
                    <p className=""><span><BsInfoCircle /></span>راهنمایی</p>
                    <div className='datefromto'>
                        <DatePicker
                            value={toDay}
                            calendar={persian}
                            locale={persian_fa}
                            className="purple"
                            inputClass="custom-input"
                            onChange={(dt) => setsetToday(dt)}
                        />
                    </div>
                    <p className="" onClick={() => setShowEffective(!showEffective)}><span><GoLinkExternal /></span>حساب های غیر موثر : {(effective.length).toLocaleString()}</p>
                </div>
            </div>
            <LoaderCircle loading={loading} />
            <div id="data-table"></div>
            <Modal
                open={showEffective}
                onClose={() => setShowEffective(false)}
                aria-labelledby="bankEffective"
                aria-describedby="bankEffective"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        حساب های بانکی غیر موثر
                    </Typography>
                    {effective.length > 0 ?
                        <Stack direction="column" spacing={1}>
                            {effective.map(j => (
                                <Chip key={j.Acc_Code} label={j.bank} onDelete={() => DropEffective(j)} />
                            ))}
                        </Stack>
                        :
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            موردی یافت نشد
                        </Typography>
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default Bank
