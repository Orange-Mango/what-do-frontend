import React, { useState } from "react";
import { Fab, Modal } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import ActivityForm from "./ActivityForm/ActivityForm";

const AddActivity = ({ handleAddActivity, tags }) => {
  const [activity, setActivity] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (tag) => {
    let newTags = selectedTags.filter(
      (selectedTag) => selectedTag.label !== tag.label
    );
    setSelectedTags(newTags);
  };

  const handleAddTag = (event) => {
    let selectedTag = event.target.value;
    if (!selectedTags.find((tag) => tag.label === tags[selectedTag].label)) {
      setSelectedTags([...selectedTags, { label: tags[selectedTag].label }]);
    }
  };

  const handleSubmit = (event, activity, tags) => {
    event.preventDefault();
    handleAddActivity(event, activity, tags);
    setSelectedTags([]);
    setOpen(false);
  };

  return (
    <div>
      <Fab
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          left: "auto",
          top: "auto",
        }}
        color="primary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ActivityForm
          tags={tags}
          activity={activity}
          setActivity={setActivity}
          selectedTags={selectedTags}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleAddTag={handleAddTag}
        />
      </Modal>
    </div>
  );
};

export default AddActivity;
