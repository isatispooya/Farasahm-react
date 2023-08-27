import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../../config/accessContext";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { ToastContainer, toast } from 'react-toastify'



const VolumeTrade = () =>{
    const access = useContext(AccessContext)
    const [df, setDf] = useState(null)
    

    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">حجم معاملات</h2>
                <div className="btntls">
                    <p className=""><span></span></p>
                </div>
            </div>
            <div id="data-table"></div>
        </div>
    )
}


export default VolumeTrade