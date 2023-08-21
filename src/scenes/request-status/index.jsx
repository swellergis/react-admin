import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const RequestStatus = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.info("current user name: " + user.name);
    const url = "http://localhost:8080/usercomments/" + user.name;

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(setComments)
      .then(() => setLoading(false))
      .catch(setError);
    // console.log(comments[0]);
    // console.log(comments[0].text);
    // console.log(comments);

  }, [user]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!comments) return null;
  
  return (
    <Box m="20px">
      <Header title="REQUEST STATUS" subtitle="" />

      <Box m="20px">
        <CommentList
          data={comments}
          renderEmpty={<h3>zero pending requests...</h3>}
          renderItem={(comment) => (
            <>
              <p>{comment.id} Posted by: {comment.empId}<br /><b>{comment.title}</b><br />{comment.text}</p>
            </>
          )}
        />
      </Box>

    </Box>
  );

};

function CommentList({ data, renderItem, renderEmpty }) {
  return !data.length ? (
    renderEmpty
  ) : (
    <>
    <h3>In-Progress:</h3>
    {data.map((comment, index) => (
        <div className="comment" key={index + ': ' + comment.text}>
            {renderItem(comment)}
        </div>
    ))}
    </>
  );
}

export default RequestStatus;
