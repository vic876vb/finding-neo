interface ImportMetaEnv {
  readonly PUBLIC_URL: string
  readonly CONTENTFUL_DELIVERY_API_URL: string
  readonly CONTENTFUL_MANAGEMENT_API_URL: string
  readonly CONTENTFUL_SPACE_ID: string
  readonly CONTENTFUL_ENV: string
  readonly CONTENTFUL_DELIVERY_TOKEN: string
  readonly CONTENTFUL_MANAGEMENT_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
