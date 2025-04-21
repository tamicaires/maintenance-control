
export interface IBox {
  name: string;
  description: string | null;
  isActive: boolean;
  companyId: string;
  position: number | null;
}

export interface IBoxWithCount {
  boxes: IBox[];
  totalCount: number;
}