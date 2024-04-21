import os
import subprocess
from urllib.parse import urlparse

def extract_post_code(post_url):
    parsed_url = urlparse(post_url)
    # Extract post code from the path
    post_code = parsed_url.path.split("/")[-2]
    return post_code

def download_instagram_post(post_url):
    post_code = extract_post_code(post_url)
    command = f"python -m instaloader -- -{post_code}"
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    if process.returncode == 0:
        print("Post downloaded successfully.")
    else:
        print("Failed to download post.")
        print("Error:", stderr.decode('utf-8'))

if __name__ == "__main__":
    post_url = "https://www.instagram.com/p/C5yZqSMydmL/?img_index=1"  # Instagram post URL
    download_instagram_post(post_url)
