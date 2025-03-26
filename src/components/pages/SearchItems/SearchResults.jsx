import React, { useState } from 'react';
import './SearchResults.css';

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState("grid");

  // Sample data
  const results = [
    {
      title: "Understanding the difference between grid-template and grid-auto",
      date: "Oct 09, 2018",
      snippet:
        "With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. Specifically the difference between grid-template-rows/columns and grid-auto-rows/columns. Although I knew they were to d...",
    },
    {
      title: "Recreating the GitHub Contribution Graph with CSS Grid Layout",
      date: "",
      snippet: "",
    },
  ];

  // Function to count the total number of matches for the search term in all posts
  const countMatches = (term) => {
    let totalMatches = 0;
    const regex = new RegExp(term, "gi");

    results.forEach((result) => {
      // Count matches in the title
      const titleMatches = (result.title.match(regex) || []).length;
      // Count matches in the snippet
      const snippetMatches = (result.snippet.match(regex) || []).length;
      totalMatches += titleMatches + snippetMatches;
    });

    return totalMatches;
  };

  // Calculate the total number of matches for the search term "grid"
  const totalMatches = countMatches(searchTerm);

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>

    
      <p className="results-count">
        {totalMatches} matches found for "{searchTerm}".
      </p>

      <div className="results">
        {/* Show all posts, not filtered */}
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <h3 className="result-title">
              {highlightText(result.title, searchTerm)}
            </h3>
            <span className="result-date">{result.date}</span>
            <p className="result-snippet">
              {highlightText(result.snippet, searchTerm)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to highlight search terms
const highlightText = (text, term) => {
  if (!text || !term) return text;
  const regex = new RegExp(`(${term})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="highlight">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

export default SearchResults;