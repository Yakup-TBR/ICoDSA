import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/posts', { title, content })
      .then(response => {
        setPosts([...posts, response.data]);
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" />
        <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Content" />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default App;