import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Container from '@mui/material/Container'

const BarGraph = ({ data }) => {
  return (
    <Container
      sx={{ maxWidth: '50%' }}
    >
      <BarChart
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
        <YAxis label={{ value: 'Correct answers', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="numCorrect" fill="#8884d8" background={{ fill: '#eee' }} />
      </BarChart>
    </Container>
  )
}

export default BarGraph
