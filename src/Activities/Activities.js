import React, { useState, useEffect } from "react";
import { Button, Container, Grid } from "@material-ui/core";

import Activity from "./Activity/Activity";

const Activities = () => {
  const [activities, setActivities] = useState([{ description: "test" }]);

  useEffect(() => {
    function fetchData() {
      fetch("http://78.82.184.12:55502/activities")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setActivities(data);
        });
    }
    fetchData();
  }, []);

  const handleRemoveActivity = (index) => {
    activities.splice(index, 1);
    setActivities([...activities]);
  };

  const handleAddActivity = () => {
    setActivities([...activities, { description: "test" }]);
  };

  console.warn(activities);
  return (
    <Container>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={3}
      >
        <Grid item>
          <Button
            onClick={handleAddActivity}
            variant="contained"
            color="primary"
          >
            Add activity
          </Button>
        </Grid>
        {activities.map(({ activity, index }) => (
          <Grid item>
            <Activity
              removeActivity={handleRemoveActivity}
              index={index}
              activity={activity}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Activities;
