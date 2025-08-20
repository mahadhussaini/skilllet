import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, ThumbsUp, Reply, MoreVertical, User } from 'lucide-react';
import useStore from '../store/useStore';

const DiscussionForum = ({ skillId }) => {
  const { currentUser, isAuthenticated } = useStore();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Mock comments data
    const mockComments = [
      {
        id: 1,
        author: "CodeNinja",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
        content: "This tutorial was really helpful! I especially liked the practical examples.",
        timestamp: "2 hours ago",
        likes: 12,
        replies: [
          {
            id: 11,
            author: "ReactMaster",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=40&h=40&fit=crop",
            content: "Agreed! The examples made it much easier to understand.",
            timestamp: "1 hour ago",
            likes: 5
          }
        ]
      },
      {
        id: 2,
        author: "WebDevPro",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
        content: "Great explanation! Could you add more examples for advanced use cases?",
        timestamp: "3 hours ago",
        likes: 8,
        replies: []
      },
      {
        id: 3,
        author: "SkillLearner",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
        content: "I'm having trouble with step 3. Can someone help me understand the concept better?",
        timestamp: "5 hours ago",
        likes: 3,
        replies: [
          {
            id: 31,
            author: "TechGuru",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
            content: "Sure! Think of it like this: [detailed explanation]",
            timestamp: "4 hours ago",
            likes: 7
          }
        ]
      }
    ];
    
    // Simulate loading comments
    setComments(mockComments);
  }, [skillId]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: currentUser?.username || "Anonymous",
      avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      author: currentUser?.username || "Anonymous",
      avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
      content: replyText,
      timestamp: "Just now",
      likes: 0
    };

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyText('');
    setReplyTo(null);
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      const updatedComments = comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return { ...reply, likes: reply.likes + 1 };
              }
              return reply;
            })
          };
        }
        return comment;
      });
      setComments(updatedComments);
    } else {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      });
      setComments(updatedComments);
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp;
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-8">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Join the discussion
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Sign in to comment and interact with other learners
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Discussion ({comments.length} comments)
        </h3>
      </div>

      {/* Add Comment */}
      <form onSubmit={handleAddComment} className="space-y-4">
        <div className="flex items-start space-x-3">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"}
            alt={currentUser?.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts or ask a question..."
              className="input-field resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} className="mr-1" />
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            {/* Main Comment */}
            <div className="flex items-start space-x-3">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {comment.author}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {comment.content}
                  </p>
                </div>
                
                {/* Comment Actions */}
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <ThumbsUp size={12} />
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setReplyTo(comment.id)}
                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <Reply size={12} />
                    <span>Reply</span>
                  </button>
                </div>

                {/* Reply Form */}
                {replyTo === comment.id && (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="input-field resize-none text-sm"
                      rows={2}
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAddReply(comment.id)}
                        disabled={!replyText.trim()}
                        className="btn-primary text-xs px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => {
                          setReplyTo(null);
                          setReplyText('');
                        }}
                        className="btn-secondary text-xs px-3 py-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="ml-13 space-y-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start space-x-3">
                    <img
                      src={reply.avatar}
                      alt={reply.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {reply.author}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTimestamp(reply.timestamp)}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {reply.content}
                        </p>
                      </div>
                      
                      {/* Reply Actions */}
                      <div className="flex items-center space-x-4 mt-1">
                        <button
                          onClick={() => handleLike(reply.id, true, comment.id)}
                          className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <ThumbsUp size={10} />
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};

export default DiscussionForum; 