import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { OnRun } from "../../../config/config"
import { AccessContext } from "../../../config/accessContext"
import { MdKeyboardDoubleArrowRight } from "react-icons/md";



const IncreaseAsset = () => {
    const [inp ,setInp] = useState({increase:1000,static:'یک روز',bank:22, nogov:20, gov:20, saham: 0, type:'محافظه کارانه'})
    const [increaseReult, setIncreaseResult] = useState([])
    const access = useContext(AccessContext)

    const getRetAss = () =>{
        axios.post(OnRun+'/getretassfix',{access:access,static:inp.static})
        .then(response=>{
            if (response.data.reply) {
                setInp({...inp, bank:response.data.dic.bank, gov:response.data.dic.gov, nogov:response.data.dic.nongov})
            }
            console.log(response.data)
        })
    }

    const calc = () =>{
        axios.post(OnRun+'/calcincass',{access:access,inp:inp})
        .then(response=>{
            setIncreaseResult(response.data.df)
        })
    }

    useEffect(calc,[inp])
    useEffect(getRetAss,[])
    
    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">ورود پول</h2>
            </div>
            <div className="formInpPanel">
                <div className="row">
                    <fieldset>
                        <label>مقدار (میلیون ریال)</label>
                        <input type="number" value={inp.increase} onChange={(e)=>setInp({...inp,increase:e.target.value})}></input>
                    </fieldset>
                    <fieldset>
                        <label>ماندگاری</label>
                        <select value={inp.static} onChange={(e)=>setInp({...inp,static:e.target.value})}>
                            <option value="یک روز">یک روز</option>
                            <option value="یک هفته">یک هفته</option>
                            <option value="دو هفته">دو هفته</option>
                            <option value="یک ماه">یک ماه</option>
                            <option value="دو ماه">دو ماه</option>
                            <option value="سه ماه">سه ماه</option>
                            <option value="شش ماه">شش ماه</option>
                            <option value="یکسال و بیشتر">یکسال و بیشتر</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>سیاست</label>
                        <select value={inp.type} onChange={(e)=>setInp({...inp,type:e.target.value})}>
                            <option value="جسورانه">جسورانه</option>
                            <option value="محافظه کار">محافظه کار</option>
                        </select>
                    </fieldset>
                </div>
                <div className="row">
                    <fieldset>
                        <label>بازدهی بانکی</label>
                        <input type="number" value={inp.bank} onChange={(e)=>setInp({...inp,bank:e.target.value})}></input>
                    </fieldset>
                    <fieldset>
                        <label>بازدهی اوراق دولتی</label>
                        <input type="number"value={inp.gov} onChange={(e)=>setInp({...inp,gov:e.target.value})}></input>
                    </fieldset>
                    <fieldset>
                        <label>بازدهی اوراق شرکتی</label>
                        <input type="number" value={inp.nogov} onChange={(e)=>setInp({...inp,nogov:e.target.value})}></input>
                    </fieldset>
                    <fieldset>
                        <label>بازدهی سهام</label>
                        <input type="number" value={inp.saham} onChange={(e)=>setInp({...inp,saham:e.target.value})}></input>
                    </fieldset>
                </div>
            </div>
            {
                increaseReult.length==0?null:
                <div className="incresrow">
                    <div className="row">
                        {
                            increaseReult.map(i=>{
                                return(
                                    <div className="asscls">
                                        <h3>{i.name}</h3>
                                        <div className="vlap">
                                            <p>+ {(Math.round(i.approve/1000000)).toLocaleString()} M</p>
                                        </div>
                                        <div className="vlft">
                                            <p>{(Math.round(i.value/1000000)).toLocaleString()} M</p>
                                            <span><MdKeyboardDoubleArrowRight /></span>
                                            <p className="vlap">{(Math.round(i.value_after/1000000)).toLocaleString()} M</p>
                                        </div>
                                        <div className="vlft">
                                            <p className="vlaf">{(Math.round(i.rate_befor*100)).toLocaleString()} %</p>
                                            <span><MdKeyboardDoubleArrowRight /></span>
                                            <p className="vlaf">{(Math.round(i.rate_after*100)).toLocaleString()} %</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}


export default IncreaseAsset