import React from 'react';

/**
 * Minimal markdown renderer for blog posts.
 *
 * Supports the subset the posts actually use: h1-h4, bullet and numbered
 * lists, blockquotes, and inline bold / italic / code. Anything it does not
 * understand is rendered as a paragraph rather than dropped, so no content is
 * ever lost.
 */

/** Matches an inline span: **bold**, *italic* or `code`. */
const INLINE_PATTERN = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g;

/** Renders inline emphasis inside a line of text. */
const renderInline = (text: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  let key = 0;

  for (const part of text.split(INLINE_PATTERN)) {
    if (!part) continue;

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      nodes.push(
        <strong key={key++} className="font-semibold text-gray-900 dark:text-gray-100">
          {part.slice(2, -2)}
        </strong>
      );
    } else if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[0.9em] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    } else if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      nodes.push(<em key={key++}>{part.slice(1, -1)}</em>);
    } else {
      nodes.push(part);
    }
  }

  return nodes;
};

const HEADING_STYLES: Record<number, string> = {
  1: 'text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-gray-100 first:mt-0',
  2: 'text-2xl font-semibold mt-9 mb-4 text-gray-900 dark:text-gray-100 first:mt-0',
  3: 'text-xl font-semibold mt-7 mb-3 text-gray-900 dark:text-gray-100 first:mt-0',
  4: 'text-lg font-semibold mt-6 mb-2 text-gray-900 dark:text-gray-100 first:mt-0',
};

export const renderMarkdown = (content: string): React.ReactElement[] => {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Headings: #### down to #
    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (heading) {
      const level = heading[1].length;
      const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
      elements.push(
        <Tag key={key++} className={HEADING_STYLES[level]}>
          {renderInline(heading[2])}
        </Tag>
      );
      continue;
    }

    // Horizontal rule
    if (/^(---+|\*\*\*+)$/.test(trimmed)) {
      elements.push(
        <hr key={key++} className="my-8 border-gray-200 dark:border-gray-700" />
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoted = [trimmed.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('> ')) {
        i++;
        quoted.push(lines[i].trim().slice(2));
      }
      elements.push(
        <blockquote
          key={key++}
          className="border-l-4 border-primary/40 pl-4 italic my-5 text-gray-600 dark:text-gray-400"
        >
          {renderInline(quoted.join(' '))}
        </blockquote>
      );
      continue;
    }

    // Bullet list
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [trimmed.replace(/^[-*]\s+/, '')];
      while (i + 1 < lines.length && /^[-*]\s+/.test(lines[i + 1].trim())) {
        i++;
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
      }
      elements.push(
        <ul key={key++} className="list-disc ml-6 mb-5 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [trimmed.replace(/^\d+\.\s+/, '')];
      while (i + 1 < lines.length && /^\d+\.\s+/.test(lines[i + 1].trim())) {
        i++;
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
      }
      elements.push(
        <ol key={key++} className="list-decimal ml-6 mb-5 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (trimmed === '') {
      continue;
    }

    elements.push(
      <p key={key++} className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  }

  return elements;
};
