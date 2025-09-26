// Simple markdown renderer for blog posts
export const renderMarkdown = (content: string): React.ReactElement[] => {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100 first:mt-0">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="text-3xl font-bold mt-8 mb-6 text-gray-900 dark:text-gray-100 first:mt-0">
          {line.replace('# ', '')}
        </h1>
      );
    } else if (line.startsWith('- ')) {
      // Check if we're starting a new list or continuing one
      const listItems = [line];
      while (i + 1 < lines.length && lines[i + 1].startsWith('- ')) {
        i++;
        listItems.push(lines[i]);
      }
      
      elements.push(
        <ul key={key++} className="list-disc ml-6 mb-4 space-y-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-gray-700 dark:text-gray-300">
              {item.replace('- ', '')}
            </li>
          ))}
        </ul>
      );
    } else if (line.trim() === '') {
      // Empty line - add some spacing
      elements.push(<div key={key++} className="h-2" />);
    } else if (line.trim() !== '') {
      elements.push(
        <p key={key++} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {line}
        </p>
      );
    }
  }

  return elements;
};