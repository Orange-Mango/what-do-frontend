import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useTransition } from "react-spring";

import Activity from "./Activity/Activity";
import storage from "../utils/storage";
import AddActivity from "./AddActivity/AddActivity";
import { client } from "../utils/api-client";

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
    async function fetchData() {
      let seenActivities = storage.getSeenActivities();
      let queryParams = seenActivities.map((id) => `not=${id}`).join("&");
      let data = await client(`activities/ordered?${queryParams}`);
      let mappedData = data.map(({ id, tags, description }) => ({
        key: id,
        tags: tags,
        description: description,
      }));
      setActivities(mappedData);
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

  const handleAddActivity = (activity, tags) => {
    setIndex(index + 1);
    let newActivities = [...activities];
    let newActivity = { description: activity, tags };
    newActivities.push(newActivity);
    client("activities", { body: newActivity });
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
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={3}
        >
          <Grid item>
            <Typography variant="h1" component="h12">
              What do?
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="subtitle1" component="h6">
              Good question, here's a list of activities you can do whilst
              socially isolating 😎
            </Typography>
          </Grid>
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
  fetch(`http://78.82.184.12:55502/activities/${id}/like`, {
    method: "PUT",
  });
}

export default Activities;
