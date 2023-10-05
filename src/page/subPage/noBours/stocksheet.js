import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { OnRun } from '../../../config/config'
import { AccessContext } from '../../../config/accessContext'




const StockSheet = () =>{
    const [inp, setInp] = useState(null)
    const [data, setData] = useState(null)
    const access = useContext(AccessContext)

    const getEstelam = () =>{
        axios.post(OnRun+'/getestelamstocksheet',{access:access})
        .then(response=>{
            if (response.data.reply) {
                setData(response.data.df)
                setInp(response.data.df[0]['کد ملی'])
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }

    const download = () =>{
        axios.post(OnRun+'/checkstocksheet',{access:access,inp:inp},{ responseType: 'arraybuffer' })
        .then(response => {
            const blob = new Blob([response.data], { type: 'image/png' });
            const url = window.URL.createObjectURL(blob);
      
            // ایجاد یک لینک برای دانلود تصویر
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'sheet1.png');
      
            // اضافه کردن لینک به صفحه و کلیک بر روی آن
            document.body.appendChild(link);
            link.click();
      
            // حذف لینک بعد از دانلود
            document.body.removeChild(link);
          })
          .catch(error => {
            console.error('Error fetching image:', error);
          });
    }



    useEffect(getEstelam,[])

    return(
        <div className="subPage">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">برگ سهم</h2>
            </div>
            <div className='gtstcsht'>
                {
                    data == null? null:
                    <>
                    <input list='lst'  onChange={(e)=>setInp(e.target.value)} value={inp}></input>
                    <datalist id='lst'>
                        {
                            data.map(i=>{
                                return(
                                    <option key={i['کد ملی']} value={i['کد ملی']}>{i['نام و نام خانوادگی']}</option>
                                    )
                                })
                        }
                    </datalist>
                    </>
                }
                <button onClick={download}>دریافت</button>
            </div>

        </div>
    )
}


export default StockSheet