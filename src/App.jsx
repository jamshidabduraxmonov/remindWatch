import {useState, useEffect} from 'react';



export default function RemindWatch() {

  const [time, setTime] = useState([]);
  const [minute, setMinute] = useState();
  const [isOn, setIsOn] = useState(false);
  const [interVal, setInterVal] = useState(2);
  const [countChange, setCountChange] = useState(0);

  useEffect(()=> {
    setInterval(()=> {
      const srcData = new Date();

      const hour = srcData.getHours();
      const min = srcData.getMinutes();
      const sec = srcData.getSeconds();

      setMinute(sec);
      setTime([hour, ':', min, ':', sec]);
    }, 1000);

    /*
      1) Every time min changes
      2) console.log() the alert message
    */

   

  }, []);

   const intervalPlay = async () => {
        const audio = new Audio("src/assets/beep.mp3");
        await audio.play();
      }
 

   useEffect(()=> {
    if(!isOn) return; 
    let tempValue = countChange;
    tempValue++;
    setCountChange(tempValue);

    if(tempValue === interVal){
      intervalPlay();
      setCountChange(0);
    }

    }, [minute]);

  
      /* New Interval Logic
        1) Everytime min changes add 1 to the countChange
        2) When countChange is equal to the interVal - Beeep!!!
        3) The moment 'beep' happens set the countChange back to 0
        4) Synchronize the interVal state with the UI input
    */

    


    
  

  return(
    <div>
      <h1 className=''>{time}</h1>
      <input type="number" />

      {
        !isOn ? (
          <button onClick={() => setIsOn(true)}>Switch On</button>
        ) : (
          <button onClick={() => setIsOn(false)}>Switch Off</button>
        )
      }
    </div>
    )
}