import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const articles = [
    { id: 1, title: "The Psychology of Sexual Attraction", content: "Lorem ipsum dolor sit amet...", category: "Sex", date: "2023-10-01" },
    { id: 2, title: "How Crypto is Changing the Adult Industry", content: "Lorem ipsum dolor sit amet...", category: "Crypto", date: "2023-10-02" },
    // Add content for all 50 articles...
  ];

  const article = articles.find(article => article.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="blog-post">
      <h1>{article.title}</h1>
      <p><strong>Category:</strong> {article.category}</p>
      <p><strong>Date:</strong> {article.date}</p>
      <div className="content">{article.content}</div>
    </div>
  );
};

export default BlogPost;
