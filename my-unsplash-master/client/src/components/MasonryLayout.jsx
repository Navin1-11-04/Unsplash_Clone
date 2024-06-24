import React from 'react';
import Article from './Article';

function MasonryLayout({ posts,onDelete}) {
  const firstColumn = posts.filter((_, index) => index % 3 === 0);
  const secondColumn = posts.filter((_, index) => index % 3 === 1);
  const thirdColumn = posts.filter((_, index) => index % 3 === 2);

  return (
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
     <div className="grid gap-6 posts-columns">
        {firstColumn.map((post) => (
          <Article key={post.id} post={post} />
        ))}
      </div>
      <div className="grid gap-6 posts-columns">
        {secondColumn.map((post) => (
          <Article key={post.id} post={post} />
        ))}
      </div>
      <div className="grid gap-6 posts-columns">
        {thirdColumn.map((post) => (
          <Article key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default MasonryLayout;
