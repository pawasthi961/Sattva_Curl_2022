import cv2
import os
import sys
from config import *
from pathlib import Path
import urllib.request
import datetime as dt
import cloudinary
import cloudinary.uploader
from cloudinary_credentials import *


cam = cv2.VideoCapture(0)

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

while True :
    ret , image =  cam.read()
    cv2.imshow('imagetest', image)
    _created_at = dt.datetime.now().timestamp()

    #Initialize file details for tweeted images

    filename_str = _created_at+".jpg"
    file_path = os.path.join(ROOT/"AI_Captured_images")
    filename = os.path.join(ROOT/"AI_Captured_images"/filename_str)
    path = cv2.imread(file_path)
    cv2.imwrite(filename_str,path)
    
    print("image added to folder")

    #Uploading Image to cloudinary

    upload_result = cloudinary.uploader.upload(filename)
    #Insert newly captured images data

    db.tweet_data.insert_one({
        'media_url':upload_result['secure_url'],
        'created_at': _created_at,
    })
    print("data inserted")


    k = cv2.waitKey(0)
    if k!= -1:
        break

cv2.imwrite('test_1.py', image)
cam.release()
cv2.destroyAllWindows()
