import React, { useState, useEffect } from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import { useTransition, animated } from 'react-spring';

import Activity from './Activity/Activity';

const Activities = () => {
  const [activities, setActivities] = useState([
    { key: 0, description: 'a' },
    { key: 1, description: 'b' },
    { key: 2, description: 'c' }
  ]);

  const [index, setIndex] = useState(activities.length);

  useEffect(() => {
    function fetchData() {
      fetch('http://78.82.184.12:55502/activities')
        .then(response => {
          return response.json();
        })
        .then(data => {
          setActivities(data);
        });
    }
    fetchData();
  }, []);

  const handleRemoveActivity = index => {
    let newActivities = [...activities];
    newActivities.pop();
    setActivities(newActivities);
  };

  const handleAddActivity = () => {
    setIndex(index + 1);
    let newActivities = [...activities];
    newActivities.push({ key: index, description: 'new' });
    setActivities(newActivities);
  };

  const transitions = useTransition(activities, p => p.key, {
    from: { opacity: 0, transform: `translate3d(100%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-150%,0,0)' }
  });

  return (
    <Container>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        spacing={3}
      >
        <Grid item>
          <Button
            onClick={handleAddActivity}
            variant='contained'
            color='primary'
          >
            Add activity
          </Button>
        </Grid>
        {transitions.map(({ item, props, key }) => (
          <animated.div
            style={{
              ...props,
              marginTop: '500px',
              position: 'absolute'
            }}
            key={key}
          >
            <Grid item>
              <Activity removeActivity={handleRemoveActivity} activity={item} />
            </Grid>
          </animated.div>
        ))}
      </Grid>
    </Container>
  );
};

export default Activities;
