import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from "../../config/config"
import MiniLoader from "../Loader/miniLoader"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';


const DashAssetValue = () =>{
    const access = useContext(AccessContext)
    const [dif, setDif] = useState(null)


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

      const get = () =>{
        axios.post(OnRun+'/valuefundinser',{access:access})
        .then(response=>{
            var lab = response.data.df.dateInt
        // console.log(response.data)
            setDif({
                lab,
                datasets: [
                    {
                        label: 'ارزش',
                        data: response.data.df.VolumeInPrice,
                        backgroundColor: 'rgb(53, 162, 235, 0.5)',
                        borderColor: 'rgb(53, 162, 235)'
                    },
                    
                ]
            })
        })
    }

    const Options = {
        responsive: true,
        aspectRatio:4,
        plugins: {
            legend: {
                display:true,
                title: {display: true,text:'ارزش اوراق سهام '},
                tooltip:{backgroundColor:'#273bb0'}
            },
        },
    }

    useEffect(get, [])

    return(
        <div className="dshfixdv">
            {
                dif==null?
                <MiniLoader/>:
                <Line options={Options} data={dif} />

            }
             
        </div>
    )
}

export default DashAssetValue;