export const command = `
  /opt/homebrew/bin/python3 -c "
import time, pathlib

LOG       = pathlib.Path.home() / '.local/share/powerbottom/wpm.log'
PEAK_FILE = pathlib.Path.home() / '.local/share/powerbottom/peak.txt'
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
"
`

export const refreshFrequency = 2000

export const className = `
  top: 340px;
  right: 15px;
`

import { run } from "uebersicht"

const reset = () => {
  run("rm -f ~/.local/share/powerbottom/peak.txt ~/.local/share/powerbottom/wpm.log")
}

export const render = ({ output }) => {
  const [raw, peak, burst] = (output?.trim() || "0,0,0").split(",")

  return (
    <div className="container">
      <button className="reset" onClick={reset} title="Reset">↺</button>
      <div className="stat">
        <span className="number">{raw}</span>
        <span className="label">RAW</span>
      </div>
      <div className="divider" />
      <div className="stat">
        <span className="number burst">{burst}</span>
        <span className="label">BURST</span>
      </div>
      <div className="divider" />
      <div className="stat">
        <span className="number peak">{peak}</span>
        <span className="label">PEAK</span>
      </div>

      <style>{`
        .container {
          background: white;
          border-radius: 16px;
          padding: 12px 18px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
        }
        .stat {
          display: flex;
          align-items: baseline;
          gap: 5px;
        }
        .number {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
        }
        .burst {
          color: #3b82f6;
        }
        .peak {
          color: #f59e0b;
        }
        .label {
          font-size: 11px;
          font-weight: 500;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .divider {
          width: 1px;
          height: 28px;
          background: #e5e5e5;
        }
        .reset {
          position: absolute;
          top: 4px;
          right: 6px;
          background: none;
          border: none;
          color: #ddd;
          font-size: 11px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: color 0.15s;
        }
        .reset:hover {
          color: #aaa;
        }
      `}</style>
    </div>
  )
}
