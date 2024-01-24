

import DashFixAsset from "../../../componet/dashbords/dashFixAsset"
import DashDifNavPrc from "../../../componet/dashbords/dashDifNavPrc"
import DashRtnPrc from "../../../componet/dashbords/dashRtnPrc"
import DashRatFixAsset from "../../../componet/dashbords/dashRetFixAsset"
import DashOnwer from "../../../componet/dashbords/dashOnwer"
import DashRnkFixIn from "../../../componet/dashbords/dashRankFixIn"
import StaticOwnerInComp from "../../../componet/dashbords/staticOwnerInComp"
import DashPotential from "../../../componet/dashbords/dashpotential"
import DashPotentialSymbol from "../../../componet/dashbords/dashpotentialSymbol"
const DashboardFixInCome = () =>{
    return(
        <div className="fixdash">
            <div className="row">
                <DashFixAsset />
                <DashRatFixAsset />
                <DashRnkFixIn />
            </div>
            <div className="row">
                <DashOnwer />
            </div>
            <div className="liner">
                <DashDifNavPrc />
            </div>
            <div className="liner">
                <DashRtnPrc />
            </div>
            <div className="row">
          <StaticOwnerInComp />
        </div>
        <div className="liner">
          <DashPotential />
        </div>
        <div className="liner">
          <DashPotentialSymbol />
        </div>
        </div>
    )
}


export default DashboardFixInCome