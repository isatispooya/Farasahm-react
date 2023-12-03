

import DashFixAsset from "../../../componet/dashbords/dashFixAsset"
import DashDifNavPrc from "../../../componet/dashbords/dashDifNavPrc"
import DashRtnPrc from "../../../componet/dashbords/dashRtnPrc"
import DashRatFixAsset from "../../../componet/dashbords/dashRetFixAsset"
import DashOnwer from "../../../componet/dashbords/dashOnwer"
import DashRnkFixIn from "../../../componet/dashbords/dashRankFixIn"
const DashboardFixInCome = () =>{
    return(
        <div className="fixdash">
            <div className="row">
                <DashOnwer />
            </div>
            <div className="row">
                <DashFixAsset />
                <DashRatFixAsset />
                <DashRnkFixIn />
            </div>
            <div className="liner">
                <h1>قیمت  / nav</h1>
                <DashDifNavPrc />
            </div>
            <div className="liner">
                <h1>بازدهی</h1>
                <DashRtnPrc />
            </div>
        </div>
    )
}


export default DashboardFixInCome