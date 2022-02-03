from config import *
from flask import jsonify
from bson.objectid import ObjectId
from bson.json_util import dumps
import json


class Data():

    def get_all_tweet_data(self):
        tweet_data = db.tweet_data.find()
        resp = jsonify(dumps(tweet_data))
        return resp
    def get_all_approved_images_data(self):
        approved_images_data = db.approved_images.find()
        resp =jsonify(dumps(approved_images_data))
        return resp
    def get_all_nst_images_data(self):
        nst_images_data = db.nst_images.find()
        resp =jsonify(dumps(nst_images_data))
        return resp
    def get_uploaded_images_data(self):
        uploaded_images_data = db.uploaded_images.find()
        resp =jsonify(dumps(uploaded_images_data))
        return resp
    def get_rejected_images_data(self):
        rejected_images_data = db.rejected_images.find()
        resp =jsonify(dumps(rejected_images_data))
        return resp