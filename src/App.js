import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./Timeline.css";

const activities = [
  {
    timestamp: new Date().getTime(),
    text: "Ate lunch",
    user: {
      id: 1,
      name: "Nate",
      avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
    },
    comments: [{ from: "Ari", text: "Me too!" }]
  },
  {
    timestamp: new Date().getTime(),
    text: "Woke up early for a beautiful run",
    user: {
      id: 2,
      name: "Ari",
      avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
    },
    comments: [{ from: "Nate", text: "I am so jealous" }]
  }
];
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="panel">
          <Header title="hola" />
          <Content activities={activities} />
          <Clock />
        </div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="menuIcon">
          <div className="dashTop" />
          <div className="dashBottom" />
          <div className="circle" />
        </div>
        <span className="title">{this.props.title}</span>
        <input type="text" className="searchInput" placeholder="Search..." />
        <div className="fa fa-search searchIcon" />
      </div>
    );
  }
}
/*
class Content extends Component {
  render() {
    const { activities } = this.props;
    return (
      <div className="content">
        <div className="line" />

        {activities.map(activity => {
          return (
            <div className="item">
              <div className="avatar">
                <img alt={activity.text} src={activity.user.avatar} />
                {activity.user.name}
              </div>

              <span className="time">{activity.timestamp}</span>
              <p>{activity.text}</p>
              <div className="commentCount">{activity.comments.length}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
*/

class Content extends Component {
  render() {
    const { activities } = this.props;
    return (
      <div className="content">
        <div className="line" />
        {activities.map(activity => <ActivityItem activity={activity} />)}
      </div>
    );
  }
}

class ActivityItem extends Component {
  render() {
    const { activity } = this.props;
    return (
      <div className="item">
        <div className="avatar">
          <img alt={activity.text} src={activity.user.avatar} />
          {activity.user.name}
        </div>

        <span className="time">{activity.timestamp}</span>
        <p>{activity.text}</p>
        <div className="commentCount">{activity.comments.length}</div>
      </div>
    );
  }
}

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }
  setTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.updateClock.bind(this), 1000);
  }
  updateClock() {
    const currentT = new Date();
    this.setState({ currentT: currentT }, this.setTimer);
  }

  getTime() {
    const currentT = new Date();
    return {
      hours: currentT.getHours(),
      minutes: currentT.getMinutes(),
      seconds: currentT.getSeconds(),
      ampm: currentT.getHours() >= 12 ? "pm" : "am"
    };
  }
  render() {
    const { hours, minutes, seconds, ampm } = this.state;
    return (
      <div className="clock">
        {hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:{minutes > 9
          ? minutes
          : `0${minutes}`}:{seconds > 9 ? seconds : `0${seconds}`} {ampm}
      </div>
    );
  }
}
/*
class Timeline extends React.Component {
  render() {
    return (
      <div className="notificationsFrame">
        <div className="panel">
          <div className="header">
            <div className="menuIcon">
              <div className="dashTop" />
              <div className="dashBottom" />
              <div className="circle" />
            </div>

            <span className="title">Timeline</span>

            <input
              type="text"
              className="searchInput"
              placeholder="Search ..."
            />

            <div className="fa fa-search searchIcon" />
          </div>
          <div className="content">
            <div className="line" />
            <div className="item">
              <div className="avatar">
                <img
                  alt="doug"
                  src="http://www.croop.cl/UI/twitter/images/doug.jpg"
                />
              </div>

              <span className="time">An hour ago</span>
              <p>Ate lunch</p>
            </div>

            <div className="item">
              <div className="avatar">
                <img
                  alt="doug"
                  src="http://www.croop.cl/UI/twitter/images/doug.jpg"
                />
              </div>

              <span className="time">10 am</span>
              <p>Read Day two article</p>
            </div>

            <div className="item">
              <div className="avatar">
                <img
                  alt="doug"
                  src="http://www.croop.cl/UI/twitter/images/doug.jpg"
                />
              </div>

              <span className="time">10 am</span>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <div className="item">
              <div className="avatar">
                <img
                  alt="doug"
                  src="http://www.croop.cl/UI/twitter/images/doug.jpg"
                />
              </div>

              <span className="time">2:21 pm</span>
              <p>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
*/
export default App;
