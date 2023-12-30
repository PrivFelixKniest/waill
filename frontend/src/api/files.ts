import axios from "axios";

export const postUploadFile = async (
  file: File,
  wellId: number,
  authToken: string
) => {
  const fileData = new FormData();
  fileData.append("upload_file", file);

  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/well/${wellId}/upload-file`,
    data: fileData,
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await response?.data;
};

export const getFiles = async (wellId: number, authToken: string) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER_URL}/well/${wellId}/files`,
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await { data: response?.data, wellId: wellId };
};

export const deleteFile = async (
  wellId: number,
  fileId: number,
  authToken: string
) => {
  const response = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_SERVER_URL}/well/${wellId}/file/${fileId}`,
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await response?.data;
};
