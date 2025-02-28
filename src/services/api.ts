import axios from 'axios';
import { Project, AgentStatus, Transfer, Ministry, Analysis } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const dashboardService = {
  getProjects: () => api.get<ApiResponse<Project[]>>('/projects'),
  getAgents: () => api.get<ApiResponse<AgentStatus[]>>('/agents/status'),
  getTransfers: () => api.get<ApiResponse<Transfer[]>>('/transfers/recent'),
};

export const countryService = {
  getMinistries: (country: string) => 
    api.get<ApiResponse<Ministry[]>>(`/countries/${country}/ministries`),
  analyzeCountry: (country: string, ministries: string[]) =>
    api.post<ApiResponse<Analysis>>('/analyze-country', { country, ministries }),
};

export type { Project, AgentStatus, Transfer, Ministry, Analysis }; 