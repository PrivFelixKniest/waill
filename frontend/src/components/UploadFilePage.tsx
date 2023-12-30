import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { DARKTEAL, HIGHLIGHTTEAL, LIGHTTEAL } from "../colors";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { postUploadFile } from "../api/files";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { fileType, wellType } from "../types/chat";
import { setWells } from "../redux/slices/chatSlice";

interface UploadFilePageProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UploadFilePage = ({ setOpen }: UploadFilePageProps) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const selectedWellId = useSelector(
    (state: RootState) => state.chat.selectedWellId
  );

  const wells = useSelector((state: RootState) => state.chat.wells);

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
            .then((resp: fileType) => {
              let newWells: wellType[] = JSON.parse(JSON.stringify(wells));

              newWells = newWells.map((well) => {
                if (well.id === selectedWellId) {
                  well.files.push(resp);
                }
                return well;
              });

              console.log(newWells);
              dispatch(setWells(newWells));
              setUploading(false);
              setOpen(false);
              toast.success("Successfully uploaded");
            })
            .catch((err: AxiosError) => {
              if (err.response?.status === 412) {
                toast.warning(
                  "Your Well is full! Please remove files before adding new ones."
                );
              } else {
                toast.error("Something went wrong trying to upload your file");
              }
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
      <Box
        sx={{
          marginBottom: "18px",
          paddingBottom: "5px",
          borderBottom: "2px dashed " + DARKTEAL,
        }}
      >
        <Box sx={{ fontSize: "16px", marginBottom: "5px" }}>
          Files in Well:{" "}
          <span style={{ opacity: "0.7" }}>
            {
              wells?.filter((well) => well.id === selectedWellId)?.[0]?.files
                .length
            }
            /20
          </span>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            overflowX: "scroll",
          }}
        >
          {wells
            ?.filter((well) => well.id === selectedWellId)?.[0]
            ?.files.map((file) => {
              const createdDate = new Date(file.created_at);
              return (
                <Box
                  sx={{
                    padding: "5px 10px",
                    border: "2px solid " + DARKTEAL,
                    borderRadius: "10px",
                    width: "fit-content",
                    backgroundColor: LIGHTTEAL,
                    whiteSpace: "nowrap",
                    marginBottom: "5px",
                  }}
                >
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    {file.file_name}
                  </Box>
                  <Box
                    sx={{ width: "100%", textAlign: "center", opacity: "0.7" }}
                  >
                    {createdDate.toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "short",
                      day: "numeric",
                    })}
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
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

              display: "flex",
              gap: "4px",
            }}
          >
            <SearchRoundedIcon sx={{ height: "20px", width: "20px" }} />
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
        style={{
          display: "flex",
          gap: "4px",
        }}
      >
        <FileUploadRoundedIcon sx={{ height: "20px", width: "20px" }} />
        {uploading ? "Uploading ..." : "Upload File"}
      </button>
    </Box>
  );
};
