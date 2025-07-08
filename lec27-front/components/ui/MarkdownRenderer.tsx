'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // This adds a blinking cursor at the end of the content while typing
          p: ({ children, ...props }) => (
            <p {...props}>
              {children}
              {content && <span className="typing-cursor"></span>}
            </p>
          ),
        }}
      />
    </div>
  );
};

export default MarkdownRenderer;