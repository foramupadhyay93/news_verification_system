const fetch = require('node-fetch');

function extractKeywords(title) {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'as', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'against', 'warns', 'latest', 'talks', 'end'];
  
  const words = title.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));
  
  return words.slice(0, 3).join(' ');
}

async function searchWikipedia(query) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedQuery}`;
    const response = await fetch(searchUrl);
    
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function fetchWikipediaSummary(title) {
  try {
    const encodedTitle = encodeURIComponent(title);
    const directUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`;
    let response = await fetch(directUrl);
    
    if (response.ok) {
      return await response.json();
    }
    
    const keywords = extractKeywords(title);
    if (keywords) {
      const searchResult = await searchWikipedia(keywords);
      if (searchResult) {
        return searchResult;
      }
    }
    
    const firstWord = title.split(' ')[0];
    if (firstWord && firstWord.length > 2) {
      const firstWordResult = await searchWikipedia(firstWord);
      if (firstWordResult) {
        return firstWordResult;
      }
    }
    
    return {
      extract: '',
      description: '',
      content_urls: {
        desktop: {
          page: ''
        }
      }
    };
  } catch (error) {
    return {
      extract: '',
      description: '',
      content_urls: {
        desktop: {
          page: ''
        }
      }
    };
  }
}

module.exports = { fetchWikipediaSummary };

