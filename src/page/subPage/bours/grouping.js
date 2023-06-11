import { BsPlusCircle } from "react-icons/bs";
import AddGroup from "../../../componet/AddGroup";
import { useState , useContext, useEffect} from "react";
import { AccessContext }from '../../../config/accessContext'
import axios from "axios";
import { OnRun } from "../../../config/config";
import MiniLoader from "../../../componet/Loader/miniLoader";
import NoData from "../../../componet/Loader/NoData";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";
import MsgDelete from "../../../componet/MsgDelete";

const Grouping = () =>{
    const [addGroupShow, setAddGroupShow] = useState(false)
    const [editGroupShow, setEditGroupShow] = useState(null)
    const access = useContext(AccessContext)
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const [MsgDelData, setMsgDelData] = useState({msg:'',comfrmation:false,ditail:null})
    const [codes , setCodes] = useState([])

    const getCodes = () =>{
            axios({method:'POST', url:OnRun+'/getallnameplus',data:{access:access}
            }).then(response=>{
                if(response.data.replay){
                    setCodes(response.data.df)
                }
            })
    }


    var rowMenu = [
        {
            label:"حذف",
            action:function(e, row){
                var rowData = row.getData()
                if (rowData.fullname!=''){alert('اعضای گروه را نمیتوانید حذف کنید برای تغییر در گروه میبایست آن را ویرایش کنید')
                }else{setMsgDelData({...MsgDelData,msg:`آیا از حذف گروه "${rowData.name}" مطمعن هستید؟`,ditail:rowData})}
            }
        },
        {
            label:"ویرایش",
            action:function(e, row){
                var rowData = row.getData()
                df.forEach(i => {if(i.name==rowData.name){setEditGroupShow(i)}});
                setAddGroupShow(true)
            }
        }
    ]


    if(df!=null && df!=[]){
        var table = new Tabulator("#data-table", {
            data:df,
            layout:"fitColumns",
            responsiveLayout:true,
            columnHeaderSortMulti:true,
            pagination:"local",
            paginationSize:50,
            paginationSizeSelector:[10, 20, 50, 100, 200,500],
            movableColumns:true,
            layoutColumnsOnNewData:false,
            textDirection:"rtl",
            autoResize:false,
            dataTree:true,
            dataTreeStartExpanded:false,
            height:'auto',
            rowContextMenu: rowMenu,
            columns:[
                {title:"نام گروه", field:"name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"معامله گر", field:"fullname", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"کد", field:"code", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"تعداد", field:"len", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"درصد مالکیت", field:"درصد مالکیت", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"%</p>")
                    },
                },
                {title:"تعداد سهام", field:"سهام کل", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.stock)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
            ],
        })
    }


    const getDf = () =>{
        axios({method:'POST', url:OnRun+'/getgrouping',data:{access:access}
        }).then(response=>{
            if(response.data.replay){
                setDf(response.data.df)
                setDic(response.data.dic)
            }else{
                setDf([])
            }
        })
    }
    const delRow = () =>{
        if (MsgDelData.comfrmation && MsgDelData.ditail) {
            axios({method:'POST',url:OnRun+'/delrowgrouping',data:{ditail:MsgDelData.ditail,access:access}
            }).then(response=>{
                    alert('حذف شد')
                    getDf()
            })
        }

    }


    useEffect(getDf,[addGroupShow,MsgDelData])
    useEffect(delRow,[MsgDelData])
    useEffect(getCodes,[])
    
    return(
        <div className="subPage tablePg">
            <AddGroup codesDf={codes} editGroupShow={editGroupShow} access={access} addGroupShow={addGroupShow} setAddGroupShow={setAddGroupShow}/>
            <MsgDelete MsgDelData={MsgDelData} setMsgDelData={setMsgDelData}/>
            <div className="tls">
                <h2 className="titlePage">گروه بندی</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
                <p className="btntls" onClick={()=>{setAddGroupShow(true)}}><span><BsPlusCircle/></span>افزودن</p>
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            <div id="data-table"></div>
        </div>
    )
}


export default Grouping