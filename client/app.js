import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      roomName: "No room selected!",
      userName: ""
    };
  }

  componentDidMount() {
    // WebSockets Receiving Event Handlers
    this.state.socket.on("connect", () => {
      console.log("connected");
      var userName = prompt("Enter a Username");
      this.state.socket.emit("This person has joined:", userName);
      this.setState({
        userName: userName
      });
    });

    this.state.socket.on("errorMessage", message => {
      if (!this.state.userName) {
        alert("Enter a Username!!");
      } else if (message) {
        alert(message);
      }
    });
  }

  join(room) {
    // room is called with "Party Place"
    this.setState({ roomName: room });
    this.state.socket.emit("room", this.state.roomName);
  }

  render() {
    return (
      <div>
        <h1>React Chat</h1>
        <button className="btn btn-default" onClick={room => this.join(room)}>
          Join the Party Place
        </button>
        {/* \\\\\\ does this go in the button/////// */}
        <ChatRoom
          socket={this.state.socket}
          roomName={this.state.roomName}
          userName={this.state.userName}
        />
      </div>
    );
  }
}

export default App;
