import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { OnRun } from "../../../config/config"
import { AccessContext } from "../../../config/accessContext"




const IncreaseAsset = () => {
    const [inp ,setInp] = useState({increase:1000,static:'یک روز',bank:22, nogov:20, gov:20, saham: 0, type:'محافظه کارانه'})
    const access = useContext(AccessContext)
    console.log(inp)

    const calc = () =>{
        axios.post(OnRun+'/calcincass',{access:access,inp:inp})
        .then(response=>{
            console.log(response.data)
        })
    }

    useEffect(calc,[inp])

    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">ورود پول</h2>
            </div>
            <div className="formInpPanel">
                <div className="row">
                    <fieldset>
                        <label>مقدار</label>
                        <input type="number" value={inp.type} onChange={(e)=>setInp({...inp,type:e.target.value})}></input>
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
        </div>
    )
}


export default IncreaseAsset