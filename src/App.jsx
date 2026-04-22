import {useState, useEffect} from 'react';



export default function RemindWatch() {

  const [time, setTime] = useState([]);
  const [minute, setMinute] = useState();

  useEffect(()=> {
    setInterval(()=> {
      const srcData = new Date();

      const hour = srcData.getHours();
      const min = srcData.getMinutes();
      const sec = srcData.getSeconds();

      setMinute(min);
      setTime([hour, ':', min, ':', sec]);
    }, 1000);

    /*
      1) Every time min changes
      2) console.log() the alert message
    */

   

  }, []);

   useEffect(()=> {
      console.log('1 minute past');
    }, [minute]);

  
  
    


    
  

  return(
      <div>{time}</div>
    )
}