import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./Timeline.css";

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
          <Content />
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

class Content extends Component {
  render() {
    return (
      <div className="content">
        <div className="line" />

        {/* Timeline item */}
        <div className="item">
          <div className="avatar">
            <img
              alt="Doug"
              src="http://www.croop.cl/UI/twitter/images/doug.jpg"
            />
            Doug
          </div>

          <span className="time">An hour ago</span>
          <p>Ate lunch</p>
          <div className="commentCount">2</div>
        </div>

        {/* ... */}
      </div>
    );
  }
}

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

export default App;
