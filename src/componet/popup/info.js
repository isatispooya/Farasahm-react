const InfoPopUp = (props) => {
  if (props.data.enable) {
    return (
      <div className="infoPopup">
        <div
          className="closehide"
          onClick={() => props.setData({ ...props.data, enable: false })}
        ></div>
        <div className="conteiner">
          <h1>{props.data.title}</h1>
          <div className="rows">
            {props.data.row.map((i) => {
              return (
                <div className="row">
                  <h3>{i.title}</h3>
                  <p>{i.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default InfoPopUp;
