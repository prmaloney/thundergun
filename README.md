# Thundergun

An [Übersicht](https://tracesof.net/uebersicht/) widget that shows your real-time typing speed on the macOS desktop.

Displays three stats, updated every 2 seconds:

- **RAW** — rolling 1-minute average WPM (idle gaps excluded)
- **BURST** — WPM over the last 10 seconds of active typing
- **PEAK** — highest burst recorded this session (persisted to disk)

Click the ↺ button to reset peak and clear the log.

## Setup

**Requirements:** Python 3 (Homebrew), [pynput](https://pypi.org/project/pynput/), [Übersicht](https://tracesof.net/uebersicht/)

```sh
pip3 install pynput
```

**Install the widget:**

```sh
ln -s /Users/yourname/personal/thundergun \
  "$HOME/Library/Application Support/Übersicht/widgets/thundergun.widget"
```

**Start the tracker:**

```sh
bash launch-tracker.sh
```

The tracker must be running for the widget to show live data. You'll need to grant Accessibility permissions to Python in **System Settings → Privacy & Security → Accessibility**.

To auto-start at login, install the included LaunchAgent:

```sh
cp com.thundergun.tracker.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.thundergun.tracker.plist
```

## How it works

`tracker.py` uses pynput to listen for global keypresses and appends timestamps to `~/.local/share/thundergun/wpm.log`. Word boundaries (space, enter, tab) are prefixed with `W`. Entries older than 10 minutes are trimmed on each keystroke.

`index.jsx` runs a Python one-liner every 2 seconds that reads the log and calculates the three stats. If typing has been idle for more than 5 minutes, all stats show 0.
