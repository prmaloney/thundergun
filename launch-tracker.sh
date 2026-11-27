#!/bin/zsh
if pgrep -f "python3 /Users/prmaloney/personal/thundergun/tracker.py" > /dev/null; then
  exit
fi
nohup /opt/homebrew/bin/python3 /Users/prmaloney/personal/thundergun/tracker.py >> /tmp/thundergun-tracker.log 2>&1 &
disown
exit
