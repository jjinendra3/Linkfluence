import os
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
import sys

def get_channel_subscribers(channel_id, api_key):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=api_key)

    request = youtube.channels().list(
        part="statistics",
        id=channel_id
    )
    response = request.execute()

    if 'items' in response:
        statistics = response['items'][0]['statistics']
        subscribers = int(statistics['subscriberCount'])
        return subscribers
    else:
        return None

if __name__ == "__main__":
    # Get user input for channel ID and API key
    # channel_id = input("Enter the YouTube channel ID: ")
    api_key = 'AIzaSyD0VmPA9bsnQzLliuPueZMnaFUQjA0dJb4'

    subscribers = get_channel_subscribers(sys.argv[1], api_key)
    if subscribers is not None:
        data={}
        data['Followers']=str(subscribers)
        print(data)
    else:
        print("Failed to fetch subscriber count.")
