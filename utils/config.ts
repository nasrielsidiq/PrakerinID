const API_BASE_URL = "http://localhost:8000"; // ganti dengan URL API Anda

export const ENDPOINTS = {
    INTERNSHIPS: `${API_BASE_URL}/api/internships`,
    COOKIES: `${API_BASE_URL}/sanctum/csrf-cookie/`,
    LOGIN: `${API_BASE_URL}/api/login`,
    REGISTER: `${API_BASE_URL}/api/register`,
    SCHOOL_NAME: `${API_BASE_URL}/api/school_name`,
}