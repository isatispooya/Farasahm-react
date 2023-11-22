

import DashFixAsset from "../../../componet/dashbords/dashFixAsset"
import DashDifNavPrc from "../../../componet/dashbords/dashDifNavPrc"
import DashRtnPrc from "../../../componet/dashbords/dashRtnPrc"
import DashRatFixAsset from "../../../componet/dashbords/dashRetFixAsset"

const DashboardFixInCome = () =>{
    return(
        <div className="fixdash">
            <div className="row">
                <DashFixAsset />
                <DashRatFixAsset />
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