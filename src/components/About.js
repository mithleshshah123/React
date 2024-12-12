
import User from "./User";
import React from "react";
import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../utils/UserContext";

class About extends Component {

    constructor(props){
        super(props);
        // console.log("parent constructor");
    }

    componentDidMount(){
        // console.log("Parent componentdid mount");
    }

    render(){
        // console.log("parent render");
        return(
            <div>
            <h1>About</h1>
            <div>
                loggedIn User
                <UserContext.Consumer>
                    {(loggedInUser) => (<h1 className="text-xl font-bold">{loggedInUser}</h1>)}
                </UserContext.Consumer>
            </div>
            <h2>This is Namaste react web Series</h2>
            <UserClass name ={"Mithlesh shah (class)"} location = {"Bhopal(class)"} />
        </div>
        );
    }
}

// const About = () => {
//     return (
//         <div>
//             <h1>About</h1>
//             <h2>This is Namaste react web Series</h2>
//             <UserClass name ={"Mithlesh shah (class)"} location = {"Bhopal(class)"} />
//         </div>
//     )
// };

export default About;