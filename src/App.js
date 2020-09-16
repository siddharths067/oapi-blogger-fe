import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import SignIn from "./SignIn";
import cookie from 'react-cookies'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: this.props.match.params.offset
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);

  }

  logoutHandler(e) {
    axios.post(`http://localhost:8080/logout`, {}, {
      headers: {
        "X-API-KEY": cookie.load(`X-API-KEY`)
      }
    })
    window.location.href = "/";
  }
  componentDidMount() {

    console.log(cookie.load(`X-API-KEY`))
    axios.get(`http://localhost:8080/feed/${this.state.offset}`, {
      headers: {
        "X-API-KEY": cookie.load(`X-API-KEY`)
      }
    }).then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(console.error)

  }
  commentSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:8080/story", {
      title: this.state.title,
      content: this.state.content
    }, {
      headers: {
        "X-API-KEY": cookie.load(`X-API-KEY`)
      }
    }).then(res => {
      if(res.status !== 200)
        alert(`Your Session has expired or your title was empty`);
      window.location.reload(false);
      // this.setState({
      //   title: null,
      //   content: null
      // })
    }).catch(err => {
      console.error(err);
    })
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }
  render() {
    var arr = [];
    if (this.state.posts !== undefined)
      arr = this.state.posts;
    return <>
      <form onSubmit={this.commentSubmit}>
        <TextField id={"title"} label="Title Of Story" onChange={this.handleTitleChange}
          value={this.state.text} />
        <TextField id={"content"} label="What's on your mind?" onChange={this.handleContentChange}
          value={this.state.text} fullWidth multiline />
        <Button variant={"contained"} label="Logout"
          onClick={this.logoutHandler}>{"Logout"}</Button>
        <Button variant={"contained"} label="Submit"
          type="submit">{"Post Story"}</Button>
      </form>
      <a href={`http://localhost:3000/feed/${parseInt(this.props.match.params.offset)?parseInt(this.props.match.params.offset)-1:0}`}>
        <Button variant={"contained"}>Previous Page</Button>
      </a>
      <a href={`http://localhost:3000/feed/${parseInt(this.props.match.params.offset) + 1}`}>
        <Button variant={"contained"}>Next Page</Button>
      </a>
      {
        arr.map(post => {
          return <><br></br><a href={`http://localhost:3000/post/${post.id}`}>{post.title}</a></>;
        })
      }
    </>;
  }
}

class Login extends Component {
  render() {
    return (
      <SignIn />
    )
  }
}

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      data: null
    }
  }
  componentDidMount() {
    console.log(cookie.load(`X-API-KEY`))
    axios.get(`http://localhost:8080/post/${this.state.id}`, {
      headers: {
        "X-API-KEY": cookie.load(`X-API-KEY`)
      }
    }).then(res => {
      console.table(res.data);
      this.setState({
        data: res.data
      })
    }).catch(err => {
      console.error(err);
    })
  }
  render() {
    if (this.state.data !== null)
      return <Paper>
        <h1>{this.state.data.title}</h1>
        <p>{this.state.data.content}</p>
        <br></br>
        <b>Total Readers: </b> {this.state.data.read} <br></br>
        <b>Viewers Right Now:</b> {this.state.data.views}
      </Paper>;
    else return <Paper></Paper>
  }
}

function App() {
  return (
    <Router>
      <Route path={"/"} exact component={Login} />
      <Route path={"/feed/:offset"} component={Feed} />
      <Route path={"/post/:id"} component={PostPage} />
    </Router>
  );
}

export default App;
