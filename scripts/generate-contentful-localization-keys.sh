#!/bin/bash

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the configuration script first
"$SCRIPT_DIR/configure-contentful.sh"

# Prepare space export
EXPORT_DIR="$PROJECT_ROOT/src/core/i18n"
CONTENT_FILE="generated.json"

mkdir "$EXPORT_DIR"

# Export localization keys
contentful space export \
  --export-dir "$EXPORT_DIR" \
  --query-entries "content_type=localizationKey&select=fields" \
  --query-assets "fields.title=null" \
  --skip-content-model true \
  --skip-roles true \
  --skip-tags true \
  --skip-webhooks true \
  --skip-editor-interfaces true \
  --strip-tags true \
  --content-only true \
  --download-assets false \
  --content-file "$CONTENT_FILE"

# Extract all locales
locales=$(jq -r '[.entries[].fields.key | keys[]] | unique[]' "$EXPORT_DIR/$CONTENT_FILE")
if [ -z "$locales" ]; then
  echo "❌ No locales found in the exported content."
  exit 1
fi

# Create a JSON file for each locale
for locale in $locales; do
  jq --arg locale "$locale" '
    .entries
    | map({ (.fields.key[$locale]): .fields.value[$locale] })
    | add
  ' "$EXPORT_DIR/$CONTENT_FILE" >"$EXPORT_DIR/$locale.json"
done

echo ✅ Localization JSON generated.

rm "$EXPORT_DIR/$CONTENT_FILE"
