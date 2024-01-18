import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cross from '../img/cross.png'
import { PostData } from "./Post";

interface EditPostProps {
  serverAddress: string;
}

const EditPost: React.FC<EditPostProps> = ({ serverAddress }) => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post;

  useEffect(() => {
    if (post) {
      setContent(post.content);
    }
  }, [post]);
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(`${serverAddress}/posts/${post!.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...post, content }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Post updated successfully!');
          navigate(`/posts/${post!.id}`);
        } else {
          console.log('Failed to update post!');
        }
      })
      .catch(error => console.error(error));
  };

  const handleCrossClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    navigate(`/posts/${post!.id}`);
  };

  if (!post) {
    return <div>Loading...</div>;
  }



  return (
    <div className="new-post-div">
      <h2>Редактировать пост</h2>
      <img className='new-post-div_cross' src={cross} onClick={handleCrossClick} alt="cross" />
      <form className='new-post-div_form' onSubmit={handleSubmit}>
        <input className="new-post-div_input"
          type="text"
          value={content}
          onChange={event => setContent(event.target.value)}
        />
        <button className='new-post-div_button' type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default EditPost;