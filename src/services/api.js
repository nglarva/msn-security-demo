import axios from 'axios';

// Kiểm tra môi trường và cấu hình baseURL phù hợp
const isDevelopment = import.meta.env.DEV;

const api = axios.create({
  // Trong môi trường development, sử dụng URL tuyệt đối
  baseURL: isDevelopment ? 'http://localhost:3000/api' : '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Thêm withCredentials nếu bạn cần gửi cookies
  // withCredentials: true,
});

// Thêm interceptors để xử lý lỗi chung
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export const getPosts = async () => {
  try {
    console.log('Fetching posts from:', api.defaults.baseURL + '/posts');
    const response = await api.get('/posts');
    console.log('API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
export const getPostsPerDays = async (day, countDays) => {
  try {
    const response = await api.get('/posts', {
      params: { day, countDays }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts from ${day} for the last ${countDays} days:`, error);
    throw error;
  }
}

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const createPost = async (data) => {
  try {
    const response = await api.post('/posts', data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getKeywords = async () => {
    try {
        const response = await api.get('/keywords');
        return response.data;
    } catch(error){
        console.log("Error fetching keywords");
        throw error;
    }
}

export default api;
