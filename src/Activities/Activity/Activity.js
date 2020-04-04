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

const Activity = ({ key, props, activity, removeActivity, likeActivity }) => {
  const classes = useStyles();
  return (
    <animated.div
      key={key}
      style={{
        ...props,
        marginTop: `${activity.key * 20}px`,
        position: "absolute",
      }}
    >
      <Grid item>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {activity.tags && activity.tags[0]}
            </Typography>

            <Typography variant="body2" component="p">
              {activity.description}
            </Typography>
            {activity.tags &&
              activity.tags.map((tag) => (
                <Chip size="small" label={`${tag}`} />
              ))}
          </CardContent>
          <CardActions>
            <Grid container direction="row" justify="space-between">
              <Button onClick={() => removeActivity(activity.key)}>❌</Button>
              <Button onClick={() => likeActivity(activity.key)}>❤️</Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </animated.div>
  );
};

export default Activity;
