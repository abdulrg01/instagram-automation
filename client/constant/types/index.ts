export type FieldProps = {
  label: string;
  id: string;
};

export type SidebarProps = {
  icon: string;
} & FieldProps;

export type PageIcons = {
  [page in string]: React.ReactNode;
};

export interface Product {
  id: number;
  name: string;
  // description: string;
  price: number | string;
  category: string;
  image: string;
}
