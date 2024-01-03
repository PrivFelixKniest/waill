import { Box, Checkbox, IconButton, Tooltip } from "@mui/material";
import { DARKHIGHLIGHTTEAL, DARKTEAL, HIGHLIGHTTEAL } from "../colors";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addWell,
  setSelectedWellId,
  setWells,
} from "../redux/slices/chatSlice";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useState } from "react";
import { postWell } from "../api/wells";
import { AxiosError } from "axios";
import { wellRepsonseType, wellType } from "../types/chat";

interface CreateWellPageProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateWellPage = ({ setOpen }: CreateWellPageProps) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const wells = useSelector((state: RootState) => state.chat.wells);
  const openaiKey = useSelector((state: RootState) => state.chat.openaiKey);
  const initFormState = {
    name: "",
    instructions: "",
    openaiKey: openaiKey,
  };
  const [form, setForm] = useState(initFormState);
  const [model, setModel] = useState("gpt-3.5-turbo-1106");
  const [saveLoading, setSaveLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateInput = () => {
    if (form.name === "" || !form.openaiKey.includes("sk-")) {
      return false;
    }
    return true;
  };

  const handleSave = () => {
    setSaveLoading(true);
    getAccessTokenSilently()
      .then((authToken: string) => {
        if (validateInput()) {
          postWell(
            form.name,
            form.instructions,
            form.openaiKey,
            model,
            authToken
          )
            .then((resp: wellRepsonseType) => {
              setSaveLoading(false);
              // sus deep copy
              const newWell: wellType = {
                ...resp,
                files: [],
              };
              dispatch(addWell(newWell));
              dispatch(setSelectedWellId(resp.id));
              toast.success("Successfully saved");
              setOpen(false);
            })
            .catch((err: AxiosError) => {
              if (err.response?.status === 400) {
                toast.error(
                  "Your Model selection was denied. This usually occurs when trying to select GPT-4 with an OpenAI key pointing to a free account. Please make sure that you are selecting a model that you have access to."
                );
              } else if (err.response?.status === 422) {
                toast.error(
                  "We were not able to connect to your OpenAI account, most likely due to an invalid key. Please add a valid key and try again."
                );
              } else {
                toast.error(
                  "Something went wrong trying to save your well, please try again later."
                );
              }
              setSaveLoading(false);
            });
        } else {
          setSaveLoading(false);
          toast.warning(
            "Please add at least the name of the Well and a valid OpenAI key (for more info visit the account settings)."
          );
        }
      })
      .catch((err: any) => {
        setSaveLoading(false);
        toast.error(
          "There was an error getting your authorization token, please try again later."
        );
      });
  };

  return (
    <Box sx={{ color: DARKTEAL }}>
      <Box sx={{ fontSize: "20px", marginBottom: "20px" }}>
        Create a New Well
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Box sx={{ marginBottom: "5px" }}>
          <Box>Name</Box>
          <Box sx={{ opacity: ".7", fontSize: "15px", maxWidth: "800px" }}>
            A recognisable name for your well
          </Box>
        </Box>
        <input
          type="text"
          placeholder="My Well"
          className="input-light"
          name="name"
          style={{ width: "100%" }}
          value={form.name}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Box sx={{ marginBottom: "5px" }}>
          <Box>Instructions</Box>
          <Box sx={{ opacity: ".7", fontSize: "15px", maxWidth: "800px" }}>
            How should the AI behave? How should it address you? How should it
            talk?
          </Box>
        </Box>
        <input
          type="text"
          placeholder="You are a ..."
          className="input-light"
          name="instructions"
          style={{ width: "100%" }}
          value={form.instructions}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Box sx={{ marginBottom: "5px" }}>
          <Box>OpenAI API Key</Box>
          <Box sx={{ opacity: ".7", fontSize: "15px", maxWidth: "800px" }}>
            This is set to the default value you defined in your account
            settings. If you want to deviate from your default for this Well you
            can edit the key here.
          </Box>
        </Box>
        <input
          type="password"
          placeholder="sk-..."
          className="input-light"
          name="openaiKey"
          style={{ width: "100%" }}
          value={form.openaiKey}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Box sx={{ marginBottom: "5px" }}>
          <Box>Model</Box>
          <Box sx={{ opacity: ".7", fontSize: "15px", maxWidth: "800px" }}>
            What GPT Model do you want to use for this Well? AI output and costs
            are going to change based on this choice.
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box>
                gpt-3.5<span style={{ opacity: ".65" }}>(-turbo-1106)</span>
              </Box>
            </Box>
            <Checkbox
              sx={{
                color: DARKTEAL,
                "&.Mui-checked": {
                  color: DARKTEAL,
                },
              }}
              checked={model === "gpt-3.5-turbo-1106"}
              onChange={() => setModel("gpt-3.5-turbo-1106")}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box>
                gpt-4<span style={{ opacity: ".65" }}>(-1106-preview)</span>
              </Box>
            </Box>
            <Tooltip
              arrow
              title="Make sure you are using a paid OpenAI key to use GPT-4"
            >
              <Checkbox
                sx={{
                  color: DARKTEAL,
                  "&.Mui-checked": {
                    color: DARKTEAL,
                  },
                }}
                checked={model === "gpt-4-1106-preview"}
                onChange={() => setModel("gpt-4-1106-preview")}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <button
        className="secondary-button-small"
        onClick={handleSave}
        type="button"
        disabled={saveLoading}
      >
        {saveLoading ? "Loading ..." : "Save"}
      </button>
    </Box>
  );
};
