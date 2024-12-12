import { useState } from "react";

const User = ({name}) => {
    const [count] = useState("0");
    return (
        <div className="user-card">
            <h1>Count: {count}</h1>
            <h1>Name: {name}</h1>
            <h2>Location: Bhopal</h2>
            <h2>Contact: mithlesh0@ </h2>
        </div>
    );
};

export default User;