import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cross from '../img/cross.png'
import userName from '../img/user-name.png'

interface NewPostProps {
  serverAddress: string;
}

const NewPost: React.FC<NewPostProps> = ({ serverAddress }) => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedContent = localStorage.getItem('content');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(`${serverAddress}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, name: "Инкогнито", photoSrc: userName }),
    })
      .then(response => {
        if (response.ok) {
          console.log('New post added successfully!');
          localStorage.removeItem("content");
        }
        else {
          console.log('New post failed to add!')
        }
      })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };
  
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
    localStorage.setItem("content", newContent);
  };


  const handleCrossClick = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    navigate('/')
  };

  return (
    <div className="new-post-div">
      <h2>Создать пост</h2>
      <img className='new-post-div_cross' src={cross} onClick={handleCrossClick} alt="cross" />
      <form className='new-post-div_form' onSubmit={handleSubmit}>
        <input className="new-post-div_input"
          type="text"
          value={content}
          onChange={handleContentChange}
        />
        <button className='new-post-div_button' type="submit">Опубликовать</button>
      </form>
    </div>
  );
};
  
export default NewPost;