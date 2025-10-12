import React from "react";
import posts from "../data/posts.json";

function PostList() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-indigo-700">📰 Blog Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-lg p-4 mb-4 border-l-4 border-indigo-500"
        >
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="text-gray-700 mt-2">{post.content}</p>
          <p className="text-sm text-gray-500 mt-1">
            Date: {post.date} | Slug: {post.slug}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
