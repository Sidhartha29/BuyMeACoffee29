import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, Profile } from '../lib/api';

// Mock user type for now since we're migrating away from Supabase
type MockUser = {
  id: string;
  email: string;
};

interface AuthContextType {
  user: MockUser | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      return await api.getProfile(userId);
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    // Mock authentication for now - in a real app this would check localStorage or cookies
    const mockUser = { id: 'user-1', email: 'sidhartha@example.com' };
    setUser(mockUser);
    fetchProfile(mockUser.id).then((profileData) => {
      setProfile(profileData);
      setLoading(false);
    });
  }, []);

  const signUp = async (email: string, _password: string, name: string) => {
    // Mock signup - in a real app this would call an API
    const newUser = { id: `user-${Date.now()}`, email };
    setUser(newUser);
    await api.createProfile({
      id: newUser.id,
      name,
      bio: '',
      profile_pic: '',
      wallet_balance: 0,
    });
  };

  const signIn = async (email: string) => {
    // Mock signin - in a real app this would call an API
    const mockUser = { id: `user-${Date.now()}`, email };
    setUser(mockUser);

    // Fetch or create profile for this user
    let profileData = await fetchProfile(mockUser.id);
    if (!profileData) {
      // Create a new profile if it doesn't exist
      await api.createProfile({
        id: mockUser.id,
        name: email.split('@')[0], // Use email prefix as default name
        bio: '',
        profile_pic: '',
        wallet_balance: 0,
      });
      profileData = await fetchProfile(mockUser.id);
    }
    setProfile(profileData);
  };

  const signOut = async () => {
    // Mock signout
    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
