import axios from "axios";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((post) => {
        setIsLoading(false);
        // * Update the posts state
        setPosts(post.data);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error.message}</div>;
  }

  return (
    <div>
      <h2>Network Request</h2>
      <ul>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <br />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
