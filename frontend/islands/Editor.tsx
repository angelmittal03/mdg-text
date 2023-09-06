import { useEffect,useState } from "preact/hooks";


// const socket = io("http://localhost:8080/")

export default function Editor() {
  const [msg,setMsg] = useState<string>('')
  // const websocket = new WebSocket("ws://localhost:8080/start_web_socket?username=bitch")
  // // setTimeout(()=>{
  // //   console.log("wait...")
  // // },2000)
  //   // websocket.onopen = () => {
  //   //     setInterval(() => {
  //   //         websocket.send(`Client says hello`)
  //   //     }, 2000)
  //   // }
  //   websocket.onmessage = (message) => {
  //     const m = JSON.parse(message.data)
  //     // setMsg(message.data)
  //       // console.log(msg)
  //       console.log(m)
  //   }
    useEffect(() => {
      let ws = new WebSocket('ws://localhost:8080/start_web_socket?username=bitch');
      ws.onopen = () => console.log('ws opened');
      ws.onclose = () => console.log('ws closed');
  
      ws.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log('e', message);
      };
  
      return () => {
        ws.close();
      }
    }, []);

    



    return(
      <h1>{msg}</h1>
    )
}
