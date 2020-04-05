import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { useTransition } from "react-spring";

import Activity from "./Activity/Activity";
import storage from "../utils/storage";
import AddActivity from "./AddActivity/AddActivity";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [tags, setTags] = useState([
    { key: 0, label: "HEALTH" },
    { key: 1, label: "FOOD" },
    { key: 2, label: "LEARNING" },
    { key: 3, label: "SHOW" },
  ]);

  const [index, setIndex] = useState(activities.length);

  useEffect(() => {
    function fetchData() {
      let seenActivities = storage.getSeenActivities();
      let queryParams = seenActivities.map((id) => `not=${id}`).join("&");
      fetch(`http://78.82.184.12:55502/activities/ordered?${queryParams}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.warn(data);
          let mappedData = [
            { key: 0, description: "a", tags: [{ key: 0, label: "HEALTH" }] },
            { key: 1, description: "b", tags: [{ key: 1, label: "FOOD" }] },
            { key: 2, description: "c", tags: [{ key: 2, label: "LEARNING" }] },
          ];
          setActivities(mappedData);
        });
    }
    fetchData();
  }, []);

  const handleRemoveActivity = (index) => {
    storage.addSeenActivity(index);
    let newActivities = [...activities];
    newActivities.pop();
    setActivities(newActivities);
  };

  const handleLikeActivity = (index) => {
    sendLike(index);
    handleRemoveActivity(index);
  };

  const handleAddActivity = (event, activity, tags) => {
    setIndex(index + 1);
    let newActivities = [...activities];
    let newActivity = { description: activity, tags };
    newActivities.push(newActivity);
    fetch(`http://78.82.184.12:55502/activities`, {
      body: JSON.stringify(newActivity),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setActivities(newActivities);
  };

  const transitions = useTransition(activities, (p) => p.key, {
    from: { opacity: 0, transform: `translate3d(0%,0%,0)` },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-100%,0,0)" },
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
          <AddActivity handleAddActivity={handleAddActivity} tags={tags} />
        </Grid>
        <Grid item container alignItems="center" direction="column">
          {transitions.map(({ item, props, key }) => (
            <Activity
              key={key}
              props={props}
              removeActivity={handleRemoveActivity}
              likeActivity={handleLikeActivity}
              activity={item}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

function sendLike(id) {
  fetch(`http://localhost:5000/activities/${id}/like`, {
    method: "PUT",
  });
}

export default Activities;
