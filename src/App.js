import React, { useState } from 'react';
import StoryItem from './components/StoryItem';
import './App.css';


function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStories, setSelectedStories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch stories
  const fetchSuggestions = async (query) => {
    if (query.length >= 3) {
      setLoading(true);
      try {
        const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
        const data = await response.json();
        const stories = data.hits.map(hit => ({
          title: hit.title,
          author: hit.author,
          num_comments: hit.num_comments,
          points: hit.points,
        }));
        setSuggestions(stories);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    fetchSuggestions(inputValue);
  };

  const handleStorySelect = (story) => {
    if (!selectedStories.some(selectedStory => selectedStory.title === story.title)) {
      setSelectedStories([...selectedStories, story]);
    }
  };

  // highlight search term
  const highlightSearchTerm = (title, query) => {
    if (!query || typeof title !== 'string') return title;

    const parts = title.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
      ? <mark key={index}>{part}</mark> 
      : part
    );
  };

  // Delete story
  const handleDeleteStory = (story) => {
    setSelectedStories(selectedStories.filter(selectedStory => selectedStory.title !== story.title));
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <h1>Hacker News Story Search</h1>
        <input
          type="text"
          placeholder="Search title"
          value={query}
          onChange={handleInputChange}
        />

        {loading && <p>Loading...</p>}
      </div>

      <ul>
      {suggestions.length > 0 ? (
        suggestions.map((story, index) => (
          <StoryItem
            key={index}
            story={story}
            query={query}
            highlightSearchTerm={highlightSearchTerm}
            onClick={() => handleStorySelect(story)}
          />
        ))
      ) : (
        query.length >= 3 && !loading && <li>No results found.</li>
      )}
      </ul>


      {/* Saved stories section */}

      {selectedStories.length > 0 && (
        <div>
          <div className="center-container">
            <h2>Saved Stories</h2>
          </div>
          <ul>
            {selectedStories.map((story, index) => (
              <StoryItem key={index} story={story} onDelete={handleDeleteStory} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;