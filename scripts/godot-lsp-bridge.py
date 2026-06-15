#!/usr/bin/env python3
"""Stdio <-> TCP bridge for Godot editor's built-in GDScript LSP.

Godot editor's LSP listens on TCP (default port 6005). opencode spawns LSP
servers via stdio. This bridges the two.
"""

import socket
import sys
import threading


def forward(src, dst, name):
    try:
        while True:
            data = src.recv(4096)
            if not data:
                break
            dst.sendall(data)
    except (BrokenPipeError, ConnectionResetError, OSError):
        pass


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 6005

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        sock.connect(("127.0.0.1", port))
    except ConnectionRefusedError:
        sys.stderr.write(f"godot-lsp-bridge: connection refused on port {port}\n")
        sys.exit(1)

    t1 = threading.Thread(target=forward, args=(sys.stdin.buffer, sock, "stdin->tcp"), daemon=True)
    t2 = threading.Thread(target=forward, args=(sock, sys.stdout.buffer, "tcp->stdout"), daemon=True)
    t1.start()
    t2.start()

    try:
        t1.join()
        t2.join()
    except KeyboardInterrupt:
        pass
    finally:
        sock.close()


if __name__ == "__main__":
    main()
