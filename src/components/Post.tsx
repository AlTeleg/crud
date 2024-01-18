import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import userName from '../img/user-name.png'

export interface PostData {
    id: string;
    name: string;
    content: string;
    created: Date;
    photoSrc: string;
  }
 
  interface PostProps {
    serverAddress: string;
  }

const Post: React.FC<PostProps>  = ({ serverAddress }) => {
    const [post, setPost] = useState<PostData | null>(null);
    const { postId } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch(`${serverAddress}/posts/${postId}`)
      .then(response => response.json())
      .then((data: { post: PostData }) => {setPost(data.post)})
      .catch(error => console.error(error));
    }, [postId]);
  
    if (!post) {
      return <div>Loading...</div>;
    }
  
    const handleDelete = () => {
      fetch(`${serverAddress}/posts/${postId}`, {
        method: 'DELETE',
      })
        .then(() => {
          navigate('/', {replace : true})
        })
        .catch(error => console.error(error));
    };

    post.name = post.name || "Инкогнито";
    post.photoSrc = post.photoSrc || userName;

    return (
      <div className="post-full">  
        <h4 className="post-full_inf"><img src={post.photoSrc} alt="user-photo" />{post.name} Создан: {new Date(post.created).toLocaleString()}</h4>
        <p className="post-full_content">{post.content}</p>
        <div className="post-full_managment">
          <button className="post-full_managment_edit-button"><Link to={`/posts/${postId}/edit`} state={{ post }} style={{textDecoration: 'none', color: 'inherit'}}>Изменить</Link></button>
          <button className="post-full_managment_delete-button" onClick={handleDelete}>Удалить</button>
        </div>

      </div>
    );
  };

export default Post
