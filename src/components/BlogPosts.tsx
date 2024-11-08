import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost } from '../utils/database';

interface BlogPostData {
  id?: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [newPost, setNewPost] = useState<Omit<BlogPostData, 'id' | 'createdAt'>>({ title: '', content: '', author: '' });
  const [editingPost, setEditingPost] = useState<BlogPostData | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const loadedPosts = await getBlogPosts();
    setPosts(loadedPosts);
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBlogPost({ ...newPost, createdAt: new Date().toISOString() });
    setNewPost({ title: '', content: '', author: '' });
    loadPosts();
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost && editingPost.id) {
      await updateBlogPost(editingPost.id, editingPost);
      setEditingPost(null);
      loadPosts();
    }
  };

  const handleDeletePost = async (id: number) => {
    await deleteBlogPost(id);
    loadPosts();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
      <form onSubmit={editingPost ? handleUpdatePost : handleAddPost} className="mb-4 bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Title"
          value={editingPost ? editingPost.title : newPost.title}
          onChange={(e) => editingPost ? setEditingPost({ ...editingPost, title: e.target.value }) : setNewPost({ ...newPost, title: e.target.value })}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          placeholder="Content"
          value={editingPost ? editingPost.content : newPost.content}
          onChange={(e) => editingPost ? setEditingPost({ ...editingPost, content: e.target.value }) : setNewPost({ ...newPost, content: e.target.value })}
          className="w-full border p-2 rounded mb-2"
          rows={4}
        />
        <input
          type="text"
          placeholder="Author"
          value={editingPost ? editingPost.author : newPost.author}
          onChange={(e) => editingPost ? setEditingPost({ ...editingPost, author: e.target.value }) : setNewPost({ ...newPost, author: e.target.value })}
          className="w-full border p-2 rounded mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingPost ? 'Update Post' : 'Add Post'}
        </button>
        {editingPost && (
          <button type="button" onClick={() => setEditingPost(null)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
            Cancel
          </button>
        )}
      </form>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-2">{post.content}</p>
            <p className="text-sm text-gray-500">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
            <div className="mt-2">
              <button
                onClick={() => setEditingPost(post)}
                className="text-blue-500 mr-2"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => post.id && handleDeletePost(post.id)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;