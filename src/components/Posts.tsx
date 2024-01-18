import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Outlet } from 'react-router-dom';
import { PostData } from "./Post";

interface PostsProps {
  serverAddress: string;
}

const Posts: React.FC<PostsProps> = ({ serverAddress }) => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      fetch(`${serverAddress}/posts`)
        .then(response => response.json())
        .then((data) => setPosts(data))
        .catch(error => console.error(error));
    }, []);
  
    return (
      <div>
        <h1>Посты</h1>
        <ul className="posts">
          {posts.map((post: PostData) => (
            <li className='post-short' key={post.id}>
              <Link to={`/posts/${post.id}`} className='post-short_link' style={{textDecoration: 'none', color: 'inherit'}}><div className="post-short_inf"><img className="post-short_inf_photo" src={post.photoSrc} alt="userPhoto" />{post.name}</div> {post.content} <div className="post-short_date">{new Date(post.created).toLocaleString()}</div></Link>
            </li>

          ))}
        </ul>
        <button className="posts_button-new"><Link to="/posts/new" style={{ textDecoration: 'none', color: 'inherit'}}>Создать пост</Link></button>
        <Outlet />
      </div>
    );
  };

export default Posts;