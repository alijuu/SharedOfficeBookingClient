export interface Workspace {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  imageUrl: string;
  description: string;
  floorPlan: number[][];
}
export interface WorkspacesResponse {
  items: Workspace[];
  page: number;
  pageSize: number;
  totalCount: number;
}
