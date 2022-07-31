const Code = (props: any) => {
    return (<div className="yourCode_container">
        <div>{props.liveStatus 
            ? <div className="status">
                <div className="container-live"></div>
                <b>LIVE</b>
            </div> 
            : <div className="status">
                <div className="container-offline"></div>
                <b>OFFLINE</b>
            </div>
             }</div>
        <div className="code_count">YOUR CODE: <b>{props.code}</b></div>
    </div>)
}

export default Code