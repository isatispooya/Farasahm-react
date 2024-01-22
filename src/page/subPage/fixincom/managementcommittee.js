import DashOnwer from "../../../componet/dashbords/dashOnwer";
import DashRnkFixIn from "../../../componet/dashbords/dashRankFixIn";
import DashRtnPrc from "../../../componet/dashbords/dashRtnPrc";
import DashPotential from "../../../componet/dashbords/dashpotential";
import DashPotentialSymbol from "../../../componet/dashbords/dashpotentialSymbol";
import StaticOwnerInComp from "../../../componet/dashbords/staticOwnerInComp";

const Managementcommittee = () => {
  return (

      <div className="fixdash">
        <div className="row">
          <DashRnkFixIn />
        </div>
        <div className="row">{/*<DashOnwer />*/}</div>
        <div className="row">
          <StaticOwnerInComp />
        </div>
        <div className="liner">
          <DashRtnPrc />
        </div>
        <div className="liner">
          <DashPotential />
        </div>
        <div className="liner">
          <DashPotentialSymbol />
        </div>
      </div>

  );
};

export default Managementcommittee;
