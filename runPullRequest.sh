#!/bin/bash
# Local reflection of .github/workflows/ci.yml — same commands, same order.
set -e
cd "$(dirname "$0")"

npm run format:check
npm run types:check
npm run lint
npm run test:ci
npm run typecheck
