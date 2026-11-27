export const command = `/opt/homebrew/bin/python3 /Users/prmaloney/personal/thundergun/read-wpm.py`

export const refreshFrequency = 2000

export const className = `
  top: 372px;
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
          border-radius: 26px;
          padding: 18px 26px 16px;
          isolation: isolate;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Rounded", sans-serif;
          display: flex;
          align-items: center;
          gap: 22px;
          position: relative;
        }
        .container::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: inherit;
          background: linear-gradient(
            145deg,
            rgba(60, 60, 62, 0.55),
            rgba(20, 20, 22, 0.6)
          );
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 8px 28px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .number {
          font-size: 38px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.92);
          line-height: 1;
          font-variant-numeric: tabular-nums;
          width: 3ch;
          text-align: center;
        }
        .burst {
          color: rgba(255, 255, 255, 0.92);
        }
        .peak {
          color: rgba(255, 255, 255, 0.92);
        }
        .label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.14);
        }
        .reset {
          position: absolute;
          top: 8px;
          right: 12px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.3);
          font-size: 12px;
          cursor: pointer;
          padding: 2px 4px;
          line-height: 1;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }
        .reset:hover {
          color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.12);
        }
      `}</style>
    </div>
  )
}
