import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Add CSS for styling

function App() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const handleSearch = async () => {
    setLoading(true);  // Set loading to true when search starts
    try {
      const response = await axios.post('http://127.0.0.1:8000/query', { query });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      setAnswer('Sorry, something went wrong.');
    }
    setLoading(false);  // Set loading to false when search is done
  };

  // Handle key press to trigger search on "Enter"
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">RAG System</h1>
      <div className="input-container">
        <input
          type="text"
          value={query}
          placeholder="Enter your query..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch} disabled={loading}>  {/* Disable button when loading */}
          {loading ? 'Loading...' : 'Search'}  {/* Show "Loading..." when search is in progress */}
        </button>
      </div>
      <div className="result-card">
        <h2>Answer</h2>
        {loading ? (
          <p>Loading your answer, please wait...</p>  // Show loading message when searching
        ) : (
          <p>{answer || 'Your answer will appear here...'}</p>  // Show the answer or a default message
        )}
      </div>
    </div>
  );
}

export default App;
