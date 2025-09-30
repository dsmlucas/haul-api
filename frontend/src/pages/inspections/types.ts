interface ImportProps {
  onImport: () => void;
}

interface FilterForm {
  basic?: string;
  code?: string;
  licenseNumber?: string;
}

export type { FilterForm, ImportProps };
