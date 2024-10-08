import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../config/config'
import { BsPlusCircle,BsPersonLinesFill} from "react-icons/bs";
import { HiArchive} from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify'
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { useNavigate } from "react-router-dom";

const AttendeesAssembly = () =>{

    const [popUp, setPopUp] = useState(false)
    const access = useContext(AccessContext)
    const [idPersonal , setIdPersonal] = useState('')
    const [dataPersonal, setDataPersonal] = useState(null)
    const [df, setDf] = useState(null)
    const [setVote, setSetVote] = useState(false)
    const [DataVoteAssembly, setDataVoteAssembly] = useState([])
    const [controllerVotes, setControllerVotes] = useState({nc:'',opt:''})
    const navigate = useNavigate()


    const getDataVotes = () =>{
        axios.post(OnRun+'/getdatavotes', {access:access})
        .then(response=>{
                if (response.data.replay) {
                    setDataVoteAssembly(response.data.data)
                }else{
                    toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
        })
    }

    const handleAdd = ()=>{
        axios.post(OnRun+'/addvoteasemboly',{access:access,controllerVotes:controllerVotes})
        .then(response=>{
            if (response.data.replay) {
                setSetVote(false)
                personalInAssembly()
            }
        })
    }


    
    var rowMenu = [
        {
            label:"حذف",
            action:function(e, row){
                axios.post(OnRun+'/delpersonalassembly',{access:access,row:row.getData()['کد ملی']})
                .then(response=>{
                    toast.success('حذف شد',{position: toast.POSITION.BOTTOM_RIGHT})
                    personalInAssembly()

                })
            }
        },
        {
            label:"برگه ورود",
            action:function(e, row){
                window.open('/printas/'+access[1]+'/'+row.getData()['کد ملی'])
            }
        },
        {
            label:"ثبت رای",
            action:function(e, row){
                setSetVote(true)
                setControllerVotes({... controllerVotes,nc:row.getData()['کد ملی'],opt:DataVoteAssembly.controller[0]})
            }
        }
    ]


    const getPersonalData = () =>{
        if (idPersonal!='') {
            axios.post(OnRun+'/getpersonaldata',{idPersonal:idPersonal,access:access})
            .then(response =>{
                console.log(response.data);
                if(response.data.replay){
                    setDataPersonal(response.data.df)
                }else{
                    toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
        }else{
            toast.warning('کد ملی را وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }
    }

    const personalInAssembly = () =>{
        axios.post(OnRun+'/personalinassembly',{access:access})
        .then(response=>{
            if(response.data.replay){
                setDf(response.data.df)
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }
    const addPersonalAssembly = () =>{
        axios.post(OnRun+'/addpersonalassembly',{access:access,dataPersonal:dataPersonal})
        .then(response=>{
            if(response.data.replay){
                toast.success('افزوده شد',{position: toast.POSITION.BOTTOM_RIGHT})
                personalInAssembly()
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }





    if(df!=null){
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
            rowContextMenu: rowMenu,
            columns:[
                {title:"نام کامل", field:"fullName", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"کد ملی", field:"کد ملی", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},
                {title:"تاریخ تولد ", field:"تاریخ تولد", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"نام پدر ", field:"نام پدر", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"محل صدور ", field:"محل صدور", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"کد سهامداری", field:"کد سهامداری", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"input"},
                {title:"سهام کل", field:"سهام کل", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"input",topCalc:'sum'},
                {title:"درصد سهام", field:"rate", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"input",topCalc:'sum'},
                {title:"بازرس منتخب", field:"opt", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"list",headerFilterParams:{valuesLookup:true, clearable:true}},
            ],
        })
    }

    useEffect(personalInAssembly,[])
    useEffect(getDataVotes,[])
    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">برگزاری مجمع</h2>
                <div className="btntls">
                    <p className="" onClick={()=>{setPopUp(!popUp)}}><span><BsPlusCircle/></span>افزودن</p>
                    <p className="" onClick={()=>{window.open('/printas/sheetvotecontroller/'+access[1])}}><span><HiArchive/></span>گزارش بازرس</p>
                    <p className="" onClick={()=>{window.open('/printas/sheetinassembly/'+access[1])}}><span><BsPersonLinesFill/></span>گزارش حاضرین</p>
                </div>
            </div>
            {
                setVote==false?null:
                <div className="setVote">
                    <div>
                        <p>انتخاب بازرس</p>
                        <select onChange={(e)=>setControllerVotes({...controllerVotes,opt:e.target.value})}>
                            {
                                DataVoteAssembly.controller.map(i=>{
                                    return(
                                        <option value={i} key={i}>{i}</option>
                                    )
                                })
                            }
                        </select>
                    </div>                    
                    <button onClick={handleAdd}>ثبت</button>
                    <button onClick={()=>setSetVote(false)}>لغو</button>
                </div>
            }
            {
                popUp?
                <div className="PopUpTransactions AttendeesAssembly">
                    <div className="row">
                        <input type="number" className="idPersonal" value={idPersonal} onChange={(e)=>{setIdPersonal(e.target.value)}} placeholder="شماره/شناسه ملی"></input>
                        <button onClick={getPersonalData}>دریافت</button>
                        <button onClick={()=>setPopUp(false)}>لغو</button>

                    </div>
                    {
                        dataPersonal==null?null:
                        <>
                            <div className="dataPersonal">
                                <div className="field">
                                    <p>نام</p>
                                    <p>{dataPersonal['fullName']}</p>
                                </div>
                                <div className="field">
                                    <p>سهام کل</p>
                                    <p>{(dataPersonal['سهام کل']).toLocaleString()}</p>
                                </div>
                                <div className="field">
                                    <p>تاریخ تولد</p>
                                    <p>{dataPersonal['تاریخ تولد']}</p>
                                </div>
                                <div className="field">
                                    <p>شماره ثبت/شناسنامه</p>
                                    <p>{dataPersonal['شماره ثبت/شناسنامه']}</p>
                                </div>
                                <div className="field">
                                    <p>محل صدور</p>
                                    <p>{dataPersonal['محل صدور']}</p>
                                </div>
                                <div className="field">
                                    <p>نام پدر</p>
                                    <p>{dataPersonal['نام پدر']}</p>
                                </div>
                                <div className="field">
                                    <p>کد سهامداری</p>
                                    <p>{dataPersonal['کد سهامداری']}</p>
                                </div>
                            </div>
                            <div className="btns">
                                <button onClick={addPersonalAssembly}>ثبت حضور</button>
                                <button onClick={()=>window.open('/printas/'+access[1]+'/'+idPersonal)}>برگ ورود</button>
                            </div>
                        </>
                    }


                </div>
                :null
            }
            <div id="data-table"></div>

        </div>
    )
}


export default AttendeesAssembly