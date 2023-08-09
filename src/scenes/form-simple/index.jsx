import React, { useEffect, useState, forwardRef } from "react";
import CommentsList from '../../components/CommentsList';
import { Box, Button, TextField } from "@mui/material";
import { Formik, useFormikContext } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import useUser from '../../hooks/useUser';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const FormSimple = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("unknown");
  const [open, setOpen] = useState(false);

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

  const handleFormSubmit = (values) => {
    values.empId = username;

    const target = "http://localhost:8080/comments";
    fetch(target, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
    });

    comments.push(values);
    // console.log("new comments: " + JSON.stringify(comments));

    // show success dialog
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
        if (user) {
            setUsername(user.name);
            // console.log("username: " + username);
        }

        const testname = user ? user.name : "foo";
        // console.log("username: " + username);
        const url = "http://localhost:8080/usercomments/" + testname;
    
        try {
            const response = await fetch(url);
            const json = await response.json();
            // console.log(json[0]);
            // console.log(json[0].text);
            // console.log(json);
            setComments(json);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
  }, [user]);

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
                value={username}
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
      <Box m="20px">
        <CommentsList comments={comments} />
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

export default FormSimple;
