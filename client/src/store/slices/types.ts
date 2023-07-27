export type DataTypes = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export interface OpenSearchState {
  data: DataTypes[];
  loading: boolean;
  error: string | null;
}