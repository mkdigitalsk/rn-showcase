#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.." || exit 1

export PATH="$PATH:$HOME/.maestro/bin"
export MAESTRO_CLI_NO_ANALYTICS=1

command -v maestro > /dev/null || {
    echo "maestro not found — install it: curl -Ls https://get.maestro.mobile.dev | bash" >&2
    exit 1
}

DEVICE="${1:-}"
if [[ -z "$DEVICE" ]]; then
    DEVICE=$(adb devices | awk '/\tdevice$/ {print $1; exit}')
    [[ -n "$DEVICE" ]] || { echo "No android device. Pass one explicitly: $0 <device-id>" >&2; exit 1; }
fi

echo "Capturing on $DEVICE"

setLocale() { adb -s "$DEVICE" shell settings put system system_locales "$1" > /dev/null 2>&1 || true; }
setTimezone() { adb -s "$DEVICE" shell service call alarm 3 s16 "$1" > /dev/null 2>&1 || true; }

ORIGINAL_LOCALE=$(adb -s "$DEVICE" shell settings get system system_locales 2>/dev/null | tr -d '\r')
ORIGINAL_TIMEZONE=$(adb -s "$DEVICE" shell getprop persist.sys.timezone 2>/dev/null | tr -d '\r')

setUp() {
    setLocale en-US
    setTimezone UTC
}

tearDown() {
    if [[ -z "$ORIGINAL_LOCALE" || "$ORIGINAL_LOCALE" == "null" ]]; then
        adb -s "$DEVICE" shell settings delete system system_locales > /dev/null 2>&1 || true
    else
        setLocale "$ORIGINAL_LOCALE"
    fi
    [[ -n "$ORIGINAL_TIMEZONE" ]] && setTimezone "$ORIGINAL_TIMEZONE"
    return 0
}

trap tearDown EXIT
setUp

maestro --device "$DEVICE" test .maestro/screenshots.yaml
"$SCRIPT_DIR/generate_screenshots_readme.sh"
