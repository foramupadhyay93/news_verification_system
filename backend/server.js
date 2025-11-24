const http = require('http');
const url = require('url');
const { fetchNews } = require('./utils/news');
const { fetchWikipediaSummary } = require('./utils/wiki');
const { calculateCredibility } = require('./utils/credibility');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  if (method === 'GET' && pathname === '/news') {
    try {
      const source = parsedUrl.query.source || 'bbc';
      const news = await fetchNews(source);
      res.writeHead(200, {
        ...corsHeaders,
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(news));
    } catch (error) {
      res.writeHead(500, {
        ...corsHeaders,
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  if (method === 'GET' && pathname === '/verify') {
    try {
      const title = parsedUrl.query.title;
      
      if (!title) {
        res.writeHead(400, {
          ...corsHeaders,
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ error: 'Title parameter is required' }));
        return;
      }

      const decodedTitle = decodeURIComponent(title);
      const wikiData = await fetchWikipediaSummary(decodedTitle);
      const credibility = calculateCredibility(decodedTitle, wikiData);

      const result = {
        title: decodedTitle,
        credibility: credibility,
        wiki: wikiData
      };

      res.writeHead(200, {
        ...corsHeaders,
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(result));
    } catch (error) {
      res.writeHead(500, {
        ...corsHeaders,
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  res.writeHead(404, {
    ...corsHeaders,
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

