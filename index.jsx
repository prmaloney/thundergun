export const command = `/opt/homebrew/bin/python3 /Users/prmaloney/personal/thundergun/read-wpm.py`

export const refreshFrequency = 2000

export const className = `
  top: 340px;
  right: 15px;
`

import { run } from "uebersicht"

const reset = () => {
  run("rm -f ~/.local/share/thundergun/peak.txt ~/.local/share/thundergun/wpm.log")
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
          top: 5px;
          right: 7px;
          background: none;
          border: none;
          color: #c0c0c0;
          font-size: 12px;
          cursor: pointer;
          padding: 2px 3px;
          line-height: 1;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
        }
        .reset:hover {
          color: #666;
          background: #f0f0f0;
        }
      `}</style>
    </div>
  )
}
