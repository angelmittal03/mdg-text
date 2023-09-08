import { render, Component } from "preact";

export default class Editor extends Component {
  constructor() {
    super();
    this.state = {
      msg: "",
    };
    this.ws = null
  }
 
  componentDidMount() {
    this.connect();
}

timeout = 250; // Initial timeout duration as a class variable

/**
 * @function connect
 * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
 */
connect = () => {
    var ws = new WebSocket(`ws://localhost:8080/start_web_socket?username=${this.props.conn}`);
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
        console.log("connected websocket main component");

        this.ws = ws

        that.timeout = 250; // reset timer to 250 on open of websocket connection 
        clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
        console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                10000 / 1000,
                (that.timeout + that.timeout) / 1000
            )} second.`,
            e.reason
        );

        that.timeout = that.timeout + that.timeout; //increment retry interval
        connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
        console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
        );

        ws.close();
    };
    ws.onmessage = e =>{
      let msg = JSON.parse(e.data).message
      console.log("recieved");

      this.setState({ msg:msg});
    }
};

/**
 * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
 */
check = () => {
    const { ws } = this.ws;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
};

sendMessage=()=>{
  const {msg} = this.state // websocket instance passed as props to the child component.

  try {
      let txt = JSON.stringify({
          event: "send-message",
          username: this.props.conn,
          message: msg,
        })
      
      this.ws.send(txt) //send data to the server
  } catch (error) {
      console.log(error) // catch error
  }
}
handleInput=(e)=>{
  const msg = e.target.value; // Get the updated value directly from the event
  console.log(msg);
  
  // Use the callback form of setState to ensure the state is updated properly
  this.setState({ msg: msg }, () => {
    console.log(this.state.msg);
    this.sendMessage();
  });

}




render() {
    return <input type="text" value={this.state.msg} onInput={this.handleInput} />
}

}