import {useState, useEffect} from 'react';



export default function RemindWatch() {

  const [time, setTime] = useState([]);
  const [minute, setMinute] = useState();
  const [isOn, setIsOn] = useState(false);
  const [interVal, setInterVal] = useState(0);
  const [countChange, setCountChange] = useState(0);

  const [isWork, setIsWork] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(()=> {
    setInterval(()=> {
      const srcData = new Date();

      let hour = srcData.getHours();
      let min = srcData.getMinutes();
      let sec = srcData.getSeconds();

      const formatHour = hour < 10 ? "0" + hour : hour;
      const formatMin = min < 10 ? "0" + min : min;
      const formatSec = sec < 10 ? "0" + sec : sec;

      setMinute(min);
      setTime([formatHour, ':', formatMin, ':', formatSec]);
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
 
    const interRun = (gap) => {
      let tempValue = countChange;
      tempValue++;
      setCountChange(tempValue);

      if(tempValue === gap){
        intervalPlay();
        setCountChange(0);
      }
    }
      

   useEffect(()=> {
    if(!isOn) return; 
    interRun(interVal);
    
    }, [minute]);


    // Pomodoro useEffect()
    useEffect(() => {
      if(isWork){
        interRun(25);
        setIsWork(false);
        setIsBreak(true);
      }

      if(isBreak){
        interRun(5);
        setIsBreak(false);
        setIsWork(true);
      }

    }, [minute]);

  
    
      




      /* New Interval Logic
        1) Everytime min changes add 1 to the countChange
        2) When countChange is equal to the interVal - Beeep!!!
        3) The moment 'beep' happens set the countChange back to 0
        4) Synchronize the interVal state with the UI input
    */


        /* Pomodoro Preset logic:
         
        
        */
    


    
  

  return(
    <div>
      <h1 className="text-center py-8 text-3xl">RemindWatch</h1>

      <div className="border-1 w-[70%] h-auto m-auto my-8 flex flex-col gap-8 p-4  ">
        <h1 className='text-center py-2 text-emerald-400 text-3xl'>{time}</h1>
        <input className='border-1 w-[30%] h-16 m-auto' value={interVal} onChange={(e) => {setInterVal(Number(e.target.value))}} disabled={isOn}  type="number" />

        {
          !isOn ? (
            <button className="border-1 w-[30%] m-auto" onClick={() => setIsOn(true)}>Switch On</button>
          ) : (
            <button className="border-1 w-[30%] m-auto" onClick={() => setIsOn(false)}>Switch Off</button>
          )
        }
      </div>



      <div>
        {
          (isWork || isBreak) ? (
            <button className="border-1" onClick={() => (setIsWork(false) && setIsBreak(false))}>Pomodoro Off</button>
          ) : (
            <button className="border-1" onClick={()=> setIsWork(true)}>Pomodoro On</button>
          )
        }
      </div>
    </div>
    
    )
}