import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./Timeline.css";
import PropTypes from "prop-types";

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

const data = require("./data.json");
const fetchEvents = () => Promise.resolve(data).then(json => json.slice(0, 4));

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

/*class Header extends Component {
  render() {
    let searchInputClasses = ["searchInput"];

    if (this.state.searchVisible) {
      searchInputClasses.push("active");
    }
    return (
      // <div className="header">
        <div className="menuIcon">
          <div className="dashTop" />
          <div className="dashBottom" />
          <div className="circle" />
        </div>
        <span className="title">{this.props.title}</span>
        <input type="text" className="searchInput" placeholder="Search..." />
        <div className="fa fa-search searchIcon" />
      </div> ///
      <div className="header">
        <div className="fa fa-more" />
        <span className="title">{this.props.title}</span>
        <input
          type="text"
          className={searchInputClasses.join("")}
          placeholder="Search..."
        />
        <div className="fa fa-search searchIcon" />
      </div>
    );
  }
}*/

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVisible: false
    };
  }
  showSearch() {
    this.setState({
      searchVisible: !this.state.searchVisible
    });
  }

  render() {
    // Classes to add to the <input /> element
    let searchInputClasses = ["searchInput"];

    // Update the class array if the state is visible
    if (this.state.searchVisible) {
      searchInputClasses.push("active");
    }

    const wrapperStyle = {
      backgroundColor: "rgba(251,202,43,1)"
    };
    const titleStyle = {
      color: "#111111"
    };

    const menuColor = {
      backgroundColor: "#111111"
    };
    return (
      <div style={wrapperStyle} className="header">
        <div className="menuIcon">
          <div className="dashTop" style={menuColor} />
          <div className="dashBottom" style={menuColor} />
          <div className="circle" style={menuColor} />
        </div>
        <span style={titleStyle} className="title">
          {this.props.title}
        </span>

        <input
          type="text"
          className={searchInputClasses.join(" ")}
          placeholder="Search ..."
        />

        <div
          style={titleStyle}
          onClick={this.showSearch.bind(this)}
          className="searchIcon"
        />
      </div>
    );
  }
}
Header.defaultProps = {
  title: "Github activity"
};
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

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
  }

  componentWillMount() {
    this.setState({ activities: data });
  }

  onComponentRefresh() {
    this.setState({ refreshing: false });
  }

  render() {
    const { refreshing } = this.state;
    return (
      /* <div className="content">
        <div className="line" />
        {activities.map(activity => <ActivityItem activity={activity} />)}
      </div>*/
      <div className="notificationsFrame">
        <div className="panel">
          <Header title="Github activity" />
          <Content
            onComponentRefresh={this.onComponentRefresh.bind(this)}
            requestRefresh={refreshing}
            fetchData={fetchEvents}
          />
          <Footer>
            <button onClick={this.refresh.bind(this)}>
              <i className="fa fa-refresh" />
              Refresh
            </button>
          </Footer>
        </div>
      </div>
    );
  }
}

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []
    };
  }
  componentWillMount() {
    this.setState({ activities: data });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.requestRefresh !== this.props.requestRefresh) {
      this.setState({ loading: true }, this.updateData);
    }
  }
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

class Footer extends Component {
  render() {
    return <div className="footer">{this.props.children}</div>;
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

  componentDidMount() {
    this.setTimer();
  }
  componentWillMount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
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

Clock.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  isOn: PropTypes.bool,
  onDisplay: PropTypes.fun,
  symbol: PropTypes.symbol,
  user: PropTypes.object,
  name: PropTypes.node,
  alarmColor: PropTypes.oneOfType(["red", "blue", "green"])
};
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

//Ejemplo Custom types
/*
UserLink.PropTypes = {
  userWithName: (props, propName, componentName) => {
    if (!props[propName] || !props[propName].name) {
      return new Error(
        "Invalid " +
          propName +
          ":no name property defined for component " +
          componentName
      );
    }
  }
};
*/

//const style = { color: "blue" };
//<div style={style}>this text will have the color blue</div>;
export default App;
