//Singele Selection
//Multi-selection
import {useState} from "react"
import data from "./data";
import "./styles.css";
export default function Accordion() {
    const [selected, setSelected] = useState(null); 
    const [enableMultiSelction, setEnableMultiSelction] = useState(false);
    const [multipleSelected, setMultipleSelected] = useState([]);
function handleSingleSelection(dataItemId){
    if(enableMultiSelction){
        let multiples = [...multipleSelected];
        const findIndex  = multiples.indexOf(dataItemId);
        if(findIndex === -1){
            multiples.push(dataItemId);
        }else{
            multiples.splice(findIndex,1);
        }
        setMultipleSelected(multiples);
    }else{

    setSelected(selected === dataItemId ? null : dataItemId);
    }
}
  return <div className="wrapper">
    <button onClick={() => {setEnableMultiSelction(!enableMultiSelction); setMultipleSelected([]); setSelected(null);}}>{`${!enableMultiSelction ? "Enable" : "Disable"} Muti-Selection` }</button>
    <div className="accordian">
        {
            data?.length > 0 ?
            data.map(dataItem=> 
                <div className="item">
                 <div onClick={() => handleSingleSelection(dataItem.id)} className="title">
                    <h3>{dataItem.question}</h3>
                    <span>+</span>
                </div>
                {
                    selected === dataItem.id || (multipleSelected.indexOf(dataItem.id) !== -1) ? (
                       <div className="content">
                            {dataItem.answer}
                       </div> 
                    ) : null
                }
                </div>) 
                : <div>No data found</div>
        }
    </div>
  </div>;

}
