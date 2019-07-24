import React from "react";
import { threadId } from "worker_threads";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: []
    };
  }

  componentDidMount() {
    //waiting for a message event

    this.props.socket.on("connect", () => {
      this.state.socket.on("message", message => {
        alert(message);
      });
    });

    // this.props.socket.emit("message", message => {
    //   message.key = JSON.stringify(message);
    //   this.setState(prevState => {
    //     let newMessages = prevState.messages;
    //     newMessages.push(message);

    //   });
    // });
  }

  componentWillReceiveProps(nextProps) {
    //// check if there has been a change to the roomName
    if (nextProps.roomName !== this.props.roomName) {
      this.setState({ messages: [] });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.socket.emit("message", message => {
      this.setState({
        message: message,
        messages: this.state.messages.concat({ username: this.props.username, message: message })
      });
    });
  }

  render() {
    <div>
      <div>
        <ul style="list-type:none">
          {this.props.state.messages.map(message => {
            <li>
              {message.username}: {message.message}
            </li>;
          })}
        </ul>
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            type="text"
            placeholder="Send message.."
            onChange={() => {
              this.setState({ message: "" });
            }}
            value={this.state.message}
          />
          <input type="submit" placeholder="Send" />
        </form>
      </div>
    </div>;
  }
}
