#!/bin/sh
exec tmux new-session -d -s cdn 'http-server -c-1'
