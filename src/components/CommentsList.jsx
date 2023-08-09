import React, { useEffect, useState } from "react";

const CommentsList = ({ comments }) => {
  // derive initial state from props
  const [name, setName] = useState(comments);

    useEffect(() => {
        const fetchData = async () => {
            // console.log("comments have changed...");
            const newComments = comments;
            setName(newComments);
        };
        fetchData();
    }, [comments]);
    
  const createAccount = async () => {
    console.log("data: " + JSON.stringify(name));
    // data.map((item, i) => (
    //   console.log("item: " + item)
    // ));
  }

    return (
        <>
        <h3>Comments:</h3>
        <button onClick={createAccount} hidden>Create Account</button>
        {name.map((comment, index) => (
            <div className="comment" key={index + ': ' + comment.text}>
                <p><b>{comment.title}</b><br />{comment.text}<br />Posted by: {comment.empId}</p>
            </div>
        ))}
        </>
    );
};

export default CommentsList;
