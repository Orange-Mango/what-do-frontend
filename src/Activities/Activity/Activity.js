import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "30%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Activity = ({ activity, index, removeActivity }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Category
        </Typography>

        <Typography variant="body2" component="p">
          {activity && activity.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => removeActivity(index)}>❌</Button>
        <Button>❤️</Button>
      </CardActions>
    </Card>
  );
};

export default Activity;