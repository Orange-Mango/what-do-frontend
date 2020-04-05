import React from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const ActivityForm = ({
  tags,
  activity,
  selectedTags,
  handleSubmit,
  handleDelete,
  handleAddTag,
  setActivity,
}) => {
  return (
    <form onSubmit={(event) => handleSubmit(event, activity, selectedTags)}>
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                id="standard-basic"
                label="Activity"
                required
                onChange={(event) => setActivity(event.target.value)}
              />
            </Grid>
            <Grid item>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={activity}
                onChange={(event) => handleAddTag(event)}
              >
                {tags.map((tag) => (
                  <MenuItem value={tag.key}>{tag.label}</MenuItem>
                ))}
              </Select>
              {selectedTags.map((tag) => (
                <Chip
                  key={tag.key}
                  label={tag.label}
                  onDelete={() => handleDelete(tag)}
                />
              ))}
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Add activity
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

export default ActivityForm;
