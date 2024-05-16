import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from "../../config/config"
import { useContext, useEffect, useState } from "react"
import { setCookie, getCookie } from "../cookie/cookie"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import MiniLoader from "../Loader/miniLoader";

const DashTopFund = () =>{

    const access = useContext(AccessContext)
    const [dic, setDic] = useState([])
    const [period, setPeriod] = useState('')

    const handlePeriod = (e) =>{
        setCookie('dashtopfund',e.target.value,10)
        setPeriod(e.target.value)
    }


    useEffect(() => {
        ChartJS.register(
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend
          );
      }, []);
      const Options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        aspectRatio:4,
        plugins: {
            legend: {
                display:false,
            },
            title: {display: true,text:'پربازده ترین صندوق ها'},
        },
    }
   
    
      const get = ()=>{
        axios.post(OnRun+'/getcomparetop',{access:access,period:period})
        .then(response=>{
            // console.log(response.data)
            var dataset = Object.values(response.data.top.ytm)
            
            var labels = Object.values(response.data.top.symbol)
            var data = {
                labels,
                datasets:[
                {
                    data: dataset,
                    backgroundColor: 'rgb(18, 148, 18, 1)',
                    borderColor: 'rgb(18, 148, 18, 0.5)',
                    borderRadius:'15'
                }]
                 
            }

            setDic(<Bar id="potadash" options={Options} data={data} />)
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
         });
    }
    useEffect(() => {
      get();
    }, [period]);

    useEffect(
        ()=>{
            var per = getCookie('dashtopfund');
               if (per && per.length > 0){
                  setPeriod(per);
               } else {
                  setPeriod('weekly');
                }
        },
        []
    )
    return(
        <>
        <div className="dshfixdv">
        { dic.length === 0 ? <MiniLoader/> : dic}
        <div className="opt" >
                <select onChange={(e)=>handlePeriod(e)} value={period}>
                    <option value='weekly'>هفتگی</option>
                    <option value='weeks2'>دوهفته</option>
                    <option value='month1'>یکماه</option>
                    <option value='month3'>سه ماه</option>
                    <option value='month6'>شش ماه</option>
                    <option value='year'>یکسال</option>
                    <option value='year2'>دو سال</option>
                </select>
            </div>            
        </div>
        </>
    )
}

export default DashTopFund;