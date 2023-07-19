

import axios from "axios"
import { useParams } from "react-router-dom"
import { OnRun } from "../../config/config"
import { useState , useEffect} from "react"

const SheetVoteController = () =>{
    const {symbol} = useParams()
    const [data, setData] = useState([])
    console.log(data)


    const getData = () =>{
        console.log(symbol)
        axios.post(OnRun+'/getresultvotes',{symbol:symbol})
        .then(response=>{
            if(response.data.replay){
                setData(response.data)
            }
        })
    }

    useEffect(getData,[])

    return(
        <div className="print">
            {
                data.length==0?null:
                <div className="conteiner">
                    <div className="title">
                        <img src={"/img/"+symbol+'.png'}></img>
                        <h1>{data.company.fullname}</h1>
                        <h2>نتیجه انتخابات بازرس</h2>
                    </div>
                    <div className="results">
                        <div className="result">
                            <p>بازرس</p>
                            <p>تعداد</p>
                            <p>وضعیت</p>
                        </div>
                        {
                            data.df.map(i=>{
                                return(
                                    <div key={i.opt} className="result">
                                        <p>{i.opt}</p>
                                        <p>{i['سهام کل'].toLocaleString()}</p>
                                        <p>{i.status}</p>
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



export default SheetVoteController