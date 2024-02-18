import { axiosGetWithoutHeader } from "./axiosFunctions";

export const getUser = async (id) => {
  const data = await axiosGetWithoutHeader(`/users/${id}`);
  return data;
};
