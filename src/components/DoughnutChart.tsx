import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = (data) => {

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut data={data}  />
    </div>
  );
};

export default DoughnutChart;
