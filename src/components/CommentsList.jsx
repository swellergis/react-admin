const CommentsList = ({ comments }) => {

    return (
        <>
        <h3>Comments:</h3>
        {comments.map((comment, index) => (
            <div className="comment" key={index + ': ' + comment.text}>
                <p>{comment.id} Posted by: {comment.empId}<br /><b>{comment.title}</b><br />{comment.text}</p>
            </div>
        ))}
        </>
    );

  };

export default CommentsList;
