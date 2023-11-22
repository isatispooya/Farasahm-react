import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from "../../config/config"
import MiniLoader from "../Loader/miniLoader"
import { Bar } from 'react-chartjs-2';

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,defaults} from 'chart.js';



const DashFixAsset = () =>{
    const access = useContext(AccessContext)
    const [dic, setDic] = useState(null)


    ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)
    defaults.font.family = 'peydaRegular'

    const get = () =>{
        axios.post(OnRun+'/getdiffassetamarydash',{access:access})
        .then(response=>{
            var lab = response.data.lab
            setDic({
                lab,
                datasets: [{
                    data: response.data.val,
                    backgroundColor: '#5aae40',
                    borderRadius: 15
                }]
            })
        })
    }

    const Options = {
        responsive: true,
        plugins: {
            legend: {
                display:false,
                title: {display: true,text:'ارزش دارایی ها'},
                tooltip:{backgroundColor:'#273bb0'}
            },
        },
    }

    useEffect(get,[])
    return(
        <div>
            <h1>ارزش دارایی ها</h1>
            {
                dic==null?
                <MiniLoader/>:
                <Bar options={Options} data={dic} />

            }
        </div>
    )
}

export default DashFixAsset
