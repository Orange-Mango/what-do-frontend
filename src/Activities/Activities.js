import React, { useState, useEffect } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import { useTransition, animated } from "react-spring";

import Activity from "./Activity/Activity";
import storage from "../utils/storage";

const Activities = () => {
  const [activities, setActivities] = useState([
    { key: 0, description: "a", tags: ["HEALTH"] },
    { key: 1, description: "b", tags: ["FOOD", "LEARNING"] },
    { key: 2, description: "c", tags: ["SHOW"] }
  ]);

  const [index, setIndex] = useState(activities.length);

  useEffect(() => {
    function fetchData() {
      let seenActivities = storage.getSeenActivities();
      let queryParams = seenActivities.map(id => `not=${id}`).join("&");
      fetch(`http://localhost:5000/activities/ordered?${queryParams}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let mappedData = data.map(item => {
            return {
              key: item.id,
              description: item.description,
              tags: ["HARDCORE", "HARDCODED"]
            };
          });
          setActivities(mappedData);
        });
    }
    fetchData();
  }, []);

  const handleRemoveActivity = index => {
    storage.addSeenActivity(index);
    let newActivities = [...activities];
    newActivities.pop();
    setActivities(newActivities);
  };

  const handleLikeActivity = index => {
    sendLike(index);
    handleRemoveActivity(index);
  };

  const handleAddActivity = () => {
    setIndex(index + 1);
    let newActivities = [...activities];
    newActivities.push({ key: index, description: "new" });
    setActivities(newActivities);
  };

  const transitions = useTransition(activities, p => p.key, {
    from: { opacity: 0, transform: `translate3d(100%,0,0)` },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-150%,0,0)" }
  });

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
        {transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            style={{
              ...props,
              marginTop: "500px",
              position: "absolute"
            }}
          >
            <Grid item>
              <Activity
                removeActivity={handleRemoveActivity}
                likeActivity={handleLikeActivity}
                activity={item}
              />
            </Grid>
          </animated.div>
        ))}
      </Grid>
    </Container>
  );
};

function sendLike(id) {
  fetch(`http://localhost:5000/activities/${id}/like`, {
    method: "PUT"
  });
}

export default Activities;
