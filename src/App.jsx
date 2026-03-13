import { useEffect, useState } from "react"
import "./App.css"

export default function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=6")
      .then(res => res.json())
      .then(data => setPosts(data.posts))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="container">
      <h1>Programming Quotes PWA</h1>
      <p className="subtitle">Works offline using service worker</p>

      <div className="quotes-grid">
        {posts.map(post => (
          <div key={post.id} className="card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}