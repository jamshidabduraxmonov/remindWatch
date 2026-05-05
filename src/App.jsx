import {useState, useEffect, useRef} from 'react';



export default function RemindWatch() {

  const [time, setTime] = useState([]);
  const [minute, setMinute] = useState();
  const [hour, setHour] = useState();
  const [isOn, setIsOn] = useState(false);
  const [interVal, setInterVal] = useState(0);
  const [countChange, setCountChange] = useState(0);

  const [isPomodoro, setIsPomodoro] = useState(false);

  const [isOptimal, setIsOptimal] = useState(false);
  const [isDeep, setIsDeep] = useState(false);
  const [isHyperDeep, setIsHyperDeep] = useState(false);

  let workRef = useRef(true);

  const [isInterval, setIsInterval] = useState(false);

  const [activeBtn, setActiveBtn] = useState("");

  const [isAlarmPage, setIsAlarmPage] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [wakeUpH, setWakeUpH] = useState();
  const [wakeUpM, setWakeUpM] = useState();


 



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
      setHour(hour);
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
        console.log('Well, Beeep...');
      }
 
    const interRun = (gap) => {
      let tempValue = countChange;
      tempValue++;
      setCountChange(tempValue);

      if(tempValue >= gap){
        intervalPlay();
        setCountChange(0);
        workRef.current = !workRef.current;
      }

      console.log('gap: ', gap, 'temp: ', tempValue);
    }
      

   useEffect(()=> {
    if(!isOn) return; 
    interRun(interVal);
    
    }, [minute]);


    // // Pomodoro useEffect()
    // useEffect(() => {
    //   if(isOptimal){
    //     setIsDeep(false);
    //     setIsHyperDeep(false);
    //     isWork && (interRun(25), setIsWork(false), setIsBreak(true));
    //     isBreak && (interRun(5), setIsBreak(false), setIsWork(true));
    //   }else if(isDeep) {
    //     setIsOptimal(false);
    //     setIsHyperDeep(false);
    //     isWork && (interRun(50), setIsWork(false), setIsBreak(true));
    //     isBreak && (interRun(10), setIsBreak(false), setIsWork(true));
    //   }else if(isHyperDeep) {
    //     setIsDeep(false);
    //     setIsOptimal(false);
    //     isWork && (interRun(90), setIsWork(false), setIsBreak(true));
    //     isBreak && (interRun(15), setIsBreak(false), setIsWork(true));
    //   }
    

    // }, [minute]);

  
    /* New Bug-free Pomodoro feature logic
        1) every single pomodoro mode has its own useEffect
        2) Each of the modes acticated will deactivate the rest of the modes
        3) No use 'setState()' for work/breaks, just inside variables
    */
    useEffect(() => {
      if(isOptimal){
        setIsDeep(false);
        setIsHyperDeep(false);
        
        workRef.current ? (interRun(25)) : (interRun(5)); 
        console.log("workRef: ", workRef.current );
      }
    }, [isOptimal, minute]); 
    
    
    useEffect(() => {
      if(isDeep){
        setIsOptimal(false);
        setIsHyperDeep(false);
        
        workRef.current ? (interRun(50)) : (interRun(10)); 
        console.log("workRef: ", workRef.current );
      }
    }, [isDeep, minute]);



    useEffect(() => {
      if(isHyperDeep){
        setIsOptimal(false);
        setIsDeep(false);
        
        workRef.current ? (interRun(90)) : (interRun(15)); 
        console.log("workRef: ", workRef.current );
      }
    }, [isHyperDeep, minute]);
    
    
    useEffect(()=> {
      if(!isAlarm) return;
      if( (Number(wakeUpH) === hour) && (Number(wakeUpM) === minute) ) {
        intervalPlay();
      }
      console.log("isAlarm: ", isAlarm);
      console.log("Next alarm: ", wakeUpH, ":", wakeUpM);
    }, [minute])



    const runPomodoro = () => {
      if(isOn){
        alert("Please, stop the interval first!");
        return;
      }
      setIsPomodoro(true);
      setIsInterval(false);
      setIsAlarmPage(false);
    }

    const runInterval = () => {
      setIsInterval(true);
      setIsPomodoro(false);
      setIsAlarmPage(false);
    }

    const runAlarmPage = () => {
      setIsAlarmPage(true);
      setIsInterval(false);
      setIsPomodoro(false);
      console.log("Alarm page: ", isAlarmPage);
    }


  
    


      /* New Interval Logic
        1) Everytime min changes add 1 to the countChange
        2) When countChange is equal to the interVal - Beeep!!!
        3) The moment 'beep' happens set the countChange back to 0
        4) Synchronize the interVal state with the UI input
    */

    


    
  

  return(
    <div>
      <h1 className="text-center py-8 text-3xl">RemindWatch</h1>


       <div className=" flex justify-evenly">

          <button className={`border-1 rounded-sm px-2 ${(activeBtn === "b1") ? 'bg-red-500' : 'bg-red-300'}`} onClick={()=> (runInterval(), setActiveBtn("b1"))} >Interval</button>
          <button className={`border-1 rounded-sm px-2 ${(activeBtn === "b2") ? 'bg-red-500' : 'bg-red-300'}`} onClick={()=>  (runPomodoro(), setActiveBtn("b2"))}>Pomodoro</button>
          <button className={`border-1 rounded-sm px-2 ${(activeBtn === "b3") ? 'bg-red-500' : 'bg-red-300'}`} onClick={()=>  (runAlarmPage(), setActiveBtn("b3"))}>Alarm</button>

        
        </div>


      { isInterval && (
        <div className="border-1 w-[70%] h-auto m-auto my-8 flex flex-col gap-8 p-4  ">
        <h1 className='text-center py-2 text-emerald-400 text-3xl'>{time}</h1>
        <input className='border-1 w-[30%] h-16 m-auto text-center text-2xl focus:border-red-400' value={interVal} name="quantity" min="0" onChange={(e) => {setInterVal(Math.abs(Number(e.target.value)))}} disabled={isOn}  type="number" />


       {/*ToDo: Drum Roll*/
        <div className=" snap-y border mx-auto w-[20%] h-18 flex flex-col items-center overflow-y-scroll scroll-smooth">
          <div className="bg-gray-300 opacity-40 border w-[12%] h-4 absolute my-6"></div>
            <ul className="border">
              <li className="snap-center">0</li>
              <li className="snap-center">1</li>
              <li className="snap-center">2</li>
              <li className="snap-center">3</li>
              <li className="snap-center">4</li>
              <li className="snap-center">5</li>
              <li className="snap-center">6</li>
              <li className="snap-center">7</li>
              <li className="snap-center">8</li>
            </ul>
            
        </div>  
       } 

        {
          !isOn ? (
            <button className="border-1 w-[30%] m-auto" onClick={() => (setIsOn(true))}>Switch On</button>
          ) : (
            <button className="border-1 w-[30%] m-auto" onClick={() => setIsOn(false)}>Switch Off</button>
          )
        }

          </div>
      )}

      


        { isPomodoro && (
          <div className="flex gap-8 m-4">
            <button className="border-1 p-2" onClick={()=> (setIsOptimal(true), setCountChange(0))}>Optimal Session</button>
            <button className="border-1 p-2" onClick={()=> (setIsDeep(true), setCountChange(0))}>Deep Session</button>
            <button className="border-1 p-2" onClick={()=> (setIsHyperDeep(true), setCountChange(0))}>Hyper Deep Session</button>
          </div>
          
        )}


        { isAlarmPage && (
          <div>
            <div className="flex flex-col w-[50%] items-center m-auto p-4 border mt-4 gap-2 rounded bg-gray-100">

                <div className="border px-4 rounded">
                  <p className="text-2xl text-emerald-500">{(!wakeUpH || !wakeUpM) ? ("00:00") : (wakeUpH + ":" + wakeUpM)}</p>
                </div>

                <input className="border-2" type="number" min="0" placeholder='hour' value={wakeUpH} onChange={(e)=> setWakeUpH(Number(e.target.value))} />
                <input className="border-2" type="number" min="0" placeholder='min' value={wakeUpM} onChange={(e)=> setWakeUpM(Number(e.target.value))}/>
                {
                  isAlarm ? (
                    <button className="border-2 p-1 rounded bg-emerald-500" onClick={()=> setIsAlarm(false)}>Alarm On</button>
                  ) : (
                    <button className="border-2 p-1 rounded bg-emerald-200" onClick={()=> setIsAlarm(true)}>Alarm Off </button>
                  )
                }
            </div>
             
          </div>
        )

        }


     
    </div>
    
    )
}