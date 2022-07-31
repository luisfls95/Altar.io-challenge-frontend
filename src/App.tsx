import './App.css';
import FirstPage from './components/FirstPage';
import axios from 'axios';
import { useState, useRef} from 'react';
import {useInterval} from './components/customHooks'
import Bonus1 from './components/Bonus1';

type dataResponseType = {
  grid: Array<string>[],
  code: number
}

type gridBaseParamsType = {
  inputLetter: string,
  rowNum: number,
  colNum: number
}

type individualPayment = {
  name: string,
  ammount: number,
  code: number,
  cellAmmount: string,
  grid: Array<string>[]
}
const numRows: number = 10
const numCols: number = 10
const templateGrid: Array<string>[] = []
for (let a=0; a<numRows; a++){
  templateGrid.push([])
  for (let b=0; b<numCols; b++){
    templateGrid[templateGrid.length-1].push("-")
  }
}

function App() {
    const apiBaseUrl: string = "http://localhost:3002/"
    const [code, setCode] = useState<number>(0)
    const [inputLetter, setInputLetter] = useState<string>("")
    const [grid, setGrid] = useState<any[]>(templateGrid)
    const [live, setLive] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<string>('firstPage')
    const availableLetters: string = " abcdefghijklmnopqrstuvwxyz"
    const [paymentName, setPaymentName] = useState<string>("")
    const [paymentAmmount, setPaymentAmmount] = useState<number>(0)
    const [paymentList, setPaymentList] = useState<Array<individualPayment>>([])
    


    // toggle requests to server
    const clickTimer = (): void => {
        setLive(!live)
    }

    // request to server and handle response
    const makeRequest = async (): Promise<void>=>{
        if (!live) return
        const rowNum: number = 10
        const colNum: number = 10
        const dataToSend: gridBaseParamsType = {inputLetter, rowNum, colNum}
        //console.log(dataToSend)
        try {
          const {data/*, statu*/} = await axios.post<dataResponseType>(apiBaseUrl+"api/getGridAndCode", dataToSend)
          setGrid(data.grid)
          setCode(data.code)
        }
        catch(error){
          console.log(error)
        }
    }

    // change the any
    const inputHandleChange = (e:any): void => {
        if (e.target.value.length > 1) {
        const lastChar: string = e.target.value[e.target.value.length -1]
        if (availableLetters.includes(lastChar)) {
          setInputLetter(lastChar)
        }
        else{
          window.alert("Selected character is invalid")
        }
        }
        else if (availableLetters.includes(e.target.value)){
          setInputLetter(e.target.value)
        }
    }

    const onClickChangePage = (): void => {
      if (currentPage == 'firstPage') setCurrentPage('bonus1')
      else setCurrentPage('firstPage')
    }

    const addPaymentToList = () => {
      if (code == 0){
        window.alert("start generator")
        return
      }
      if (paymentName == "") {
        window.alert("Fill in payment name")
        return
      }
      
      setPaymentList([...paymentList, {name: paymentName, ammount: paymentAmmount, code: code, cellAmmount: grid.length + "x" + grid[0].length, grid: grid}])
    }

    useInterval(()=>{makeRequest()}, 2000)

    let contentJSX
    if (currentPage == 'firstPage') contentJSX = <FirstPage onChangeHandle={inputHandleChange} onClickHandle={clickTimer} inputLetter={inputLetter} grid={grid} liveStatus={live} code={code}/>
    else if (currentPage == 'bonus1') contentJSX = <Bonus1 liveStatus={live} code={code} paymentNameHandle={setPaymentName} paymentAmmountHandle={setPaymentAmmount} addPayment={addPaymentToList} list={paymentList}/>

    return (
        <div className='body-margins'>
          <button className='mt-2' onClick={onClickChangePage}>Change page</button>
          {contentJSX}
        </div>
    );
}

export default App;
