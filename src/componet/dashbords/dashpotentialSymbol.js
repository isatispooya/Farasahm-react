
import { AccessContext } from "../../config/accessContext"
import axios from "axios"

import { OnRun } from "../../config/config"
import MiniLoader from "../Loader/miniLoader"
import { useContext, useEffect, useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const DashPotentialSymbol = () =>{
    const access = useContext(AccessContext)
    const [dic, setDic] = useState([])

    useEffect(() => {
        ChartJS.register(
          CategoryScale,
          LinearScale,
          PointElement,
          LineElement,
          Title,
          Tooltip,
          Legend,
          BarElement 
        );
      }, []);


      const Options = {
        responsive: true,
        aspectRatio:4,
        plugins: {
            legend: {
                display:true,
                title: {display: true,text:'مشتریان بالقوه به لحاظ ارزش'},
                tooltip:{backgroundColor:'#273bb0'}
            },
        },
    }

    const get = () =>{
        axios.post(OnRun+'/dashpotantialsymbol',{access:access})
        .then(response=>{
            var lab = response.data.df.CustomerTitle
            var data = {
                lab,
                datasets: [
                    {
                        label: 'ارزش',
                        data: response.data.df.VolumeInPrice,
                        backgroundColor: '#599fd9',
                        borderColor: '#599fd9',
                        borderRadius:'15'
                    }
                ]
            }
            setDic(<Bar id="potadash" options={Options} data={data} />)
        })
    }



    useEffect(() => {
        const chartCanvas = document.getElementById("potadash");
        const existingChart = ChartJS.getChart(chartCanvas);
      
        if (existingChart) {
          existingChart.destroy();
        }
      
        get(); // یا هر تابعی که نمودار جدید را ایجاد می‌کند
      }, []);




    return(
        <div className="dshfixdv">
            {
                dic==[]?
                <MiniLoader/>:
                dic
            }
        </div>
    )
}



export default DashPotentialSymbol