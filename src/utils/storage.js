const ACTIVITY_KEY = "activities";

function getSeenActivities() {
  let activities = sessionStorage.getItem(ACTIVITY_KEY);
  return activities ? JSON.parse(activities) : [];
}

function addSeenActivity(id) {
  let activities = getSeenActivities();
  if (!activities.includes(id)) {
    activities.push(id);
  }

  sessionStorage.setItem(ACTIVITY_KEY, JSON.stringify(activities));
}

export default {
  getSeenActivities,
  addSeenActivity
};
