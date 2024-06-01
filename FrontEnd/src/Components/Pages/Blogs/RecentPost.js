import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RecentPost = () => {
  const [recentBlogs, setRecentBlogs] = useState("");

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const api = `http://localhost:8080/api/v1/recent/blog`;
        const { data } = await axios.get(api, { withCredentials: true });
        setRecentBlogs(data.recentBlog);
      } catch (error) {
        toast.error("Error fetching recent blogs: " + error.message);
      }
    };
    fetchRecentBlogs();
  }, []);
 const navigate= useNavigate();
  return (
    <div>
      {recentBlogs &&
        recentBlogs.map((blog) => (
          <div key={blog.id} style={{ marginBottom: "20px", cursor:"pointer" }} onClick={()=>navigate(`/blogs/read/${blog._id}`)}>
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <div>
                <img src={blog.image.url} alt="" width={70} height={70} />
              </div>
              <div className="ml-2">
                <span style={{ fontSize: "smaller" }}>
                  {new Intl.DateTimeFormat("en", { month: "long" }).format(
                    new Date(blog.createdAt)
                  )}{" "}
                  {new Date(blog.createdAt).getDate()}{" "}
                  {new Date(blog.createdAt).getFullYear()}
                </span>
                <h6>{blog.title}</h6>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecentPost;
