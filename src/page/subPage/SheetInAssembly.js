

import axios from "axios"
import { useParams } from "react-router-dom"
import { OnRun } from "../../config/config"
import { useEffect, useState } from "react"


const SheetInAssembly = () =>{
    const {symbol} = useParams()
    const [df, setDf] = useState(null)

    const personalInAssembly = () =>{
        axios.post(OnRun+'/personalinassembly',{access:['',symbol]})
        .then(response=>{
            if(response.data.replay){
                setDf(response.data.df)
            }
        })
    }
    useEffect(personalInAssembly,[])

    return(
        <div className="print">
                <h2>حاضرین در مجمع</h2>
                <div className="inpersonal">
                    <div className="person">
                        <p>سهامدار</p>
                        <p>کد ملی</p>
                        <p>تعداد سهام</p>
                    </div>

                    {
                        df==null?null:
                        df.map(i=>{
                            return(
                                <div className="person">
                                    <p>{i.fullName}</p>
                                    <p>{i['کد ملی']}</p>
                                    <p>{i['سهام کل']}</p>
                                </div>
                            )
                        })
                    
                    
                    }

                </div>



        </div>
    )
}



export default SheetInAssembly