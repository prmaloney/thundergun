#!/usr/bin/env python3
import time, pathlib

LOG       = pathlib.Path.home() / '.local/share/thundergun/wpm.log'
PEAK_FILE = pathlib.Path.home() / '.local/share/thundergun/peak.txt'
WINDOW = 60
IDLE   = 2
STALE  = 300

def calc_raw(char_ts, window):
    if not char_ts:
        return 0
    active, count, i = 0, 0, len(char_ts) - 1
    while i > 0 and active < window:
        gap = char_ts[i] - char_ts[i-1]
        if gap < IDLE:
            active += gap
        count += 1
        i -= 1
    if i == 0:
        count += 1
    return round((count / 5) / (min(active, window) / 60)) if active >= 1 else 0

BURST = 10

def calc_burst(all_ts):
    if not all_ts:
        return 0
    active, count, i = 0, 0, len(all_ts) - 1
    while i > 0 and active < BURST:
        gap = all_ts[i] - all_ts[i-1]
        if gap < IDLE:
            active += gap
        count += 1
        i -= 1
    if i == 0:
        count += 1
    return round((count / 5) / (BURST / 60)) if active >= BURST else 0

try:
    lines = LOG.read_text().splitlines()
    lines = [l for l in lines if l]
    now   = time.time()

    char_ts = sorted([float(l) for l in lines if not l.startswith('W')])
    all_ts  = sorted([float(l.lstrip('W')) for l in lines])

    if not char_ts or now - char_ts[-1] > STALE:
        raw = 0
        burst = 0
    else:
        raw   = calc_raw(all_ts, WINDOW)
        burst = calc_burst(all_ts)

    try:
        stored = int(PEAK_FILE.read_text().strip())
    except:
        stored = 0

    peak = max(burst, stored)
    if peak > stored:
        PEAK_FILE.write_text(str(peak))

    print(f'{raw},{peak},{burst}')
except:
    print('0,0,0')
