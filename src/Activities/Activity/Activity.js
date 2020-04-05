import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { animated } from "react-spring";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "30%",
  },
});

const Activity = ({ props, activity, removeActivity, likeActivity }) => {
  const classes = useStyles();
  return (
    <animated.div
      style={{
        ...props,
        position: "absolute",
      }}
    >
      <Grid item>
        <Card className={classes.root}>
          <CardHeader style={{ backgroundColor: "#3f51b5" }}></CardHeader>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            ></Typography>

            <Typography variant="body2" component="p">
              {activity.description}
            </Typography>
            <br />
            {activity.tags &&
              activity.tags.map((tag) => (
                <Chip size="small" label={`${tag.label}`} />
              ))}
          </CardContent>
          <CardActions>
            <Grid container direction="row" justify="space-between">
              <Button onClick={() => removeActivity(activity.key)}>
                <span role="img" aria-label="dislike">
                  ❌
                </span>
              </Button>
              <Button onClick={() => likeActivity(activity.key)}>
                <span role="img" aria-label="like">
                  ✔️
                </span>
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </animated.div>
  );
};

export default Activity;
