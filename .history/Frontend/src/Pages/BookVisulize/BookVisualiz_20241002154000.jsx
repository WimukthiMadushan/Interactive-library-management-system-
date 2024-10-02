import React from 'react';
import BookVisualizeByState from '../components/Charts/BookVisualizeByState'; // Create this component
import BookVisualizeByPublishYear from '../components/Charts/BookVisualizeByPublishYear'; // Create this component
import './BookVisualization.css'; // Optional CSS for styling the page
import BookVisualizeByCat from '../../Components/BookVisualize/VisualizeByCat/VisualizeByCat';

const BookVisualization = () => {
  return (
    <div className="visualization-page">
      <h1 className="visualization-title">Book Visualization Dashboard</h1>
      <div className="visualization-cards">
        <div className="card">
          <BookVisualizeByCat />
        </div>
        {/*<div className="card">
          <BookVisualizeByState />
        </div>
        <div className="card">
          <BookVisualizeByPublishYear />
        </div>*/}
      </div>
    </div>
  );
};

export default BookVisualization;
