import axios from 'axios'
import {useEffect, useState} from 'react'
import { setCookie, getCookie } from '../componet/cookie/cookie'
import { OnRun } from '../config/config'
import { useNavigate  } from 'react-router-dom'

const Home = () =>{
    const [CaptchaCode, setCaptchaCode] = useState(null)
    const [CaptchaImg, setCaptchaImg] = useState(null)
    const [inputPhone, setInputPhone] =useState({'phone':'','captcha':'','code':''})
    const [errMsg, setErrMsg] =useState('')
    const [phase,setPhase] = useState(false)
    const Navigate = useNavigate()

    const getCaptcha = () =>{
        axios({method:'POST',url:OnRun+'/captcha'
        }).then(response=>{
            setCaptchaCode(response.data.encrypted_response)
            setCaptchaImg(response.data.image)
        })
    }

    const applyPhone = () =>{
        if(inputPhone.phone.length!=11){
            setErrMsg('شماره همراه میبایست 11 رقم باشد')
        }else if(inputPhone.captcha.length==0){
            setErrMsg('کد تصویر صحیح نیست')
        }else{
            setPhase(true)
            axios({method:'POST',url:OnRun+'/applyphone',data:{inputPhone:inputPhone,captchaCode:CaptchaCode}
            }).then(response=>{
                if(response.data.replay){
                    setErrMsg('')
                }else{
                    setErrMsg(response.data.msg)
                }
            })
        }
    }

    const applyCode = () =>{
        axios({method:'POST',url:OnRun+'/applycode',data:{inputPhone:inputPhone}
        }).then(response=>{
            if(response.data.replay){

                setCookie('id',response.data.id,1)
                Navigate('/section')
            }else{
                setErrMsg(response.data.msg)
            }
        })
    }


    const AccessCheck = () =>{
        const id = getCookie('id')
        if(id){axios({method:'POST',url:OnRun+'/access',data:{id:id}
            }).then(response=>{
                if(response.data.replay){
                    Navigate('/section')
                }
            })
        }
    }



    useEffect(getCaptcha,[])
    useEffect(AccessCheck,[])
    return(
        <div className='homePage'>
            <div className='login'>
                {  
                    phase?
                    <>
                        <input value={inputPhone.code} onChange={(e)=>setInputPhone({...inputPhone,code:e.target.value})} placeholder='کد تایید' type='phone'/>
                        <button className='ent' onClick={applyCode}>تایید</button>
                        <button className='btnEdt' onClick={()=>setPhase(false)}>ویرایش</button>
                    </>:
                    <>
                        <input value={inputPhone.phone} onChange={(e)=>setInputPhone({...inputPhone,phone:e.target.value})} placeholder='شماره همراه' type='phone'/>
                        <input value={inputPhone.captcha} onChange={(e)=>setInputPhone({...inputPhone,captcha:e.target.value})} placeholder='کد تصویر' type='text'/>
                        <div className="captcha">
                            {CaptchaImg==null?null:<img onClick={getCaptcha} src={`data:image/png;base64,${CaptchaImg}`}></img>}
                        </div>
                        <button className='ent' onClick={applyPhone}>تایید</button>

                    </>
                }
                {errMsg.length==0?null:<p onClick={()=>setErrMsg('')} className='errMsg'>{errMsg}</p>}

            </div>
            <div className="brd">
                <div className="logo">
                    <img src="./img/fidiplogo.png"/>
                    <img className="prt1 prt" src="./img/logopart1.png"/>
                    <img className="prt2 prt" src="./img/logopart2.png"/>
                    <img className="prt3 prt" src="./img/logopart3.png"/>
                    <img className="prt4 prt" src="./img/logopart4.png"/>
                </div>
                <img src="./img/fidiptype.png"/>
                <h1>سامانه مدیریت امور سهام</h1>
                <a href="https://fidip.ir">www.fidip.ir</a>
            </div>
        </div>
    )
}


export default Home