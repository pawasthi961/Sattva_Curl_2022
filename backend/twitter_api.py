from config import *
from twitter_api_credentials import *
import tweepy , sys ,time
from tweepy.streaming import Stream
import json
from yolov5 import detect
import urllib.request
import datetime as dt
import os
import sys
from pathlib import Path
from Models.dashboard_stat_model import Dashboard
import NST_model as GAN_NST
import cloudinary
import cloudinary.uploader
from cloudinary_credentials import *


FILE = Path(__file__).resolve()
ROOT = FILE.parents[0]
if str(ROOT) not in sys.path:
    sys.path.append(str(ROOT))  
ROOT = Path(os.path.relpath(ROOT, Path.cwd()))  

cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=CLOUD_API_KEY,
    api_secret=CLOUD_API_SECRET
)


#INITIALIZING API_KEY , API_SECRET
api_key = API_KEY
api_secret = API_SECRET

#INTIALIZING ACCESS_TOKEN , ACCESS_TOKEN_SECRET
access_token = ACCESS_TOKEN
access_token_secret = ACCESS_TOKEN_SECRET

#CREATING AUTHENTICATING HANDLER
auth =  tweepy.OAuthHandler(api_key, api_secret)
auth.set_access_token(access_token , access_token_secret)

api = tweepy.API(auth)

class TwitterStreamListener(Stream):
    ''' Handles data received from the stream. '''
    def on_data(self, data):
        data_json = json.loads(data)
        if 'media' in data_json["entities"]:
            for image in data_json["entities"]["media"]:
                _tweet_id = image["id"]
                _media_url = image["media_url_https"]
                _uploaded_by = data_json["user"]["name"]
                _user_handle = "@"+data_json["user"]["screen_name"]
                _created_at = dt.datetime.now().timestamp()

                #Insert newly tweeted images data
                db.tweet_data.insert_one({
                    'tweet_id': _tweet_id,
                    'media_url': _media_url,
                    'created_at': _created_at,
                    'uploaded_by':_uploaded_by,
                    'user_handle':_user_handle,
                    'object_model_process':0,
                    'gan_model_process' :0,
                    'approved':False
                })
                print("data inserted")

                #Update Dashboard stats
                Dashboard().increment_tweet_images_count()
                Dashboard().insert_tweet_images_data(_tweet_id,_created_at)
                print("count incremented")

                #Initialize file details for tweeted images
                filename_str = "tweet_img_"+str(_tweet_id)+".jpg"
                filename = os.path.join(ROOT/"tweet_images",filename_str)
                urllib.request.urlretrieve(_media_url,filename)
                print("image added to folder")

                #Passing Images to Object detection Model
                object_detect_output = detect.run(ROOT/"tweet_images"/filename_str)
                print("object detection done")


                if(object_detect_output == 1):
                    #Updating image data in database
                    db.tweet_data.update_one({'tweet_id': _tweet_id},{"$set" :{"approved" : True,'object_model_process' : 1}})
                    
                    #Insert approved images details
                    db.approved_images.insert_one({
                        'source':'twitter',
                        'tweet_id': _tweet_id,
                        'media_url': _media_url,
                        'created_at': dt.datetime.now().timestamp(),
                        'uploaded_by':_uploaded_by,
                        'user_handle':_user_handle,
                    })
                    
                    #Initializing file detail for GAN Neural Style Transfer
                    gan_nst_filename_str = "tweet_img_"+str(_tweet_id)+"_gan_nst"+".jpg"
                    gan_nst_filename = os.path.join(ROOT/"NST_generated_images"/gan_nst_filename_str)

                    #Generating NST images 
                    GAN_NST.main_neural_style_transfer(ROOT/"tweet_images"/filename_str,ROOT/"style_images/style_3.jpg",ROOT/gan_nst_filename)

                    #Updating image data in database
                    db.tweet_data.update_one({'tweet_id': _tweet_id},{"$set" :{"gan_model_process" : 1}})

                    #Uploading Image to cloudinary

                    upload_result = cloudinary.uploader.upload(gan_nst_filename)

                    #Saving NST image details

                    db.nst_images.insert_one({
                        'source' : 'twitter',
                        'tweet_id': _tweet_id,
                        'source_media_url': _media_url,
                        'created_at': dt.datetime.now().timestamp(),
                        'uploaded_by':_uploaded_by,
                        'user_handle':_user_handle,
                        'width': upload_result['width'],
                        'height':upload_result['height'],
                        'media_url':upload_result['secure_url'],
                        'signature':upload_result['signature'],
                        'public_id':upload_result['public_id'],
                        'format':upload_result['format'],
                        'bytes' : upload_result['bytes']
                    })

                    #Update Dashboard stats 
                    Dashboard().increment_nst_images_count()

                    

                else:
                    db.tweet_data.update_one({'tweet_id': _tweet_id},{"$set" :{"approved" : False,'object_model_process' : 1}})


                
        print(data_json)
        return True
    
    
    def on_status(self, status):
        print(status.id)
        print(status.user.name)
        print(status.text)
        return True

    def on_error(self, status_code):
        if status_code == 420:
            #returning False in on_data disconnects the stream
            return False
        else:
            print('Got an error with status code: ' + str(status_code))
            return True # To continue listening

    def on_timeout(self):
        print('Timeout...')
        return True # To continue listening

