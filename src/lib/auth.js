// Mock auth system for development
export const mockUsers = {
  customer: {
    id: "user_001",
    email: "customer@smartstore.com",
    role: "customer",
    segment: "Regular",
    name: "John Customer"
  },
  vip: {
    id: "user_002",
    email: "vip@smartstore.com", 
    role: "customer",
    segment: "VIP",
    name: "Sarah VIP"
  },
  admin: {
    id: "admin_001", 
    email: "admin@smartstore.com",
    role: "admin",
    segment: "VIP",
    name: "Admin User"
  }
};

let currentUser = null;

export const login = (email, password) => {
  // Mock login - in real app would validate against backend
  const user = Object.values(mockUsers).find(u => u.email === email);
  if (user) {
    currentUser = user;
    if (typeof window !== 'undefined') {
      localStorage.setItem('smartstore_user', JSON.stringify(user));
    }
    return { success: true, user };
  }
  return { success: false, error: "Invalid credentials" };
};

export const logout = () => {
  currentUser = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('smartstore_user');
  }
};

export const getCurrentUser = () => {
  if (currentUser) return currentUser;
  
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('smartstore_user');
    if (stored) {
      currentUser = JSON.parse(stored);
      return currentUser;
    }
  }
  
  return null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

export const getUserSegment = () => {
  const user = getCurrentUser();
  return user?.segment || 'Regular';
};

export const isVIPMember = () => {
  const user = getCurrentUser();
  return user?.segment === 'VIP';
};
