import { MdDashboard , MdNewLabel , MdOutlineCategory , MdHowToVote} from "react-icons/md";
import { FaPeopleArrows , FaHandHoldingUsd , FaRunning , FaChartPie} from "react-icons/fa";
import { GiNewShoot } from "react-icons/gi";
import { IoSpeedometer ,IoSettingsSharp} from "react-icons/io5";
import { VscGroupByRefType } from "react-icons/vsc";
import { HiOutlineDocumentDuplicate , HiScale } from "react-icons/hi";
import { RiHandCoinFill } from "react-icons/ri";
import { BsCashCoin , BsFillPersonVcardFill ,BsPersonFillGear ,BsBarChartFill ,BsFillBuildingsFill, BsPersonFillX , BsFillPeopleFill ,BsFileEarmarkText,BsBuildingFill,BsFillFileEarmarkTextFill} from "react-icons/bs";
import { AiOutlinePaperClip } from "react-icons/ai";
import { IoPieChartSharp } from "react-icons/io5";
import { BiTransfer,BiTransferAlt} from "react-icons/bi";
import { RiCalendarTodoLine} from "react-icons/ri";

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
    'compare':<BsBarChartFill/>,
    'ordering':<MdNewLabel/>,
    'shareholders':<HiOutlineDocumentDuplicate/>,
    'transactions':<BiTransfer/>,
    'createassembly':<MdHowToVote/>,
    'capitalincrease':<RiHandCoinFill/>,
    'priority':<AiOutlinePaperClip/>,
    "oragh":<BsFileEarmarkText />,
    'volumetrade':<FaPeopleArrows/>,
    'tradersbroker':<BsBuildingFill />,
    'tradersall':<BiTransferAlt/>,
    'setting':<IoSettingsSharp />,
    "turnover":<BiTransfer/>,
    "tradercodes":<BsFillPersonVcardFill/>,
    "stocksheet":<BsFillFileEarmarkTextFill/>,
    "todo":<RiCalendarTodoLine/>,
    "todocontrol":<BsPersonFillGear/>,
    "dilution":<IoPieChartSharp/>,
    "CompareReturnSample":<BsBarChartFill/>
}
