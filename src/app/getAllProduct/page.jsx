"use client"
import React from 'react'

const GetAllProducts = () => {
    const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async function getAllBlogsApiCall() {
      const response = await getAllBlogs();

      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    })();

    setBlogs([]);
  }, []);

  if (blogs.length === 0) {
    return <Loader text="blogs" />;
  }

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  return (
    <div className={style.blogsWrapper}>
      {blogs.map((blog) => (
        <div
          id={blog._id}
          className={style.blog}
          onClick={() => navigate(`/blog/${blog._id}`)}
        >
          <h1>{blog.title}</h1>
          <img src={blog.photo} width={1000}/>
          <p>{truncateContent(blog.content, 50)}</p>
        </div>
      ))}
    </div>
  );
}

export default GetAllProducts