import axios from "axios";

export const postQuery = async (
  prompt: string,
  wellId: number,
  authToken: string
) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/well/${wellId}/query`,
    data: { question: prompt },
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await response?.data;
};

export const getRun = async (
  runId: string,
  wellId: number,
  authToken: string
) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER_URL}/well/${wellId}/run/${runId}`,
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await response?.data;
};
