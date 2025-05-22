#!/bin/bash

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the configuration script first
"$SCRIPT_DIR/configure-contentful.sh"

# Prepare space export
EXPORT_DIR="$PROJECT_ROOT/tmp"
CONTENT_FILE="contentful-export.json"
TYPINGS_DIR="$PROJECT_ROOT/src/types/generated"

mkdir "$EXPORT_DIR"

contentful space export \
  --export-dir "$EXPORT_DIR" \
  --skip-content true \
  --skip-roles true \
  --skip-tags true \
  --skip-webhooks true \
  --skip-editor-interfaces true \
  --download-assets false \
  --content-file "$CONTENT_FILE"

# Generate typescript types
npx cf-content-types-generator "$EXPORT_DIR/$CONTENT_FILE" --out="$TYPINGS_DIR" --v10 --jsdoc --typeguard --response

rm -rf "$EXPORT_DIR"
