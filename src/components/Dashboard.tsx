import React, { useEffect, useState } from 'react';
import { BarChart, Users, FileText } from 'lucide-react';
import { getUsers, getBlogPosts } from '../utils/database';

const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      const posts = await getBlogPosts();
      setUserCount(users.length);
      setPostCount(posts.length);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{userCount}</p>
            </div>
            <Users size={24} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Blog Posts</p>
              <p className="text-2xl font-bold">{postCount}</p>
            </div>
            <FileText size={24} className="text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Sessions</p>
              <p className="text-2xl font-bold">42</p>
            </div>
            <BarChart size={24} className="text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;