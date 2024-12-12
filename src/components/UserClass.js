import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    // console.log("child constructor");

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
      }
    };
  }

  async componentDidMount(){
    // console.log("child componentdid mount");

    const data = await fetch("https://api.github.com/users/mithleshshah123");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });

    console.log(json);
  }

  render() {

    // console.log("child render");

    const { name, location, avatar_url} = this.state.userInfo;

    return (
      <div className="user-card">
        <img src={avatar_url}/>
        <h1>Name: {name} </h1>
        <h2>Location: {location} </h2> 
        <h2>Contact: mithleshshah123</h2>
      </div>
    );
  }
}

export default UserClass;