def printtweetdata(n, ith_tweet):
    print()
    print(f"Tweet {n}:")
    print(f"Username:{ith_tweet[0]}")
    print(f"Description:{ith_tweet[1]}")
    print(f"Location:{ith_tweet[2]}")
    print(f"Following Count:{ith_tweet[3]}")
    print(f"Follower Count:{ith_tweet[4]}")
    print(f"Total Tweets:{ith_tweet[5]}")
    print(f"Retweet Count:{ith_tweet[6]}")
    print(f"Tweet Text:{ith_tweet[7]}")
    print(f"Hashtags Used:{ith_tweet[8]}")
    print(f"created_at : {ith_tweet[9]}")

# function to perform data extraction
def scrape(words, numtweet , api):
      
    # Creating DataFrame using pandas
    # db = pd.DataFrame(columns=['username', 'description', 'location', 'following',
                            #    'followers', 'totaltweets', 'retweetcount', 'text', 'hashtags'])
      
    # We are using .Cursor() to search through twitter for the required tweets.
    # The number of tweets can be restricted using .items(number of tweets)
    tweets = tweepy.Cursor(api.search_tweets, q=words, lang="en",
                        
                            tweet_mode='extended').items(numtweet)
     
    # .Cursor() returns an iterable object. Each item in 
    # the iterator has various attributes that you can access to 
    # get information about each tweet
    list_tweets = [tweet for tweet in tweets]
      
    # Counter to maintain Tweet Count
    i = 1  
      
    # we will iterate over each tweet in the list for extracting information about each tweet
    for tweet in list_tweets:
        username = tweet.user.screen_name
        description = tweet.user.description
        location = tweet.user.location
        following = tweet.user.friends_count
        followers = tweet.user.followers_count
        totaltweets = tweet.user.statuses_count
        retweetcount = tweet.retweet_count
        created_at = tweet.created_at
        hashtags = tweet.entities['hashtags']

          
        # Retweets can be distinguished by a retweeted_status attribute,
        # in case it is an invalid reference, except block will be executed
        try:
            text = tweet.retweeted_status.full_text
        except AttributeError:
            text = tweet.full_text
        hashtext = list()
        for j in range(0, len(hashtags)):
            hashtext.append(hashtags[j]['text'])
          
        # Here we are appending all the extracted information in the DataFrame
        ith_tweet = [username, description, location, following,
                     followers, totaltweets, retweetcount, text, hashtext,created_at]
        # db.loc[len(db)] = ith_tweet
          
        # Function call to print tweet data on screen
        printtweetdata(i, ith_tweet)
        i = i+1


    # filename = 'scraped_tweets.csv'
    # we will save our database as a CSV file.
    # db.to_csv(filename)

# function to start Tweet Listener
def tweet_listener():
    #INITIALIZE TWEET LISTENER
    print("listener started")
    # print(api_key,api_secret,access_token,access_token_secret)
    listener = TwitterStreamListener(consumer_key = api_key,consumer_secret = api_secret,access_token = access_token, access_token_secret = access_token_secret,)
    listener.filter(track = ["#SattvaNFT"])
    


if __name__ =="__main__":
    tweet_listener()
    # scrape("#SattvaNFT",5,api)



