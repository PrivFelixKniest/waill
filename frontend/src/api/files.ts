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