import Axios from "../api";

const axiosPostWithoutHeader = async (path, info) => {
  const { data } = await Axios.post(path, info, {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
  return data;
};

const axiosGetWithoutHeader = async (path) => {
  const { data } = await Axios.get(path, {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
  return data;
};

const axiosPutWithoutHeader = async (path, info) => {
  const { data } = await Axios.put(path, info, {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
  return data;
};

const axiosDeleteWithoutHeader = async (path) => {
  const { data } = await Axios.delete(path, {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
  return data;
};

// Functions with headers
const axiosPostWithHeader = async (path, info) => {
  const { data } = await Axios.post(path, info, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
  return data;
};

const axiosGetWithHeader = async (path) => {
  const { data } = await Axios.get(path, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
  return data;
};

const axiosPutWithHeader = async (path, info) => {
  const { data } = await Axios.put(path, info, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
  return data;
};

const axiosDeleteWithHeader = async (path) => {
  const { data } = await Axios.delete(path, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
  return data;
};

export {
  axiosPostWithoutHeader,
  axiosGetWithoutHeader,
  axiosPutWithoutHeader,
  axiosDeleteWithoutHeader,
  axiosPostWithHeader,
  axiosGetWithHeader,
  axiosPutWithHeader,
  axiosDeleteWithHeader,
};

