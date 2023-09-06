import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import Header from "../../components/Header";

const RequestStatus = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.info("current user name: " + user.name);
    const url = "http://localhost:8080/userrequests/" + user.name;
    // const url = "https://lumenapi.eastus.cloudapp.azure.com:8443/userrequests/" + user.name;

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(setRequests)
      .then(() => setLoading(false))
      .catch(setError);
    // console.log(requests[0]);
    // console.log(requests[0].text);
    // console.log(requests);

  }, [user]);

  if (loading) return <h2>...</h2>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (user.name === 'unknown') {
    return <Typography 
      mt="10px"
      align="center" 
      variant="h2" 
      color="silver" 
    >
      You must sign in to view this page...
    </Typography>
  }
  if (!requests) return null;
  
  return (
    <Box m="20px">
      <Header title="REQUEST STATUS" subtitle="" />

      <Box m="20px">
        <RequestList
          data={requests}
          renderEmpty={<h3>zero pending requests...</h3>}
          renderItem={(request) => (
            <>
              <p>
                <b>{request.id} Posted by: {request.empId}</b><br />
                {request.firstName} {request.lastName}<br />
                {request.justification}
              </p>
            </>
          )}
        />
      </Box>

    </Box>
  );

};

function RequestList({ data, renderItem, renderEmpty }) {
  return !data.length ? (
    renderEmpty
  ) : (
    <>
    <h3>In-Progress:</h3>
    {data.map((request, index) => (
        <div className="request" key={index + ': ' + request.text}>
            {renderItem(request)}
        </div>
    ))}
    </>
  );
}

export default RequestStatus;
