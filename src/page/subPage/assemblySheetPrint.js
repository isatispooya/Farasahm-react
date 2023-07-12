

import axios from "axios"
import { useParams } from "react-router-dom"
import { OnRun } from "../../config/config"
import { useEffect, useState } from "react"

const AssemblySheetPrint = () =>{
    const {symbol,nc} = useParams()
    const [res, setRes] = useState(null)




    const GetData = () =>{
        axios.post(OnRun+'/getsheetassembly',{symbol:symbol,nc:nc})
        .then(response=>{
            console.log(response.data)
            setRes(response.data.data)
        })

    }


    useEffect(GetData,[])

    return(
        <div className="print">
            {
                res==null?null:
                <div className="conteiner">
                    <div className="title">
                        <img src={"/img/"+symbol+'.png'}></img>
                        <h1>{res.company.fullname}</h1>
                        <h2>برگه رای</h2>
                    </div>

                    <div className="text">
                        <div>
                            <p>{res.register['نام'] + ' ' + res.register["نام خانوادگی "]}</p>
                        </div>
                        <div>
                            <p>شماره/شناسه ملی</p>
                            <p>{res.register['شناسه ملی'] +  res.register["نام خانوادگی "]}</p>
                        </div>
                    </div>
                    <div className="da">
                        <p>دستور جلسه: {res.agenda}</p>
                    </div>
                    <div className="aras">
                        <p>انتخاب بازرس</p>
                        <div className="ara">
                            <p>بازرس پیشنهادی</p>
                        </div>
                    </div>
                    <div className="singer">
                        <p>{res.name}</p>
                        <p>{res.dateAsembly}</p>
                        <p>امضا</p>

                    </div>
                </div>


            }


        </div>
    )
}



export default AssemblySheetPrint