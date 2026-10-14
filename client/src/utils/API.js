// All requests go to this app's own Express server. Article search is
// proxied through /api/search so the NYT API key stays on the server.
async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${options?.method || "GET"} ${url} failed (${response.status})`);
  }
  return response.json();
}

const json = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const API = {
  // Retrieves all articles from the db
  getArticles: function() {
    return request("/api/articles");
  },
  // Saves a new article to the db
  saveArticle: function(article) {
    return request("/api/articles", json("POST", { article }));
  },
  // Deletes an article from the db
  deleteArticle: function(id) {
    return request(`/api/articles/${encodeURIComponent(id)}`, { method: "DELETE" });
  },
  // Toggles an article's favorite property in the db
  favoriteArticle: function(article) {
    article.favorited = !article.favorited;
    const { _id, favorited } = article;
    return request(`/api/articles/${encodeURIComponent(_id)}`, json("PATCH", { favorited }));
  },
  search: function(query) {
    return request(`/api/search?q=${encodeURIComponent(query)}`);
  }
};

export default API;
