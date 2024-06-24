import React from 'react';

function Article({ post, onDelete }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${post._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDelete(post._id);
        alert("Post deleted successfully");
      } else {
        console.error('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='article'>
      <img src={post.imageUrl} alt={post.label} id='posts-img' className='h-auto max-w-full' />
      <p id="label">{post.label}</p>
      <button id='delete-btn' onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
    </div>
  );
}

export default Article;
