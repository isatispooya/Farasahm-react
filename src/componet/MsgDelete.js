const MsgDelete = (props) => {
  if (props.MsgDelData.msg) {
    return (
      <div className="msgDel">
        <p>{props.MsgDelData.msg}</p>
        <div>
          <button
            onClick={() =>
              props.setMsgDelData({
                ...props.MsgDelData,
                msg: "",
                comfrmation: false,
                ditail: null,
              })
            }
            className="neg"
          >
            لغو
          </button>
          <button
            onClick={() =>
              props.setMsgDelData({
                ...props.MsgDelData,
                msg: "",
                comfrmation: true,
              })
            }
            className="pos"
          >
            تایید
          </button>
        </div>
      </div>
    );
  }
};

export default MsgDelete;
