import axios from "axios"
import { OnRun } from "../../../../config/config";
import { useState , useContext, useEffect} from "react";
import { AccessContext } from "../../../../config/accessContext";
import { TiDelete } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify'
import { IoMdAddCircle } from "react-icons/io";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const InvoiceCreate = () =>{
    const access = useContext(AccessContext)

    const [invoceData,setInvoiceData]= useState({
        sellerId:'',buyerId:'',createDate:'',addDate:'',patern:'1',buerType:'1',title:'',type:'1',
        body:[
            {idProduct:'',discription:'',count:'1',sumBeforOff:'0',off:'0',taxRate:'9',cash:'0'},
        ]
    })

    const [listCompanyMoadian, setListCompanyMoadian] = useState([])

    const getListCompanyMoadian = () =>{
        axios.post(OnRun+'/getlistcompanymoadian',{access:access})
        .then(response=>{
            if (!response.data.reply) {
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }else{
                setListCompanyMoadian(response.data.df)
                setInvoiceData({...invoceData,sellerId:response.data.df[0].idNum})
            }
        })
    }


    const handleIdBodyChange = (event,index,key) => {
        // Copy the existing state
        const newInvoiceData = { ...invoceData };

        // Update the idProduct of the second element in the body array
        newInvoiceData.body[index][key] = event.target.value;
    
        // Set the updated state
        setInvoiceData(newInvoiceData);
      };

    const addBody =()=>{
        var body = invoceData.body
        body.push({idProduct:'',discription:'',count:'1',sumBeforOff:'0',off:'0',taxRate:'9',cash:'0'})
        setInvoiceData({...invoceData,body:body})
    }

    const delbody = (inx) =>{
        if (invoceData.body.length>1) {
            setInvoiceData((prevState) => ({
                ...prevState,
                body: prevState.body.filter((_, index) => index !== inx),
                }));
        }
    }
    

    const handlecreatedate = (data) =>{setInvoiceData({...invoceData,createDate:data})}
    const handleadddate = (data) =>{setInvoiceData({...invoceData,addDate:data})}


    const save = () =>{                
        if (invoceData.title.length==0) {toast.warning("عنوان صورت حساب پر کنید",{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (invoceData.sellerId.length==0) {toast.warning("فروشنده را انتخاب کنید",{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (invoceData.buyerId.length==0) {toast.warning("شناسه خریدار را پر کنید",{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (invoceData.createDate=='') {toast.warning("تاریخ را پر کنید",{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (invoceData.addDate=='') {toast.warning("تاریخ صدور را پر کنید",{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (Math.min(invoceData.body.map(i=>i.idProduct.length))==0) {toast.warning("برخی شناسه های کالا و خدمات خالی است",{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (Math.min(invoceData.body.map(i=>i.sumBeforOff))==0) {toast.warning("برخی قیمت های برابر با صفر است",{position: toast.POSITION.BOTTOM_RIGHT})
        }else{
            axios.post(OnRun+'/saveinvoce',{invoceData:invoceData,access:access})
            .then(response=>{
                if(response.data.reply){
                    setInvoiceData(({sellerId:'',buyerId:'',createDate:'',addDate:'',patern:'1',buerType:'1',title:'',type:'1',body:[{idProduct:'',discription:'',count:'1',sumBeforOff:'0',off:'0',taxRate:'9',cash:'0'}]}))
                }else{
                    toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
        }
    }

    useEffect(getListCompanyMoadian,[])

    return(
        <div className="subPage tablePg">
            <ToastContainer  autoClose={3000}/>
            <div className="tls">
                <h2 className="titlePage">ایجاد صورت حساب</h2>
            </div>
                {
                    listCompanyMoadian.length==0?null:
                    <div className="invoce">
                        <section>
                            <div className="header-section">
                                <h3>طرفین</h3>
                            </div>
                            <div className="body-section">
                                <fieldset>
                                    <label>عنوان صورت حساب</label>
                                    <input value={invoceData.title} onChange={(e)=>setInvoiceData({...invoceData,title:e.target.value})}></input>
                                </fieldset>
                                <fieldset>
                                    <label>فروشنده</label>
                                    <select onChange={(e)=>setInvoiceData({...invoceData,sellerId:e.target.value})} value={invoceData.sellerId}>
                                        {
                                            listCompanyMoadian.map(i=>{
                                                return(
                                                    <option key={Math.random()*100} value={i.idNum}>{i.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label>شناسه اقتصادی/ملی خریدار</label>
                                    <input type="number" value={invoceData.buyerId} onChange={(e)=>setInvoiceData({...invoceData,buyerId:e.target.value})}></input>
                                </fieldset>
                            </div>
                        </section>
                        <section>
                            <div className="header-section">
                                <h3>کل صورت حساب</h3>
                            </div>
                            <div className="body-section">
                                <fieldset>
                                    <label>تاریخ صورت حساب</label>
                                    <DatePicker format="MM/DD/YYYY HH:mm:ss" plugins={[<TimePicker position="bottom" />]} calendar={persian} locale={persian_fa} calendarPosition="bottom-right" onChange={handlecreatedate}/>
                                </fieldset>
                                <fieldset>
                                    <label>تاریخ صدور صورت حساب</label>
                                    <DatePicker format="MM/DD/YYYY HH:mm:ss" plugins={[<TimePicker position="bottom" />]} calendar={persian} locale={persian_fa} calendarPosition="bottom-right" onChange={handleadddate}/>
                                </fieldset>
                                <fieldset>
                                    <label>نوع صورت حساب</label>
                                    <select value={invoceData.type} onChange={(e)=>setInvoiceData({...invoceData,type:e.target.value})}>
                                        <option value={1}>نوع 1</option>
                                        <option value={2}>نوع 2</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label>الگوی صورت حساب</label>
                                    <select value={invoceData.patern} onChange={(e)=>setInvoiceData({...invoceData,patern:e.target.value})}>
                                        <option value={1}>فروش</option>
                                        <option value={3}>پیمانکاری</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label>نوع خریدار</label>
                                    <select value={invoceData.buerType} onChange={(e)=>setInvoiceData({...invoceData,buerType:e.target.buerType})}>
                                        <option value={1}>حقیقی</option>
                                        <option value={2}>حقوقی</option>
                                        <option value={5}>مصرف کننده</option>
                                    </select>
                                </fieldset>
                            </div>
                        </section>
                        <section>
                            <div className="header-section">
                                <h3>جزئیات صورت حساب</h3>
                                <div className="btn" onClick={addBody}>
                                    <span><IoMdAddCircle /></span>
                                </div>
                            </div>
                            <div className="body-section-row">
                            {
                                invoceData.body.map((item, index)=>{
                                    return(
                                        <div className="row" key={index}>
                                            <div className="inx">
                                                <h6>.{(index+1).toLocaleString()}</h6>
                                            </div>
                                            <div className="fild">
                                                <fieldset>
                                                    <label>شناسه کالا و خدمات</label>
                                                    <input value={item.idProduct} onChange={(e)=>handleIdBodyChange(e,index,'idProduct')}></input>
                                                </fieldset>
                                                <fieldset>
                                                    <label>شرح کالا و خدمات</label>
                                                    <input value={item.discription} onChange={(e)=>handleIdBodyChange(e,index,'discription')}></input>
                                                </fieldset>
                                                <fieldset>
                                                    <label>تعداد مقدار</label>
                                                    <input value={item.count} onChange={(e)=>handleIdBodyChange(e,index,'count')}></input>
                                                </fieldset>
                                                <fieldset>
                                                    <label>مبلغ قبل از تخفیف</label>
                                                    <input value={item.sumBeforOff} onChange={(e)=>handleIdBodyChange(e,index,'sumBeforOff')}></input>
                                                </fieldset>
                                                <fieldset>
                                                    <label>تخفیف</label>
                                                    <input value={item.off} onChange={(e)=>handleIdBodyChange(e,index,'off')}></input>
                                                </fieldset>
                                                <fieldset>
                                                    <label>نرخ ارزش افزوده</label>
                                                    <input value={item.taxRate} onChange={(e)=>handleIdBodyChange(e,index,'taxRate')}></input>
                                                </fieldset>
                                                <fieldset>
                                                    <label>مبلغ نقد پرداختی</label>
                                                    <input value={item.cash} onChange={(e)=>handleIdBodyChange(e,index,'cash')}></input>
                                                </fieldset>
                                            </div>
                                            <div className="inx">
                                                <span onClick={()=>delbody(index)}><TiDelete /></span>
                                            </div>
                                        </div>

                                    )
                                })
                            }

                            </div>
                        </section>
                        <button onClick={save}>ذخیره</button>
                    </div>
                }

        </div>
    )
}


export default InvoiceCreate