import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  Label
} from 'recharts';
import Container from '@mui/material/Container';

const MaxAndAverageScoreGraph = ({ data, numPlayers }) => {
  data.forEach(d => {
    d.avg = d.totalPoints / numPlayers;
  })
  return (
    <Container>
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <text x={500 / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize="14">Ttieaddadadad</tspan>
          </text>
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 50, right: 50 }}
            label={{ value: 'Quiz questions', position: 'insideBottom' }}
          />
          <YAxis label={{ value: 'Points', angle: -90, position: 'insideLeft' }}>
          </YAxis>
          <Tooltip />
          <Legend content="abc"/>
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="maxPoints" fill="#8884d8" background={{ fill: '#eee' }} />
          <Scatter dataKey="avg" fill="red" />
      </ComposedChart>
    </Container>
  );
}

export default MaxAndAverageScoreGraph;
