const dummy = (blogs) => {
    return 1;
}
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}
const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, blog) => {
        return blog.likes > favorite.likes ? blog : favorite;
    }, { likes: 0 });
}
const mostBlogs = (blogs) => {
    const authorCount = blogs.reduce((count, blog) => {
        count[blog.author] = (count[blog.author] || 0) + 1;
        return count;
    }, {});

    const maxBlogs = Object.keys(authorCount).reduce((max, author) => {
        return authorCount[author] > authorCount[max] ? author : max;
    });

    return {
        author: maxBlogs,
        blogs: authorCount[maxBlogs]
    };
}
const mostLikes = (blogs) => {
    const authorLikes = blogs.reduce((likes, blog) => {
      likes[blog.author] = (likes[blog.author] || 0) + blog.likes;
      return likes;
    }, {});
  
    const maxLikesAuthor = Object.keys(authorLikes).reduce((max, author) => {
      return authorLikes[author] > authorLikes[max] ? author : max;
    });
  
    return {
      author: maxLikesAuthor,
      likes: authorLikes[maxLikesAuthor]
    };
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
