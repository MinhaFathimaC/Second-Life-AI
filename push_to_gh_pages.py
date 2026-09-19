import subprocess
import os
import shutil

cwd = r"c:\Users\MINHA FATHIMA C\OneDrive\Desktop\ai"
dist_dir = os.path.join(cwd, "frontend", "dist")

# Remove old dist git repo if exists
git_in_dist = os.path.join(dist_dir, ".git")
if os.path.exists(git_in_dist):
    shutil.rmtree(git_in_dist, ignore_errors=True)

# 1. Build Production App
subprocess.run("npm --prefix frontend run build", shell=True, cwd=cwd, check=True)

# 2. Navigate to dist directory
os.chdir(dist_dir)

# 3. Create standalone git repository inside dist and push to gh-pages branch
subprocess.run("git init", shell=True, check=True)
subprocess.run("git add -A", shell=True, check=True)
subprocess.run('git commit -m "Deploy web application to GitHub Pages"', shell=True, check=True)
subprocess.run("git branch -M gh-pages", shell=True, check=True)
subprocess.run("git remote add origin https://github.com/MinhaFathimaC/Second-Life-AI.git", shell=True, check=True)
subprocess.run("git push -u origin gh-pages --force", shell=True, check=True)

print("\nSUCCESS: Successfully deployed production web app to gh-pages branch!")
