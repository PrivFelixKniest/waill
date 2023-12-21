import axios from "axios";

export const getUser = async (authToken: string) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER_URL}/user`,
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await response?.data;
};

export const postOpenaiKey = async (openaiKey: string, authToken: string) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/user/openai-key`,
    data: { openai_key: openaiKey },
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await response?.data;
};
