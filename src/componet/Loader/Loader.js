import { useEffect, useState } from "react";

const Loader = (props) => {
  const [Message, setMessage] = useState("");

  useEffect(() => {
    if (props.Message) {
      setMessage(props.Message);
    } else {
      setMessage("");
    }
  }, [props]);

  if (props.loading) {
    return (
      <div className="loaders">
        <div className="motion">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h6>لطفا صبر کنید</h6>
        {Message == "" ? null : <p>{Message}</p>}
      </div>
    );
  }
};

export default Loader;
