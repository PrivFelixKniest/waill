export interface fileType {
  id: number;
  file_name: string;
  file_type: string;
  created_at: string;
  updated_at: string;
}

export enum Creator {
  user = "user",
  assistant = "assistant",
}

export interface messageType {
  id: number;
  content: string;
  message_index: number;
  created_at: string;
  creator: Creator;
}

export interface runMessageType {
  id: null;
  content: string;
  message_index: null;
  created_at: string;
  creator: Creator;
}

export interface wellType {
  id: number;
  instructions: string;
  model: string;
  name: string;
  updated_at: string;
  files: fileType[];
  messages: messageType[];
  user_id: number;
  created_at: string;
}

export interface wellRepsonseType {
  id: number;
  instructions: string;
  model: string;
  name: string;
  messages: messageType[];
  updated_at: string;
  user_id: number;
  created_at: string;
}

export interface runType {
  file_ids: string[];
  instructions: string;
  last_error: string | null;
  model: string;
  response: runMessageType | null;
  run_id: string;
  run_status:
    | "queued"
    | "in_progress"
    | "requires_action"
    | "cancelling"
    | "cancelled"
    | "failed"
    | "completed"
    | "expired";
}
