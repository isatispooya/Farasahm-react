

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
                            {
                                res.register['شناسه ملی']?
                                <p>شرکت</p>
                                :
                                <p>خانم / آقای</p>
                            }
                            <p>{res.register['نام'] + ' ' + res.register["نام خانوادگی "]}</p>
                        </div>
                        <div>
                            <p>شماره/شناسه ملی</p>
                            <p>{res.register['شناسه ملی'] +  res.register["کد ملی"]}</p>
                        </div>
                        <div>
                            <p>صدور</p>
                            <p>{res.register['محل صدور']}</p>
                        </div>
                    </div>
                    <div className="aras">

                        <div className="opt">
                            <h1>گزینه های انتخاب بازرس:</h1>
                            {
                                res.assembly.controller.map(i=>{
                                    return(
                                        <span key={i}>{i}</span>
                                    )
                                })
                            }
                        </div>
                        <p>بازرس منتخب:</p>
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