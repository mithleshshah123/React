import React from "react";
import ReactDOM from "react-dom/client";

const Title = () =>  (<h1 className="heading" tabIndex="5">Namaste React using JSX!</h1>);

// console.log(heading);
const number = 1000;

const HeadingComponent = () =>(
    <div id="container">
        <Title/>
        {Title()}
        <h1 className="heading">Namaste React using Functional Component!</h1>
    </div>
);

// console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent/>);