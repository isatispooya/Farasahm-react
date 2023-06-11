import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../config/config'
import Loader from "../../componet/Loader/Loader"

const Update = () =>{
    const [daily, SetDaily] = useState(null)
    const [registerDaily, SetRegisterDaily] = useState(null)
    const [msg, setMsg] = useState('')
    const [loading,setLoading] = useState(false)
    const [loadingMessage,setLoadingMessage] = useState(false)
    const [lastUp, SetLastUp] = useState(null)

    const access = useContext(AccessContext)


    const handleSubmit = () =>{
        if (daily==null){
            setMsg('فایل معاملات بارگذاری کنید')
        }else if (registerDaily==null){
            setMsg('فایل رجیستری بارگذاری کنید')
        }else{
            setLoading(true)
            setLoadingMessage('درحال بررسی کردن فایل ها')
            const formData = new FormData();
            formData.append('daily',daily)
            formData.append('registerdaily',registerDaily)
            formData.append('access',access)
            axios({
                method: 'post',
                url: OnRun+'/update',
                data: formData,
                config: {headers:{'content-type': 'multipart/form-data'}}
            }).then(responseA=>{
                if(responseA.data.replay){
                    setLoadingMessage('در حال آنالیز معاملات')
                    axios({method: 'post',url: OnRun+'/createtraders',data:{date:responseA.data.date,access:access}
                    }).then(responseB=>{
                        if(responseB.data.replay){
                            setLoadingMessage('در حال آنالیز تازه وارد ها')
                            axios({method: 'post',url: OnRun+'/createnewtraders',data:{date:responseA.data.date,access:access}
                            }).then(responseC=>{
                                if(responseC.data.replay){
                                    setLoadingMessage('در حال آنالیز ایستگاه های معاملاتی')
                                    axios({method: 'post',url: OnRun+'/createstation',data:{date:responseA.data.date,access:access}
                                    }).then(responseD=>{
                                        if(responseD.data.replay){
                                            setLoadingMessage('در حال آنالیز سهامداران رسوبی')
                                            axios({method: 'post',url: OnRun+'/createholder',data:{date:responseA.data.date,access:access}
                                            }).then(responseE=>{
                                                if(responseE.data.replay){
                                                    setLoadingMessage('در حال آنالیز کارگزاران')
                                                    axios({method:'post',url:OnRun+'/createbroker',data:{date:responseA.data.date,access:access}
                                                    }).then(responseF=>{
                                                        if(responseF.data.replay){
                                                            setLoadingMessage('در حال یادگیری ماشینی')
                                                            axios({method:'post',url:OnRun+'/mashinlearninimg',data:{date:responseA.data.date,access:access}
                                                            }).then(responseG=>{
                                                                setLoading(false)
                                                                if (responseG.data.replay) {
                                                                    setMsg('بروز رسانی تکمیل شد')
                                                                    lastUpdate()
                                                                }else{
                                                                    setMsg(responseG.data.msg)
                                                                }
                                                            })
                                                        }else{
                                                            setMsg(responseF.data.msg)
                                                        }
                                                    })
                                                }
                                                })
                                        }else{
                                            setLoading(false)
                                            setMsg(responseC.data.msg)
                                        }
                                    })
                                }else{
                                    setLoading(false)
                                    setMsg(responseC.data.msg)
                                }
                            })
                        }else{
                            setLoading(false)
                            setMsg(responseB.data.msg)
                        }
                    })
                }else{
                    setLoading(false)
                    setMsg(responseA.data.msg)
                }
            })
        }
    }

    const lastUpdate = () =>{
        axios({method:'POST',url:OnRun+'/lastupdate',data:{access:access}
        }).then(response=>{
            SetLastUp(response.data.resultslash)
        })
    }

    useEffect(lastUpdate,[])

    return(
        <div className="subPage update">
            <Loader loading={loading} Message={loadingMessage}/>
            <h2>بروزرسانی</h2>
            <section>
                <label>
                    <p>معاملات</p>
                    <input type='file' onChange={e=>SetDaily(e.target.files[0])}></input>
                </label>
                <label>
                    <p>رجیستری</p>
                    <input type='file' onChange={e=>SetRegisterDaily(e.target.files[0])}></input>
                </label>
                <button onClick={handleSubmit}>ثبت</button>
            </section>
            {msg==""?null:<p className="msg">{msg}</p>}
            {lastUp==null?null:<p className="lastUp">آخرین بروزرسانی: {lastUp}</p>}
        </div>
    )
}


export default Update