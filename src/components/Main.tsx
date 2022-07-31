interface PropsType {
    data: Array<string>[];
}

const Main = (props:PropsType) : JSX.Element =>{

    

    return <>
        <div className="">
            <table className="table">
                <tbody>
                    {props.data.map((e, i)=>{
                        return (<tr key={i} className="tr-height">
                            {e.map((elem, index)=><td key={i + "-" + index} className="text-center border-right border-bot">{elem}</td>)}
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    </>
}
export default Main