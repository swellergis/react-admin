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
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // alert dialog
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // console.info("current user name: " + user.name);
    const url = "http://localhost:8080/userrequests/" + user.name;

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(setRequests)
      .then(() => setLoading(false))
      .catch(setError);
    // console.log(requests[0]);
    // console.log(requests[0].justification);
    // console.log(requests);

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
    const target = "http://localhost:8080/requests";
    const opts = {
      method: "POST",
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(target, opts);

    resetForm();

    // add new request to our current list
    requests.push(values);
    // console.log("new requests: " + JSON.stringify(requests));

    // show success dialog
    setOpen(true);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!requests) return null;
  
  return (
    <Box m="20px">

      <Header title="ZERO TRUST ACCESS REQUEST" subtitle="Create a New Request" />
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="SSN"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ssn}
                name="ssn"
                error={!!touched.ssn && !!errors.ssn}
                helperText={touched.ssn && errors.ssn}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="DOB"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Justification"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.justification}
                name="justification"
                error={!!touched.justification && !!errors.justification}
                helperText={touched.justification && errors.justification}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="info" variant="contained">
                Submit Request
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Box m="20px" sx={{ display: 'none' }}>
        <RequestList
          data={requests}
          renderEmpty={<h3>no pending requests...</h3>}
          renderItem={(request) => (
            <>
              <p>
                {request.id} Posted by: {request.empId}<br />
                <b>{request.lastName}</b><br />
                {request.justification}
              </p>
            </>
          )}
        />
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
            New request added...
        </Alert>
      </Snackbar>

    </Box>
  );

};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  ssn: yup.string().required("required"),
  dob: yup.string().required("required"),
  justification: yup.string().required("required"),
});

const initialValues = {
  empId: "",
  firstName: "",
  lastName: "",
  ssn: "",
  dob: "",
  justification: "",
};

function RequestList({ data, renderItem, renderEmpty }) {
  return !data.length ? (
    renderEmpty
  ) : (
    <>
    <h3>In-Progress:</h3>
    {data.map((request, index) => (
        <div className="request" key={index + ': ' + request.justification}>
            {renderItem(request)}
        </div>
    ))}
    </>
  );
}

export default FormSimple;
