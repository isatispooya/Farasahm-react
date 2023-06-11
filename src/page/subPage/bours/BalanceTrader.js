

import { useParams } from "react-router-dom"
import MiniLoader from "../../../componet/Loader/miniLoader"
import NoData from "../../../componet/Loader/NoData"
import { useEffect, useState , useContext, useRef} from "react"

import { exportPdf } from "../../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";
import { OnRun } from "../../../config/config";
import axios from "axios";
import { AccessContext } from "../../../config/accessContext"

import { ChartComponent } from "../../../componet/ChartComponent"


const BalanceTrader = () =>{
    const {code} = useParams()
    const [traderSelect, setTraderSelect] = useState(code)
    const [df, setDf] = useState(null)
    const access = useContext(AccessContext)
    const [traderName, setTraderName] = useState(null)

    const codeToName = () =>{
        axios({method:'POST',url:OnRun+'/getprofiletrader',data:{access:access,code:traderSelect}
        }).then(response=>{
            if(response.data.replay){
                setTraderName(response.data.df)
            }
        })
    }

    const getDf = ()=>{
        axios({method:'POST',url:OnRun+'/getbalancetrader',data:{access:access,trader:traderSelect}
        }).then(response=>{
            if(response.data.replay){
                setDf(response.data.df)
            }else{
                setDf(false)
            }
        })
    }


    useEffect(getDf,[])
    useEffect(codeToName,[])

  

    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">جزئیات مشتری</h2>
                {
                    traderName==null?
                    <h2 className="titlePage btntls">{code}</h2>
                    :
                    <h2 className="titlePage btntls">{traderName.fullName}</h2>
                }
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:<ChartComponent data={df} />}
        </div>
    )
}


export default BalanceTrader