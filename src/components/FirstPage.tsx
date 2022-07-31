import Main from './Main';
import Code from './Code';
import image from '../images/clock.png'



const FirstPage = (props: any) => {

    return (
        <div>
            <div className='options-container'>
                <div>
                    <div className='input-title'>Character</div>
                    <input onChange={props.onChangeHandle} value={props.inputLetter} placeholder="character"></input>
                </div>
                <img className='img-height' src={image}></img>
                <button type='button' className='options-button' onClick={props.onClickHandle}>{props.liveStatus ? "STOP GENERATOR": "GENERATE 2D GRID"}</button>
            </div>

            <Main data={props.grid}/>
            <Code liveStatus={props.liveStatus} code={props.code}/>
          </div>
    )
}

export default FirstPage