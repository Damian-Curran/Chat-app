import React, {Component} from 'react';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            err: "",
            response: [],
            connection: 0,
            ws: ""
        }
    }
    
    componentDidMount(){
        const socket = new WebSocket('ws://localhost:8080/name');
        if(!socket.onopen){
            this.setState({err: "Connection was not established"});
        }

        socket.onopen = () =>{
            console.log("connected")
            
            this.setState({ws: socket, connection: 1});

            socket.addEventListener('message', async (event) => { 
              const response = event.data;
              this.state.response.push(response);
              this.setState({response: this.state.response}); 
            });
        }
    }
    
    disconnect() {
        var ws = this.state.ws;

        if(ws){
            if (ws != null) {
                ws.close();
            }
            this.setState({ws: ""});
            console.log("Disconnected");
        }
    }
    
    sendName() {
        var ws = this.state.ws;

        if(ws){
            ws.send("damian curran");
        }
    }

    render(){
        const responses = [];

        for(const [index, value] of this.state.response.entries()){
            responses.push(<li key={index}> {value} </li>)
        }

        return(
            <div>
                Welcome Home
                <div> {this.state.err} </div>
                <div> {responses} </div>
                <button onClick={this.sendName.bind(this)}> Send to websocket </button>
                <button onClick={this.disconnect.bind(this)}> Disconnect from websocket </button>
            </div>
        )
    }
}

export default Home;