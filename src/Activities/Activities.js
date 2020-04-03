import React, { useState } from "react";

import Activity from "./Activity/Activity";

const Activities = () => {
  let [activities, setActivities] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleRemoveActivity = (index) => {
    setActivities(activities.splice(0, index));
  };

  return (
    <div className="relative h-32 text-center">
      {activities.map((activity, index) => (
        <Activity removeActivity={handleRemoveActivity} index={index} />
      ))}
    </div>
  );
};

export default Activities;
