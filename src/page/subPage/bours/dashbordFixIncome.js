

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
                <DashDifNavPrc />
            </div>
            <div className="liner">
                <DashRtnPrc />
            </div>
        </div>
    )
}


export default DashboardFixInCome