import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './TopAuthors.css';

const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop:'10px'}}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ marginLeft: '70px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: entry.color, marginRight: '5px' }}></div>
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

const TopAuthors = () => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('last6Months'); // Default range
  const [top, setTop] = useState(10); // Default top authors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/visualize/topauthors`, {
          params: {
            top,
            range,
          },
        });
        //console.log('Fetched data:', response.data.authors);
        const chartData = response.data.authors.map((author, index) => ({
          name: `${author.First_Name} ${author.Last_Name}`,
          borrowCount: author.BorrowCount,
          reserveCount: author.ReserveCount,
        }));
        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [range, top]);

  const tooltipStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '14px', // Adjust font size
    width: 'fit-content'

    };

  return (
    
    <div className="full-container">
      <h2 className="chart-title">Top Authors</h2>
      <div className="inline-container">
        <label htmlFor="range-select">Select Range: </label>
        <select id="range-select" value={range} onChange={(e) => setRange(e.target.value)}>
          {/* <option value="last7days">Last 7 Days</option> */}
          <option value="lastMonth">Last Month</option>
          <option value="last6Months">Last 6 Months</option>
        </select>
        <label htmlFor="top-select">Top Authors: </label>
        <select id="top-select" value={top} onChange={(e) => setTop(e.target.value)}>
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
        </select>
      </div>
      <div className="pie-chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} textAnchor="end" tick={{ fontSize: 10 ,fill: '#000'}}/>
            <YAxis tickFormatter={(tick) => Number.isInteger(tick) ? tick : ''}/>
            <Tooltip contentStyle={tooltipStyle}/>
            <Legend content={<CustomLegend />} />
            <Bar dataKey="borrowCount" fill="#8884d8" />
            <Bar dataKey="reserveCount" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopAuthors;