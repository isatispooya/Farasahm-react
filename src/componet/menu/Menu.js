import { useEffect, useState } from "react";
import { MdDashboard , MdNewLabel , MdOutlineCategory , MdHowToVote} from "react-icons/md";
import { FaPeopleArrows , FaHandHoldingUsd , FaRunning , FaChartPie} from "react-icons/fa";
import { GiNewShoot } from "react-icons/gi";
import { IoSpeedometer } from "react-icons/io5";
import { HiOutlineDocumentDuplicate , HiScale } from "react-icons/hi";
import { VscGroupByRefType } from "react-icons/vsc";
import { BsCashCoin , BsFillBuildingsFill, BsPersonFillX , BsFillPeopleFill} from "react-icons/bs";
import { BiTransfer} from "react-icons/bi";
import { useNavigate } from "react-router-dom"

const Menu = (props) =>{
    const [menuList, setMenuList] = useState([])
    const menuFullList = [
        ['dashboard','گزیده',<MdDashboard/>],
        ['traders','معامله گران',<FaPeopleArrows/>],
        ['newcomer','تازه وارد',<GiNewShoot/>],
        ['runaway','خارج شده',<FaRunning/>],
        ['broker','کارگزاری ها',<BsFillBuildingsFill/>],
        ['holder','رسوب',<FaHandHoldingUsd/>],
        ['grouping','گروه بندی',<VscGroupByRefType/>],
        ['category','دسته بندی',<MdOutlineCategory/>],
        ['stockman','سهامداران',<BsFillPeopleFill/>],
        ['metric','متریک',<IoSpeedometer/>],
        ['formerstockman','سهامداران سابق',<BsPersonFillX/>],
        ['nav','nav',<FaChartPie/>],
        ['return','بازدهی',<BsCashCoin/>],
        ['compare','مقایسه',<HiScale/>],
        ['ordering','سفارش گذاری',<MdNewLabel/>],
        ['shareholders','سهامدارن',<HiOutlineDocumentDuplicate/>],
        ['transactions','نقل و انتقال',<BiTransfer/>],
        ['createassembly','ایجاد مجمع',<MdHowToVote/>],
    ]
    const Navigate = useNavigate()


    const checkMenu = () =>{
        if(props.access!=''){
            const ml = []
            for (let i = 0; i < menuFullList.length; i++) {
                const dic = menuFullList[i];
                const keyDic = dic[0]
                console.log(props.access.menu)
                if(props.access.menu.includes(keyDic)){ml.push(dic)}
            }
            setMenuList(ml)
        }
    }

    useEffect(checkMenu,[props])
    return(
        <div className="Menu">
            <div className="title">
                <p>منو</p>
            </div>
            {menuList.length==0?null:
                menuList.map(i=>{
                    return(
                        <div key={i[0]} onClick={()=>Navigate(i[0])} className="itemMenu">
                            <p>{i[2]}</p>
                            <h3>{i[1]}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default Menu