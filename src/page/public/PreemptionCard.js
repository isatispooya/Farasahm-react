import axios from "axios"
import { useParams } from "react-router-dom"
import { OnRun } from "../../config/config"
import { useEffect, useState } from "react"






const PreemptionCard = () =>{
    const {sym,nc} = useParams()
    const [status, setStatus] = useState('انتظار')


    const jpgDownload = () =>{
        axios.post(OnRun+'/preemptioncardjpg',{sym:sym,nc:nc},{responseType: 'blob'})
        .then(response=>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.jpg');
            document.body.appendChild(link);
            link.click();
        })
    }

    const pdfDownload = () =>{
        axios.post(OnRun+'/preemptioncardpdf',{sym:sym,nc:nc},{responseType: 'blob'})
        .then(response=>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
        })
    }


    const get = () =>{
        axios.post(OnRun+'/preemptioncard',{sym:sym,nc:nc})
        .then(response=>{
            console.log(response.data)
            if (response.data.replay) {
                setStatus('دریافت شد')
            }else{
                setStatus('یافت نشد')
            }
        })
    }
    
    
    useEffect(get,[])
    return(
        <div className="PreemptionCard">
            {
                status=='انتظار'?
                <div className="br wt">
                    <h5>در حال دریافت اطلاعات</h5>
                    <h6>لطفا شکیبا باشد...</h6>
                </div>
                :status=='دریافت شد'?
                <div className="br">
                    <h5>دریافت برگه حق تقدم</h5>
                    <div>
                        <button onClick={jpgDownload}>تصویر</button>
                        <button onClick={pdfDownload}>PDF</button>
                    </div>
                </div>
                :
                <div className="br">
                    <h5>اطلاعات یافت نشد</h5>
                </div>
            }
        </div>
    )
}


export default PreemptionCard