import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  displayMode?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, displayMode = false, className = "" }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(content, {
        throwOnError: false,
        displayMode: displayMode,
      });
    } catch (error) {
      console.error("KaTeX rendering error:", error);
      return content;
    }
  }, [content, displayMode]);

  return (
    <span 
      className={className} 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};
