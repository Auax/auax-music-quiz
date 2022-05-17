# Run this Python file to quickly deploy to Netlify
import os
import subprocess

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
CLIENT_DIR = os.path.join(ROOT_DIR, "client")
subprocess.call(["yarn", "build"], cwd=CLIENT_DIR, shell=True)
with open(os.path.join(CLIENT_DIR, "build", "_redirects"), "w") as file:
    file.write("/* /index.html 200")
subprocess.call(["netlify", "deploy", "--prod", "--dir", "./build"], cwd=CLIENT_DIR, shell=True)
