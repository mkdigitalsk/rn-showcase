#!/bin/bash

# Two steps:
#   1) maestro --device <id> test .maestro/screenshots.yaml   # (re)capture the PNGs
#   2) scripts/generate_screenshots_readme.sh                  # rebuild the table
#
# Maestro writes under ~/.maestro/tests/<run>/, so step 2 adopts the newest run first.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.." || exit 1

SHOTS_DIR="screenshots"
README="README.md"
COLUMNS=4

# Screen order in the table, and the caption each file gets. A name absent from screenshots/ is skipped.
ORDER="sign-in home ui_components networking storage database platform_apis calendar notifications settings"
caption() {
    case "$1" in
        sign-in) echo "Sign In" ;;
        home) echo "Home" ;;
        ui_components) echo "UI Components" ;;
        networking) echo "Networking" ;;
        storage) echo "Storage" ;;
        database) echo "Database" ;;
        platform_apis) echo "Platform APIs" ;;
        calendar) echo "Calendar" ;;
        notifications) echo "Notifications" ;;
        settings) echo "Settings" ;;
        *) echo "$1" ;;
    esac
}

# Adopt the newest Maestro run so a rerun never publishes stale images.
LATEST_RUN=$(ls -dt "$HOME"/.maestro/tests/*/ 2>/dev/null | head -1 || true)
if [[ -n "$LATEST_RUN" ]]; then
    CAPTURED="$LATEST_RUN/README screenshots/takeScreenshot/$SHOTS_DIR"
    if compgen -G "$CAPTURED/*.png" > /dev/null; then
        mkdir -p "$SHOTS_DIR"
        cp "$CAPTURED"/*.png "$SHOTS_DIR/"
    fi
fi

present=""
for name in $ORDER; do
    [[ -f "$SHOTS_DIR/$name.png" ]] && present="$present $name"
done
present=$(echo "$present" | xargs)
[[ -n "$present" ]] || { echo "No screenshots in $SHOTS_DIR — run the Maestro flow first." >&2; exit 1; }

TABLE=$(mktemp)
{
    echo "## Screenshots"
    echo ""
    echo "<table>"
    # shellcheck disable=SC2086
    set -- $present
    while [[ $# -gt 0 ]]; do
        row=()
        for _ in $(seq 1 $COLUMNS); do
            [[ $# -gt 0 ]] || break
            row+=("$1"); shift
        done
        echo "<tr>"
        for name in "${row[@]}"; do
            echo "<td><img src=\"$SHOTS_DIR/$name.png\" width=\"180\" alt=\"$(caption "$name")\"/></td>"
        done
        echo "</tr>"
        echo "<tr>"
        for name in "${row[@]}"; do
            echo "<td style=\"text-align:center\">$(caption "$name")</td>"
        done
        echo "</tr>"
    done
    echo "</table>"
} > "$TABLE"

# Replace everything between the Screenshots heading and the following horizontal rule.
awk -v table="$TABLE" '
    /^## Screenshots$/ { skipping = 1; while ((getline line < table) > 0) print line; print ""; next }
    skipping && /^---$/ { skipping = 0 }
    !skipping { print }
' "$README" > "$README.tmp" && mv "$README.tmp" "$README"
rm -f "$TABLE"

echo "Rebuilt the Screenshots table in $README ($(echo "$present" | wc -w | xargs) screens)"
