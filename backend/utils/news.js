const RSSParser = require('rss-parser');

const parser = new RSSParser();

async function fetchBBCNews() {
  try {
    const feed = await parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml');
    const items = feed.items.slice(0, 5).map(item => ({
      title: item.title || '',
      link: item.link || '',
      description: item.contentSnippet || item.content || '',
      pubDate: item.pubDate || '',
      source: 'BBC'
    }));
    return items;
  } catch (error) {
    throw new Error(`Failed to fetch BBC news: ${error.message}`);
  }
}

async function fetchNBCNews() {
  try {
    const feed = await parser.parseURL('https://www.nbcnewyork.com/?rss=y');
    const items = feed.items.slice(0, 5).map(item => ({
      title: item.title || '',
      link: item.link || '',
      description: item.contentSnippet || item.content || item.description || '',
      pubDate: item.pubDate || item.isoDate || '',
      source: 'NBC New York'
    }));
    return items;
  } catch (error) {
    throw new Error(`Failed to fetch NBC news: ${error.message}`);
  }
}

async function fetchNews(source = 'bbc') {
  if (source.toLowerCase() === 'nbc' || source.toLowerCase() === 'nbcnewyork') {
    return await fetchNBCNews();
  }
  return await fetchBBCNews();
}

module.exports = { fetchBBCNews, fetchNBCNews, fetchNews };

