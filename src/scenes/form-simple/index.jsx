import React, { useEffect, useState, forwardRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const FormSimple = ({ user }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // alert dialog
  const [open, setOpen] = useState(false);

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

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') 
    {
        return;
    }
    setOpen(false);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    // console.log(user.name);
    values.empId = user.name;

    // post user input
    const target = "http://localhost:8080/comments";
    const opts = {
      method: "POST",
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(target, opts);

    resetForm();

    // add new comment to our current list
    comments.push(values);
    // console.log("new comments: " + JSON.stringify(comments));

    // show success dialog
    setOpen(true);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!comments) return null;
  
  return (
    <Box m="20px">

      <Header title="CREATE COMMENT" subtitle="Create a New Comment" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={user.name}
                name="empId"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Comment"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.text}
                name="text"
                error={!!touched.text && !!errors.text}
                helperText={touched.text && errors.text}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="info" variant="contained">
                Create New Comment
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Box m="20px" sx={{ display: 'none' }}>
        <CommentList
          data={comments}
          renderEmpty={<h3>no comment...</h3>}
          renderItem={(comment) => (
            <>
              <p>{comment.id} Posted by: {comment.empId}<br /><b>{comment.title}</b><br />{comment.text}</p>
            </>
          )}
        />
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
            New comment added...
        </Alert>
      </Snackbar>

    </Box>
  );

};

const checkoutSchema = yup.object().shape({
//   empId: yup.string().required("required"),
  title: yup.string().required("required"),
  text: yup.string().required("required"),
});

const initialValues = {
  empId: "",
  title: "",
  text: "",
};

function CommentList({ data, renderItem, renderEmpty }) {
  return !data.length ? (
    renderEmpty
  ) : (
    <>
    <h3>Comments:</h3>
    {data.map((comment, index) => (
        <div className="comment" key={index + ': ' + comment.text}>
            {renderItem(comment)}
        </div>
    ))}
    </>
  );
}

export default FormSimple;
