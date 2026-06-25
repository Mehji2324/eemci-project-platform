import { api } from './api';

export type Role = 'admin' | 'student' | 'teacher';
export interface User { id: string; name: string; email: string; role: Role; avatar?: string; }

const KEY = 'eemci_user';
const TOKEN_KEY = 'eemci_token';

export const auth = {
  async login(email: string, password: string): Promise<User | null> {
    try {
      // CSRF cookie check - commonly needed for Laravel Sanctum/Session authentication
      // If you are using JWT or just normal API tokens, you can remove this.
      const response = await api.post('/auth/login', { email, password });
      
      const { user, token } = response.data;
      
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      }
      
      if (user) {
        const normalized = { ...user, name: user.full_name ?? user.name ?? '' };
        localStorage.setItem(KEY, JSON.stringify(normalized));
        return normalized;
      }
      
      return null;
    } catch (error) {
      console.error('Login error', error);
      return null;
    }
  },
  logout() { 
    localStorage.removeItem(KEY); 
    localStorage.removeItem(TOKEN_KEY);
  },
  user(): User | null { 
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } 
    catch { return null; } 
  }
};
