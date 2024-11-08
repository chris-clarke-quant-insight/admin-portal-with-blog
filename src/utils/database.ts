import { openDB, DBSchema } from 'idb';

interface UserData {
  id?: number;
  name: string;
  email: string;
  role: string;
}

interface BlogPostData {
  id?: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface MyDB extends DBSchema {
  users: {
    key: number;
    value: UserData;
    indexes: { 'by-email': string };
  };
  blogPosts: {
    key: number;
    value: BlogPostData;
    indexes: { 'by-createdAt': string };
  };
}

const dbPromise = openDB<MyDB>('admin-portal-db', 2, {
  upgrade(db, oldVersion, newVersion, transaction) {
    if (oldVersion < 1) {
      const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      userStore.createIndex('by-email', 'email', { unique: true });
    }
    if (oldVersion < 2) {
      const blogPostStore = db.createObjectStore('blogPosts', { keyPath: 'id', autoIncrement: true });
      blogPostStore.createIndex('by-createdAt', 'createdAt');
    }
  },
});

// User-related functions
export const getUsers = async (): Promise<UserData[]> => {
  const db = await dbPromise;
  return db.getAll('users');
};

export const addUser = async (userData: Omit<UserData, 'id'>): Promise<void> => {
  const db = await dbPromise;
  await db.add('users', userData);
};

export const updateUser = async (id: number, userData: Partial<UserData>): Promise<void> => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  const existingUser = await store.get(id);
  if (existingUser) {
    await store.put({ ...existingUser, ...userData, id });
  }
  await tx.done;
};

export const deleteUser = async (id: number): Promise<void> => {
  const db = await dbPromise;
  await db.delete('users', id);
};

// Blog post-related functions
export const getBlogPosts = async (): Promise<BlogPostData[]> => {
  const db = await dbPromise;
  return db.getAllFromIndex('blogPosts', 'by-createdAt');
};

export const addBlogPost = async (postData: Omit<BlogPostData, 'id'>): Promise<void> => {
  const db = await dbPromise;
  await db.add('blogPosts', postData);
};

export const updateBlogPost = async (id: number, postData: Partial<BlogPostData>): Promise<void> => {
  const db = await dbPromise;
  const tx = db.transaction('blogPosts', 'readwrite');
  const store = tx.objectStore('blogPosts');
  const existingPost = await store.get(id);
  if (existingPost) {
    await store.put({ ...existingPost, ...postData, id });
  }
  await tx.done;
};

export const deleteBlogPost = async (id: number): Promise<void> => {
  const db = await dbPromise;
  await db.delete('blogPosts', id);
};