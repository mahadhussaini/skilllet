import { useState, useRef } from 'react';
import { Bold, Italic, List, ListOrdered, Link, Image, Code, Quote, Heading1, Heading2, Undo, Redo, Save } from 'lucide-react';

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateContent();
  };

  const updateContent = () => {
    if (onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      execCommand('insertLineBreak');
    }
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const link = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      execCommand('insertHTML', link);
      setIsLinkModalOpen(false);
      setLinkUrl('');
      setLinkText('');
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const img = `<img src="${imageUrl}" alt="${imageAlt}" class="max-w-full h-auto rounded-lg my-4" />`;
      execCommand('insertHTML', img);
      setIsImageModalOpen(false);
      setImageUrl('');
      setImageAlt('');
    }
  };

  const insertCodeBlock = () => {
    const codeBlock = `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code>Your code here</code></pre>`;
    execCommand('insertHTML', codeBlock);
  };

  const insertQuote = () => {
    const quote = `<blockquote class="border-l-4 border-primary-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400">Your quote here</blockquote>`;
    execCommand('insertHTML', quote);
  };

  const ToolbarButton = ({ icon, onClick, title, isActive = false }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
        isActive ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
      }`}
    >
      {icon}
    </button>
  );

  const Modal = ({ isOpen, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 p-2 flex flex-wrap items-center gap-1">
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<Bold className="w-4 h-4" />}
            onClick={() => execCommand('bold')}
            title="Bold"
          />
          <ToolbarButton
            icon={<Italic className="w-4 h-4" />}
            onClick={() => execCommand('italic')}
            title="Italic"
          />
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<Heading1 className="w-4 h-4" />}
            onClick={() => execCommand('formatBlock', '<h1>')}
            title="Heading 1"
          />
          <ToolbarButton
            icon={<Heading2 className="w-4 h-4" />}
            onClick={() => execCommand('formatBlock', '<h2>')}
            title="Heading 2"
          />
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<List className="w-4 h-4" />}
            onClick={() => execCommand('insertUnorderedList')}
            title="Bullet List"
          />
          <ToolbarButton
            icon={<ListOrdered className="w-4 h-4" />}
            onClick={() => execCommand('insertOrderedList')}
            title="Numbered List"
          />
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<Link className="w-4 h-4" />}
            onClick={() => setIsLinkModalOpen(true)}
            title="Insert Link"
          />
          <ToolbarButton
            icon={<Image className="w-4 h-4" />}
            onClick={() => setIsImageModalOpen(true)}
            title="Insert Image"
          />
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<Code className="w-4 h-4" />}
            onClick={insertCodeBlock}
            title="Insert Code Block"
          />
          <ToolbarButton
            icon={<Quote className="w-4 h-4" />}
            onClick={insertQuote}
            title="Insert Quote"
          />
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={<Undo className="w-4 h-4" />}
            onClick={() => execCommand('undo')}
            title="Undo"
          />
          <ToolbarButton
            icon={<Redo className="w-4 h-4" />}
            onClick={() => execCommand('redo')}
            title="Redo"
          />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 focus:outline-none text-gray-900 dark:text-gray-100"
        onInput={updateContent}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: value }}
        style={{
          fontFamily: 'inherit',
          lineHeight: '1.6'
        }}
      />

      {/* Link Modal */}
      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        title="Insert Link"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Link Text
            </label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="input-field"
              placeholder="Enter link text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL
            </label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="input-field"
              placeholder="https://example.com"
            />
          </div>
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={() => setIsLinkModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={insertLink}
              className="btn-primary"
            >
              Insert Link
            </button>
          </div>
        </div>
      </Modal>

      {/* Image Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Insert Image"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alt Text
            </label>
            <input
              type="text"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              className="input-field"
              placeholder="Description of the image"
            />
          </div>
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={insertImage}
              className="btn-primary"
            >
              Insert Image
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RichTextEditor; 