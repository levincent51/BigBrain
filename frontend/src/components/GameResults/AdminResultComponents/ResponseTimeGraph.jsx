import React from 'react'
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from 'recharts'
import Container from '@mui/material/Container'

const ResponseTimeGraph = ({ data, numPlayers }) => {
  data.forEach(d => {
    d.avgTime = d.totalTime / numPlayers
    d.avgCorrectTime = d.correctTotalTime / d.numCorrect
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
            bottom: 5
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 50, right: 50 }}
            label={{ value: 'Quiz questions', position: 'insideBottom' }}
          />
          <YAxis label={{ value: 'Time (s)', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="maxTime" fill="#8884d8"/>
          <Scatter dataKey="avgTime" fill="red" />
          <Scatter dataKey="avgCorrectTime" fill="purple" />
      </ComposedChart>
    </Container>
  )
}

export default ResponseTimeGraph
