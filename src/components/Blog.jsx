import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';

const Blog = () => {
  const articles = [
    { id: 1, title: "The Psychology of Sexual Attraction", category: "Sex", date: "2023-10-01" },
    { id: 2, title: "How Crypto is Changing the Adult Industry", category: "Crypto", date: "2023-10-02" },
    { id: 3, title: "Understanding Men's Sexual Health", category: "Men", date: "2023-10-03" },
    { id: 4, title: "Empowering Women in the Digital Age", category: "Women", date: "2023-10-04" },
    { id: 5, title: "The Future of Adult Content in Web3", category: "Crypto", date: "2023-10-05" },
    // Add 45 more articles here...
  ];

  return (
    <div className="blog-container">
      <h1>Blog</h1>
      <div className="blog-grid">
        {articles.map(article => (
          <div key={article.id} className="blog-card">
            <h2>{article.title}</h2>
            <p><strong>Category:</strong> {article.category}</p>
            <p><strong>Date:</strong> {article.date}</p>
            <Link to={`/blog/${article.id}`} className="read-more">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
