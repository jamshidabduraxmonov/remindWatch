import {useState, useEffect, useRef} from 'react';



export default function RemindWatch() {

  const [time, setTime] = useState([]);
  const [minute, setMinute] = useState();
  const [isOn, setIsOn] = useState(false);
  const [interVal, setInterVal] = useState(0);
  const [countChange, setCountChange] = useState(0);

  const [isPomodoro, setIsPomodoro] = useState(false);

  const [isOptimal, setIsOptimal] = useState(false);
  const [isDeep, setIsDeep] = useState(false);
  const [isHyperDeep, setIsHyperDeep] = useState(false);

  let workRef = useRef(true);


 



  useEffect(()=> {
    setInterval(()=> {
      const srcData = new Date();

      let hour = srcData.getHours();
      let min = srcData.getMinutes();
      let sec = srcData.getSeconds();

      const formatHour = hour < 10 ? "0" + hour : hour;
      const formatMin = min < 10 ? "0" + min : min;
      const formatSec = sec < 10 ? "0" + sec : sec;

      setMinute(sec);
      setTime([formatHour, ':', formatMin, ':', formatSec]);
    }, 1000);

    /*
      1) Every time min changes
      2) console.log() the alert message
    */

   

  }, []);

   const intervalPlay = async () => {
        const audio = new Audio("src/assets/beep.mp3");
        // await audio.play();
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
    
    

    const runPomodoro = () => {
      if(isOn){
        alert("Please, stop the interval first!");
        return;
      }
      setIsPomodoro(true);
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


       <div>

        <button className="border-1 rounded-sm" onClick={()=> runPomodoro()}>Pomodoro</button>
        
        
      </div>



      <div className="border-1 w-[70%] h-auto m-auto my-8 flex flex-col gap-8 p-4  ">
        <h1 className='text-center py-2 text-emerald-400 text-3xl'>{time}</h1>
        <input className='border-1 w-[30%] h-16 m-auto' value={interVal} name="quantity" min="0" onChange={(e) => {setInterVal(Math.abs(Number(e.target.value)))}} disabled={isOn}  type="number" />

        {
          !isOn ? (
            <button className="border-1 w-[30%] m-auto" onClick={() => (setIsOn(true))}>Switch On</button>
          ) : (
            <button className="border-1 w-[30%] m-auto" onClick={() => setIsOn(false)}>Switch Off</button>
          )
        }

      </div>


        { isPomodoro && (
          <div className="flex gap-8">
            <button className="border-1 p-2" onClick={()=> (setIsOptimal(true), setCountChange(0))}>Optimal Session</button>
            <button className="border-1 p-2" onClick={()=> (setIsDeep(true), setCountChange(0))}>Deep Session</button>
            <button className="border-1 p-2" onClick={()=> (setIsHyperDeep(true), setCountChange(0))}>Hyper Deep Session</button>
          </div>
          
        )         
        }
     
    </div>
    
    )
}