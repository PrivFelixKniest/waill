import axios from "axios";

export const getWells = async (authToken: string) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER_URL}/well`,
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await response?.data;
};

export const postWell = async (
  name: string,
  instructions: string,
  openaiKey: string,
  model: string,
  authToken: string
) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/well`,
    data: { model, name, instructions, openai_api_key: openaiKey },
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await response?.data;
};

export const deleteWell = async (id: number, authToken: string) => {
  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_SERVER_URL}/well`,
    data: { id },
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await response?.data;
};
