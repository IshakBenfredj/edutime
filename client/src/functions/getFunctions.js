import { axiosGetWithoutHeader } from "./axiosFunctions";

export const getUser = async (id) => {
  const data = await axiosGetWithoutHeader(`/users/${id}`);
  return data;
};

export const getCourse = async (id) => {
  const data = await axiosGetWithoutHeader(`/courses/${id}`);
  return data;
};

export const getCoursesByUserId = async (id) => {
  const data = await axiosGetWithoutHeader(`/courses/user/${id}`);
  return data;
};

export const getPostsByUserId = async (id) => {
  const data = await axiosGetWithoutHeader(`/posts/${id}`);
  return data;
};
