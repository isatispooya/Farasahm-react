import { MdDashboard , MdNewLabel , MdOutlineCategory , MdHowToVote} from "react-icons/md";
import { FaPeopleArrows , FaHandHoldingUsd , FaRunning , FaChartPie} from "react-icons/fa";
import { GiNewShoot } from "react-icons/gi";
import { IoSpeedometer } from "react-icons/io5";
import { HiOutlineDocumentDuplicate , HiScale } from "react-icons/hi";
import { VscGroupByRefType } from "react-icons/vsc";
import { RiHandCoinFill } from "react-icons/ri";
import { BsCashCoin , BsFillBuildingsFill, BsPersonFillX , BsFillPeopleFill ,BsFileEarmarkText,BsBuildingFill} from "react-icons/bs";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiTransfer,BiTransferAlt} from "react-icons/bi";

export const menuFullList ={
    'dashboard':<MdDashboard/>,
    'traders':<FaPeopleArrows/>,
    'newcomer':<GiNewShoot/>,
    'runaway':<FaRunning/>,
    'broker':<BsFillBuildingsFill/>,
    'holder':<FaHandHoldingUsd/>,
    'grouping':<VscGroupByRefType/>,
    'category':<MdOutlineCategory/>,
    'stockman':<BsFillPeopleFill/>,
    'metric':<IoSpeedometer/>,
    'formerstockman':<BsPersonFillX/>,
    'nav':<FaChartPie/>,
    'return':<BsCashCoin/>,
    'compare':<HiScale/>,
    'ordering':<MdNewLabel/>,
    'shareholders':<HiOutlineDocumentDuplicate/>,
    'transactions':<BiTransfer/>,
    'createassembly':<MdHowToVote/>,
    'capitalincrease':<RiHandCoinFill/>,
    'priority':<AiOutlinePaperClip/>,
    "oragh":<BsFileEarmarkText />,
    'volumetrade':<FaPeopleArrows/>,
    'tradersbroker':<BsBuildingFill />,
    'tradersall':<BiTransferAlt/>
}
