/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REFLECT_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
