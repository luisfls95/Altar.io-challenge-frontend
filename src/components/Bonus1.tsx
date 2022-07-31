import Code from "./Code"

const Bonus1 = (props: any) =>{

    const handlePaymentNameChange = (e: any):void => {
        //console.log(e.target.value)
        props.paymentNameHandle(e.target.value)
    }

    const handlePaymentAmmountChange = (e: any):void => {
        //console.log(e.target.value)
        props.paymentAmmountHandle(e.target.value)
    }

    const onClickHandle = () => {
        props.addPayment()
    }

    return (<div>
        <Code liveStatus={props.liveStatus} code={props.code}/>
        <div className='options-container justify-left'>
            <div>
                <div className='input-title'>PAYMENT</div>
                <input onChange={handlePaymentNameChange} value={props.inputLetter} placeholder="Payment"></input>
            </div>
            <div    >
                <div className='input-title'>AMMOUNT</div>
                <input type={"number"} onChange={handlePaymentAmmountChange} value={props.inputLetter} placeholder="Ammount"></input>
            </div>
            <button onClick={onClickHandle}>+ ADD</button>
        </div>
        <div>
            <p>Payment List</p>
            <table width={'100%'} className='table'>
                <thead>
                    <tr className="tr-height payments-header">
                        <td width={'70%'} className="border-right border-bot pl-2">NAME</td>
                        <td width={'10%'} className="text-center border-right border-bot">AMMOUNT</td>
                        <td width={'10%'} className="text-center border-right border-bot">CODE</td>
                        <td width={'10%'} className="text-center border-right border-bot">GRID</td>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((elem: any)=>{
                        return (<tr className="tr-height">
                            <td className="border-right border-bot pl-2">{elem.name}</td>
                            <td className="text-center border-right border-bot">{elem.ammount}</td>
                            <td className="text-center border-right border-bot">{elem.code}</td>
                            <td className="text-center border-right border-bot">{elem.cellAmmount}</td>
                        </tr>)
                    })}
                </tbody>
            
            </table>
            
        </div>
    </div>)
}

export default Bonus1