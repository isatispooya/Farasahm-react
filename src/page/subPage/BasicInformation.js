import { useState , useContext , useEffect } from "react"

import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from "../../config/config"




const BasicInformation = () =>{
    const [information, setInformation] = useState({'نام شرکت':'','نوع شرکت':'','شماره ثبت':'','محل ثبت':'','تاریخ تاسیس':'','شناسه ملی':'','تعداد سهام':'','سرمایه ثبتی':'','زمینه فعالیت':'','آدرس':'','مدیر عامل':'','رئیس هیئت مدیره':''})
    const access = useContext(AccessContext)

    const getInformation = () =>{
        axios({method:'POST',url:OnRun+'/getinformationcompany',data:{access:access}
        }).then(response=>{
            setInformation({'نام شرکت':response.data.dic['نام شرکت'],
            'نوع شرکت':response.data.dic['نوع شرکت'],
            'شماره ثبت':response.data.dic['شماره ثبت'],
            'محل ثبت':response.data.dic['محل ثبت'],
            'تاریخ تاسیس':response.data.dic['تاریخ تاسیس'],
            'شناسه ملی':response.data.dic['شناسه ملی'],
            'تعداد سهام':response.data.dic['تعداد سهام'],
            'سرمایه ثبتی':response.data.dic['سرمایه ثبتی'],
            'زمینه فعالیت':response.data.dic['زمینه فعالیت'],
            'آدرس':response.data.dic['آدرس'],
            'مدیر عامل':response.data.dic['مدیر عامل'],
            'رئیس هیئت مدیره':response.data.dic['رئیس هیئت مدیره'],
            })
        })
    }

    const save = () =>{
        axios({method:'POST',url:OnRun+'/setinformationcompany',data:{access:access,information:information}
        }).then(response=>{
            alert('ثبت شد')
        })
    }

    useEffect(getInformation,[])
    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">اطلاعات شرکت</h2>
            </div>
            <div className="formFields">
                <fieldset>
                    <label>نام شرکت</label>
                    <input value={information['نام شرکت']} onChange={(e)=>setInformation({...information,'نام شرکت':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label>نوع شرکت</label>
                    <input value={information['نوع شرکت']} onChange={(e)=>setInformation({...information,'نوع شرکت':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label >شماره ثبت</label>
                    <input value={information['شماره ثبت']} onChange={(e)=>setInformation({...information,'شماره ثبت':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label >محل ثبت</label>
                    <input value={information['محل ثبت']} onChange={(e)=>setInformation({...information,'محل ثبت':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label >تاریخ تاسیس</label>
                    <input value={information['تاریخ تاسیس']} onChange={(e)=>setInformation({...information,'تاریخ تاسیس':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label>شناسه ملی</label>
                    <input value={information['شناسه ملی']} onChange={(e)=>setInformation({...information,'شناسه ملی':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label>تعداد سهام</label>
                    <input value={information['تعداد سهام']} onChange={(e)=>setInformation({...information,'تعداد سهام':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label>سرمایه ثبتی</label>
                    <input value={information['سرمایه ثبتی']} onChange={(e)=>setInformation({...information,'سرمایه ثبتی':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label>زمینه فعالیت</label>
                    <input value={information['زمینه فعالیت']} onChange={(e)=>setInformation({...information,'زمینه فعالیت':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label>آدرس</label>
                    <input value={information['آدرس']} onChange={(e)=>setInformation({...information,'آدرس':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label>مدیر عامل</label>
                    <input value={information['مدیر عامل']} onChange={(e)=>setInformation({...information,'مدیر عامل':e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label>رئیس هیئت مدیره</label>
                    <input value={information['رئیس هیئت مدیره']} onChange={(e)=>setInformation({...information,'رئیس هیئت مدیره':e.target.value})}/>
                </fieldset>
                <fieldset className="btn">
                    <button onClick={save}>تایید</button>
                </fieldset>
            </div>

        </div>
    )
}


export default BasicInformation