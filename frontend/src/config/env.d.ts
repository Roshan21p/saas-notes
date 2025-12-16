/**
 * Triple-slash /// directive is a special compiler instruction — without it, 
 * TypeScript won’t include those types.
 */

/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_BACKEND_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
  // 'env' is a read-only property on the global 'import.meta' object,
  // representing environment variables available at build time.
  // It has the shape/type defined by the 'ImportMetaEnv' interface.
  //
  // This allows TypeScript to understand and type-check
  // expressions like 'import.meta.env.VITE_BACKEND_API_URL'.
  //
  // Marking it 'readonly' means you cannot reassign 'import.meta.env'
}