import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgressWithLabel from './linerProgress';

const ProgressItem = ({ label, target }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < target) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= target) {
            clearInterval(timer);
            return target;
          }
          return prevProgress + 1;
        });
      }, 10);
      return () => clearInterval(timer);
    }
  }, [progress, target]);

  return (
    <div className="progress-item">
      <span>{label}</span>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
    </div>
  );
};

export default ProgressItem;
