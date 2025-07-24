export type News = {
  id: number;
  title: string;
  image: string;
  source: string;
  status: string;
  content: string;
};

export type NewsPayload = {
  title: string;
  image: string;
  source: string;
  content: string;
  status: string;
};

export interface EditNewsPayload {
  title: string;
  source: string;
  image: string;
  content: string;
  status: string;
}
