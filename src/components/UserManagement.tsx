import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { getUsers, addUser, updateUser, deleteUser } from '../utils/database';

interface UserData {
  id?: number;
  name: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [newUser, setNewUser] = useState<Omit<UserData, 'id'>>({ name: '', email: '', role: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const loadedUsers = await getUsers();
    setUsers(loadedUsers);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await addUser(newUser);
    setNewUser({ name: '', email: '', role: '' });
    loadUsers();
  };

  const handleUpdateUser = async (id: number, updatedData: Partial<UserData>) => {
    await updateUser(id, updatedData);
    loadUsers();
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleAddUser} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add User
          </button>
        </div>
      </form>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <button
                  onClick={() => user.id && handleUpdateUser(user.id, { role: 'Updated Role' })}
                  className="text-blue-500 mr-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => user.id && handleDeleteUser(user.id)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;