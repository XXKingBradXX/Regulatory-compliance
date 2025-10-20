export interface Update {
  change_id: string;
  regulation_id: string;
  regulation_title: string;
  regulation_url: string;
  detected_at: string;
  reviewed: boolean;
}

export interface ChangeDetail {
  regulation_title: string;
  regulation_url: string;
  detected_at: string;
  old_content: string;
  new_content: string;
}
