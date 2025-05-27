import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TopicPage = () => {
  const { topicName } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/${topicName}.md`)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent('Error loading content.');
        setLoading(false);
      });
  }, [topicName]);

  return (
    <div className="bg-[#0f179a] text-white min-h-screen px-4 md:px-6 py-8 md:py-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-4 z-10">
          <Link
            to="/roadmaps"
            className="text-blue-400 hover:underline inline-block mb-6 text-sm md:text-base"
          >
            ← Back to Roadmap
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg text-sm border border-gray-700 shadow-md my-4"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-800 text-green-300 px-1.5 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              },
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-bold mb-6 border-b border-gray-600 pb-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-semibold mt-8 mb-4 text-blue-300" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl font-medium mt-6 mb-2 text-blue-200" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-4 leading-relaxed text-gray-300" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="ml-6 list-disc text-gray-300 leading-relaxed mb-1" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400 my-4" {...props} />
              ),
              hr: () => (
                <hr className="my-8 border-gray-600" />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-400 underline hover:text-blue-300" {...props} />
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table className="table-auto w-full border-collapse border border-gray-700 text-sm" {...props} />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th className="border border-gray-600 px-4 py-2 bg-gray-700 text-white" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-gray-600 px-4 py-2" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
