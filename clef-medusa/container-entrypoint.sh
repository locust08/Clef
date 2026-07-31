#!/bin/sh
set -eu

npx medusa db:migrate --skip-scripts --execute-safe-links
exec npm run start
