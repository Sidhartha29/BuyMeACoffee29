const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface Profile {
  id: string;
  name: string;
  bio: string;
  profile_pic: string;
  wallet_balance: number;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  image_url: string;
  thumbnail_url: string;
  price: number;
  downloads: number;
  category: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface Transaction {
  id: string;
  buyer_id: string;
  creator_id: string;
  image_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  stripe_payment_id: string | null;
  created_at: string;
}

export interface DownloadToken {
  id: string;
  transaction_id: string;
  buyer_id: string;
  image_id: string;
  token: string;
  expires_at: string;
  used: boolean;
  created_at: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Profiles
  async getProfiles(): Promise<Profile[]> {
    return this.request('/profiles');
  }

  async getProfile(id: string): Promise<Profile> {
    return this.request(`/profiles/${id}`);
  }

  async createProfile(profile: Omit<Profile, 'created_at' | 'updated_at'>): Promise<Profile> {
    return this.request('/profiles', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async updateProfile(id: string, profile: Partial<Profile>): Promise<Profile> {
    return this.request(`/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  // Images
  async getImages(): Promise<Image[]> {
    return this.request('/images');
  }

  async getImage(id: string): Promise<Image> {
    return this.request(`/images/${id}`);
  }

  async getImagesByCreator(creatorId: string): Promise<Image[]> {
    return this.request(`/images/creator/${creatorId}`);
  }

  async createImage(image: Omit<Image, 'created_at' | 'updated_at'>): Promise<Image> {
    return this.request('/images', {
      method: 'POST',
      body: JSON.stringify(image),
    });
  }

  async updateImage(id: string, image: Partial<Image>): Promise<Image> {
    return this.request(`/images/${id}`, {
      method: 'PUT',
      body: JSON.stringify(image),
    });
  }

  async deleteImage(id: string): Promise<{ message: string }> {
    return this.request(`/images/${id}`, {
      method: 'DELETE',
    });
  }

  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    return this.request('/transactions');
  }

  async getTransactionsByBuyer(buyerId: string): Promise<Transaction[]> {
    return this.request(`/transactions/buyer/${buyerId}`);
  }

  async getTransactionsByCreator(creatorId: string): Promise<Transaction[]> {
    return this.request(`/transactions/creator/${creatorId}`);
  }

  async createTransaction(transaction: Omit<Transaction, 'created_at'>): Promise<Transaction> {
    return this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  // Download Tokens
  async getDownloadTokensByBuyer(buyerId: string): Promise<DownloadToken[]> {
    return this.request(`/download-tokens/buyer/${buyerId}`);
  }

  async validateDownloadToken(token: string): Promise<{ valid: boolean; image_id: string }> {
    return this.request(`/download-tokens/validate/${token}`);
  }

  async createDownloadToken(token: Omit<DownloadToken, 'created_at'>): Promise<DownloadToken> {
    return this.request('/download-tokens', {
      method: 'POST',
      body: JSON.stringify(token),
    });
  }

  async markTokenAsUsed(token: string): Promise<DownloadToken> {
    return this.request(`/download-tokens/use/${token}`, {
      method: 'PUT',
    });
  }
}

export const api = new ApiClient();
