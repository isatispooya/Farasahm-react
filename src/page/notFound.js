import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="PreemptionCard">          
                <div className="br">
                    <h5>چنین صفحه ای یافت نشد</h5>
                    <Link to="/desk">رفتن به صفحه اصلی</Link>
                </div>           
        </div>           
       
    );
};
export default NotFound;
