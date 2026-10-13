#!/usr/bin/env bash
# Validate that the ZAP scan target URL is reachable, and compute a
# filesystem-safe TARGET_HOST slug for use in artifact names.
#
# Inputs (env):
#   TARGET_URL  URL to validate (required)
# Outputs (via $GITHUB_ENV):
#   TARGET_URL  same URL, re-exported so downstream steps can rely on it
#   TARGET_HOST sanitised hostname slug (alphanumeric + dashes only)
set -euo pipefail

TARGET="${TARGET_URL:?TARGET_URL env var is required}"
echo "Target URL: $TARGET"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$TARGET")
echo "HTTP response code: $HTTP_CODE"
if [ "$HTTP_CODE" = "000" ]; then
  echo "ERROR: Target URL is unreachable — check the URL or network connectivity"
  exit 1
fi
echo "Target reachable (HTTP $HTTP_CODE) — proceeding with scan"

# Build a filesystem-safe slug for the artifact name.
# GitHub artifact names forbid: " : < > | * ? \r \n \ /
# Strict allowlist (alphanumerics only) collapses all other chars to dashes.
# e.g. https://marketplace-qa.tandf.dev/search?q=covid → marketplace-qa-tandf-dev-search-q-covid
TARGET_HOST=$(echo "$TARGET" \
  | sed 's|https\?://||' \
  | sed 's|[^a-zA-Z0-9]|-|g' \
  | sed 's|--*|-|g' \
  | sed 's|^-||' \
  | sed 's|-$||')

{
  echo "TARGET_URL=$TARGET"
  echo "TARGET_HOST=$TARGET_HOST"
} >> "$GITHUB_ENV"
