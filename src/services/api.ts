import { User } from "@/types/user";

// Direct endpoint without /api prefix
const API_URL = '/users';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    console.log("Fetching users from:", API_URL);
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      console.error("Error response:", response.status, response.statusText);
      throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Received data:", data);
    
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID ${id}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.messages?.join(', ') || 'Failed to create user');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.messages?.join(', ') || `Failed to update user ${id}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete user ${id}`);
    }
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};