export interface fileType {
  id: number;
  file_name: string;
  file_type: string;
  created_at: string;
  updated_at: string;
}

export interface wellType {
  id: number;
  instructions: string;
  model: string;
  name: string;
  updated_at: string;
  files: fileType[];
  user_id: number;
  created_at: string;
}

export interface wellRepsonseType {
  id: number;
  instructions: string;
  model: string;
  name: string;
  updated_at: string;
  user_id: number;
  created_at: string;
}
