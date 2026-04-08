#!/usr/bin/env python3
"""
WPM tracker — logs character keypresses and word boundaries (space/enter/tab).
Regular characters: "1234567890.123"
Word boundaries:    "W1234567890.123"
Trims entries older than 10 minutes to keep the file small.
"""
from pynput import keyboard
import time, pathlib

LOG = pathlib.Path.home() / ".local/share/powerbottom/wpm.log"
LOG.parent.mkdir(parents=True, exist_ok=True)

WORD_KEYS = {keyboard.Key.space, keyboard.Key.enter, keyboard.Key.tab}

def trim(lines):
    cutoff = time.time() - 600
    return [l for l in lines if l and float(l.lstrip("W")) > cutoff]

def on_press(key):
    now = time.time()
    try:
        if key in WORD_KEYS:
            entry = f"W{now:.3f}"
        elif key.char is not None:
            entry = f"{now:.3f}"
        else:
            return
    except AttributeError:
        return

    try:
        lines = trim(LOG.read_text().splitlines())
    except FileNotFoundError:
        lines = []
    lines.append(entry)
    LOG.write_text("\n".join(lines) + "\n")

with keyboard.Listener(on_press=on_press) as listener:
    listener.join()
