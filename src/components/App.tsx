import React, { useEffect, useRef, useState } from 'react';
import './App.scss';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [id, setId] = useState(1);
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setPost(null);
      
      const getPost = () => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          signal: abortController.signal,
        });
      };

      try {
        const response = await getPost();
        const newPost = await response.json();

        setPost(newPost);
      } catch (e) {
        console.log(e);
      }
    })();

    // fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    //   signal: abortController.signal,
    // })
    //   .then(response => response.json())
    //   .then(newPost => setPost(newPost))
    //   .catch(e => console.log(e));

    return () => abortController.abort();
  }, [id]);

  const incrementId = () => {
    if (id < 10) {
      setId(prev => prev + 1);
    }
  };

  const decrementId = () => {
    if (id > 1) {
      setId(prev => prev - 1);
    }
  };

  return (
    <div className="wrapper">
      <main className="page">
        <section className="page__sc sc">
          <div className="sc__container _container">
            <div className="sc__body">
              <div className="sc__buttons">
                <button className="sc__button" onClick={incrementId}>
                  +1
                </button>
                <h4 className="sc__id">{id}</h4>
                <button className="sc__button" onClick={decrementId}>
                  -1
                </button>
              </div>
              {post ? (
                <div className="sc__info">
                  <h4 className="sc__id">{post.id}</h4>
                  <p className="sc__text">{post.title}</p>
                </div>
              ) : (
                <div className="sc__loading">Loading...</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
