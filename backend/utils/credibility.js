function calculateCredibility(title, wikiData) {
  let score = 40;
  
  if (!wikiData || !title) {
    return score;
  }
  
  const firstWord = title.split(' ')[0].toLowerCase();
  const extract = (wikiData.extract || '').toLowerCase();
  const description = wikiData.description || '';
  
  if (extract.includes(firstWord)) {
    score += 20;
  }
  
  if (description) {
    score += 20;
  }
  
  return Math.min(score, 100);
}

module.exports = { calculateCredibility };

