import api from './api';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UpdateProfileRequest,
  UpdatePasswordRequest,
} from '@/types';

class AuthService {
  private readonly basePath = '/api/auth';

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      `${this.basePath}/login`,
      credentials
    );
    return response.data.data;
  }

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      `${this.basePath}/register`,
      data
    );
    return response.data.data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/api/users/profile');
    return response.data.data;
  }

  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await api.put<ApiResponse<User>>('/api/users/profile', data);
    return response.data.data;
  }

  async updatePassword(data: UpdatePasswordRequest): Promise<void> {
    await api.put('/api/users/password', data);
  }
}

export const authService = new AuthService();
