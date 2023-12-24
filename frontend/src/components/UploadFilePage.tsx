import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { DARKTEAL } from "../colors";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { postUploadFile } from "../api/files";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";

interface UploadFilePageProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UploadFilePage = ({ setOpen }: UploadFilePageProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const selectedWellId = useSelector(
    (state: RootState) => state.chat.selectedWellId
  );

  const { getAccessTokenSilently } = useAuth0();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    getAccessTokenSilently()
      .then((authToken: string) => {
        if (file && selectedWellId) {
          postUploadFile(file, selectedWellId, authToken)
            .then((resp: any) => {
              setUploading(false);
              console.log(resp);
              setOpen(false);
              toast.success("Successfully uploaded");
            })
            .catch((err: AxiosError) => {
              console.log(err);
              toast.error("Something went wrong trying to upload your file");
              setUploading(false);
            });
        } else {
          toast.warning("You need to select a file first.");
          setUploading(false);
        }
      })
      .catch((err: any) => {
        toast.error(
          "There was an error getting your authorization token, please try again later."
        );
        setUploading(false);
      });
  };

  return (
    <Box sx={{ maxWidth: "900px", color: DARKTEAL }}>
      <Box sx={{ fontSize: "20px", marginBottom: "20px" }}>Upload File</Box>
      <Box sx={{ display: "flex" }}>
        <label
          htmlFor="file"
          className="sr-only"
          style={{
            width: "fit-content",
            marginRight: "10px",
          }}
        >
          <Box
            className="secondary-button-small"
            sx={{
              marginBottom: "20px",
              boxSizing: "border-box",
              width: "fit-content",
            }}
          >
            Choose a file
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="text/plain, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, text/x-c++, text/x-c, text/html, text/x-java, application/json, text/markdown, text/x-php, text/x-python, text/x-script.python, text/x-ruby, text/x-tex"
            />
          </Box>
        </label>
        {file && <Box sx={{ lineHeight: "31px" }}>{file.name}</Box>}
      </Box>

      <Box>
        <Box sx={{ marginBottom: "5px" }}>
          OpenAI allows each Assistant to carry up to 20 files of up to 512 MBs
          each, with the default configuration. For more information please
          check out the{" "}
          <a
            href="https://platform.openai.com/docs/assistants/how-it-works/creating-assistants"
            target="_blank"
            rel="noreferrer"
          >
            OpenAI documentation
          </a>
          .
        </Box>
        <Box sx={{ marginBottom: "15px" }}>
          View supported filetypes{" "}
          <a
            href="https://platform.openai.com/docs/assistants/tools/supported-files"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>{" "}
          with the "retrieval" checkmark. (For example .txt, .pdf, .tex, .pptx,
          docx, .md and more)
        </Box>
      </Box>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li style={{ color: file.size > 536870912 ? "red" : "green" }}>
              Size: {(file.size / 1048576).toFixed(3)} MB (limit is 512)
            </li>
          </ul>
        </section>
      )}
      <button
        className="primary-button-small"
        type="button"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading ..." : "Upload File"}
      </button>
    </Box>
  );
};
