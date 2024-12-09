import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  mobile: string;
  type: 'guardian' | 'tutor' | 'admin';
  name: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (mobile: string, email: string) => Promise<string>;
  logout: () => void;
  isAdmin: boolean;
  verifyEmail: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.mobile === '1821702694');
    }
  }, []);

  const login = async (mobile: string, email: string): Promise<string> => {
    // Remove leading zero if present
    const normalizedMobile = mobile.replace(/^0/, '');
    
    if (normalizedMobile === '1821702694' && email.toLowerCase() === 'mdsabbirhossen251920@gmail.com') {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCode(code);
      console.log('Verification code:', code);
      alert(`Your verification code is: ${code}`);
      return '/verify';
    }

    // Check for guardian
    const guardianProfile = localStorage.getItem(`guardian_profile_${mobile}`);
    if (guardianProfile) {
      const profile = JSON.parse(guardianProfile);
      const guardianUser: User = {
        id: profile.id,
        mobile: mobile,
        type: 'guardian',
        name: profile.name,
        email: profile.email
      };
      localStorage.setItem('user', JSON.stringify(guardianUser));
      setUser(guardianUser);
      return '/dashboard';
    }

    // Check for tutor
    const tutorProfile = localStorage.getItem(`tutor_profile_${mobile}`);
    if (tutorProfile) {
      const profile = JSON.parse(tutorProfile);
      if (profile.email === email) {
        const tutorUser: User = {
          id: profile.tutorId,
          mobile: mobile,
          type: 'tutor',
          name: profile.name,
          email: profile.email
        };
        localStorage.setItem('user', JSON.stringify(tutorUser));
        setUser(tutorUser);
        return '/tutor-dashboard';
      }
    }

    throw new Error('Invalid credentials');
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    if (code === verificationCode) {
      const tempUser = {
        id: 'admin',
        mobile: '1821702694',
        email: 'mdsabbirhossen251920@gmail.com',
        type: 'admin' as const,
        name: 'Admin'
      };
      setUser(tempUser);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(tempUser));
      setVerificationCode(null);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};