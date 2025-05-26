import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const getCompletedTopics = () => JSON.parse(localStorage.getItem('completedTopics') || '[]');

const saveCompletedTopic = (name) => {
  const completed = getCompletedTopics();
  if (!completed.includes(name)) {
    const updated = [...completed, name];
    localStorage.setItem('completedTopics', JSON.stringify(updated));
  }
};

const TopicPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const filename = `${topic
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/\s+/g, '-')
  .replace(/[^\w-]/g, '')}.md`;

  useEffect(() => {
    fetch(`/${filename}`)
      .then((res) => {
        // Check if response is HTML (likely index.html fallback due to missing file)
        if (!res.ok || res.headers.get('content-type')?.includes('text/html')) {
          throw new Error('Markdown file not found');
        }
        return res.text();
      })
      .then((text) => setContent(text))
      .catch((err) => {
        console.error('Error loading markdown file:', err);
        setContent('# Content not found\nPlease check the topic name or filename.');
      });
  }, [topic]);
  
  const handleComplete = () => {
    saveCompletedTopic(topic);
    navigate('/roadmaps');
  };

  return (
    <div className="topic-page p-6 max-w-4xl mx-auto text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">{topic}</h1>
      <button
        onClick={handleComplete}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        ✅ Mark as Completed
      </button>
      <Link to="/roadmaps" className="text-blue-300 hover:underline block mb-6">
        ⬅ Back to Roadmap
      </Link>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default TopicPage;
