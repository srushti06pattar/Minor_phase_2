import React, { useRef, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const topics = [
  { name: 'Arrays & Hashing', path: '/arrays', children: ['Two Pointers', 'Stack'] },
  { name: 'Two Pointers', path: '/two-pointers', children: ['Sliding Window', 'Linked List'] },
  { name: 'Stack', path: '/stack', children: ['Binary Search'] },
  { name: 'Sliding Window', path: '/sliding-window', children: [] },
  { name: 'Linked List', path: '/linked-list', children: ['Trees'] },
  { name: 'Binary Search', path: '/binary-search', children: ['Trees'] },
  { name: 'Trees', path: '/trees', children: ['Tries', 'Heap / Priority Queue', 'Backtracking'] },
  { name: 'Tries', path: '/tries', children: [] },
  { name: 'Heap / Priority Queue', path: '/heap', children: [] },
  { name: 'Backtracking', path: '/backtracking', children: [] }
];

const getCompletedTopics = () => JSON.parse(sessionStorage.getItem('completedTopics') || '[]');

const saveCompletedTopic = (name) => {
  const completed = getCompletedTopics();
  if (!completed.includes(name)) {
    const updated = [...completed, name];
    sessionStorage.setItem('completedTopics', JSON.stringify(updated));
  }
};

const TopicPage = () => {
  const { topicName } = useParams();
  const name = decodeURIComponent(topicName);
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const filename = `${name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
    fetch(`/${filename}`)
      .then((res) => res.text())
      .then((text) => setMarkdownContent(text))
      .catch(() => setMarkdownContent('# Content not found'));
  }, [name]);

  const handleComplete = () => {
    saveCompletedTopic(name);
    navigate('/roadmaps');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
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
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

const Roadmap = () => {
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [lines, setLines] = useState([]);

  const groupTopicsByLevel = () => {
    const levels = [];
    const visited = new Set();
    const queue = [{ name: 'Arrays & Hashing', level: 0 }];

    while (queue.length) {
      const { name, level } = queue.shift();
      if (visited.has(name)) continue;
      visited.add(name);

      if (!levels[level]) levels[level] = [];
      const topic = topics.find((t) => t.name === name);
      levels[level].push(topic);

      topic.children.forEach((childName) => {
        queue.push({ name: childName, level: level + 1 });
      });
    }

    return levels;
  };

  useEffect(() => {
    const updateLines = () => {
      const newLines = [];
      const spacingOffset = 12;
      const containerRect = containerRef.current.getBoundingClientRect();

      topics.forEach((topic) => {
        const fromEl = nodeRefs.current[topic.name];
        if (!fromEl) return;
        const fromRect = fromEl.getBoundingClientRect();

        topic.children.forEach((childName) => {
          const toEl = nodeRefs.current[childName];
          if (!toEl) return;
          const toRect = toEl.getBoundingClientRect();

          newLines.push({
            x1: fromRect.left + fromRect.width / 2 - containerRect.left,
            y1: fromRect.bottom - containerRect.top - spacingOffset,
            x2: toRect.left + toRect.width / 2 - containerRect.left,
            y2: toRect.top - containerRect.top + spacingOffset
          });
        });
      });

      setLines(newLines);
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, []);

  const completedTopics = getCompletedTopics();

  const isUnlocked = (topic) => {
    if (topic.name === 'Arrays & Hashing') return true;
    return topics.some(
      (parent) =>
        parent.children.includes(topic.name) &&
        completedTopics.includes(parent.name)
    );
  };

  return (
    <div
      className="relative bg-gray-900 min-h-screen py-10 text-white overflow-x-auto"
      ref={containerRef}
    >
      <svg className="absolute w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrow" markerWidth="9" markerHeight="5" refX="5" refY="5" orient="auto">
            <path d="M0,0 L0,10 L10,5 z" fill="white" />
          </marker>
        </defs>
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="white"
            strokeWidth="2"
            markerEnd="url(#arrow)"
            style={{ transition: 'all 0.3s ease-in-out' }}
          />
        ))}
      </svg>

      <div className="flex flex-col items-center relative z-10 space-y-20">
        {groupTopicsByLevel().map((levelTopics, levelIndex) => (
          <div key={levelIndex} className="flex flex-wrap justify-center gap-6">
            {levelTopics.map((topic) => {
              const unlocked = isUnlocked(topic);
              return (
                <div
                  key={topic.name}
                  ref={(el) => (nodeRefs.current[topic.name] = el)}
                  className={`px-4 py-3 rounded-xl shadow-lg w-52 text-center transition-all duration-300 ${
                    unlocked
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-500 text-gray-300'
                  }`}
                  style={{
                    pointerEvents: unlocked ? 'auto' : 'none',
                    opacity: unlocked ? 1 : 0.5
                  }}
                >
                  {unlocked ? (
                    <Link to={`/roadmaps/topic/${encodeURIComponent(topic.name)}`}>{topic.name}</Link>
                  ) : (
                    topic.name
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const Roadmaps = () => (
  <Routes>
    <Route path="/" element={<Roadmap />} />
    <Route path="topic/:topicName" element={<TopicPage />} />
  </Routes>
);

export default Roadmaps;
