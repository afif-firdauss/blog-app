import axios from 'axios';

const ROOT_API = process.env.NEXT_PUBLIC_API;

export async function getAllPosts() {
  const response = await axios.get(`${ROOT_API}`);
  const axiosResponse = response.data;

  return axiosResponse;
}

export async function getPostDetail(id) {
  const response = await axios.get(`${ROOT_API}/${id}`);
  const axiosResponse = response.data;

  return axiosResponse;
}

export async function createArticle(params) {
  const response = await axios.post(`${ROOT_API}`, params)
  return response;
}

export async function updatePost(id, params) {
  const response = await axios.put(`${ROOT_API}/${id}`, params)
  return response;
}

export async function deletePost(id) {
  const response = await axios.delete(`${ROOT_API}/${id}`);
  return response;
}