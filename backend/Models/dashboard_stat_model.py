from config import *
from flask import jsonify
from bson.objectid import ObjectId
from bson.json_util import dumps
import json


class Dashboard():

    def get_dashboard_stats(self):
        stat = db.stats.find()
        resp = jsonify(dumps(stat))
        return resp

    def increment_tweet_images_count(self):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        twitter_images_count = stat["twitter_images_count"]
        stat_id = stat["_id"]

        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'twitter_images_count': twitter_images_count+1}})
        return True
    def increment_uploaded_images_count(self):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        uploaded_images_count = stat["uploaded_images_count"]
        stat_id = stat["_id"]

        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'uploaded_images_count': uploaded_images_count+1}})
        return True
    def increment_ai_camera_images_count(self):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        ai_camera_images_count = stat["ai_camera_images_count"]
        stat_id = stat["_id"]

        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'ai_camera_images_count': ai_camera_images_count+1}})
        return True
    def increment_nst_images_count(self):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        nst_images_count = stat["nst_images_count"]
        stat_id = stat["_id"]

        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'nst_images_count': nst_images_count+1}})
        return True
    def increment_open_sea_uploaded_images_count(self):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        open_sea_uploaded_images_count = stat["open_sea_uploaded_images_count"]
        images_unsold_count =  stat["images_unsold_count"]
        stat_id = stat["_id"]

        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'open_sea_uploaded_images_count': open_sea_uploaded_images_count+1, 'images_unsold_count': images_unsold_count+1}})
        return True
    
    def increment_sold_images_count(self):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        images_sold_count = stat["images_sold_count"]
        images_unsold_count =  stat["images_unsold_count"]
        stat_id = stat["_id"]

        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'images_sold_count': images_sold_count+1, 'images_unsold_count': images_unsold_count-1}})
        return True
    def total_revenue_generated(self,new_cost):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        total_revenue_genrated = stat["total_revenue_generated"]
        stat_id = stat["_id"]

        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'total_revenue_generated': total_revenue_genrated+new_cost}})
        return True

    def insert_tweet_images_data(Self,tweet_id,created_at):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        stat_id = stat["_id"]
        twitter_images_data = stat["twitter_images_data"]
        new_data = {'date':created_at , 'tweet_image_id': tweet_id}
        twitter_images_data.append(new_data)
        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'twitter_images_data': twitter_images_data}})
        return True
    def insert_uploaded_images_data(Self,public_id,created_at):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        stat_id = stat["_id"]
        uploaded_images_data = stat["uploaded_images_data"]
        new_data = {'date':created_at , 'public_image_id': public_id}
        uploaded_images_data.append(new_data)
        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'uploaded_images_data': uploaded_images_data}})
        return True
    def insert_uploaded_images_data(Self,public_id,created_at):
        stat_cursor = db.stats.find()
        stat= json.loads(dumps(stat_cursor))[0]
        stat_id = stat["_id"]
        ai_camera_images_data = stat["ai_camera_images_data"]
        new_data = {'date':created_at , 'public_image_id': public_id}
        ai_camera_images_data.append(new_data)
        db.stats.update_one({'_id': ObjectId(stat_id['$oid']) if '$oid' in stat_id else ObjectId(stat_id)}, {"$set" :{'ai_camera_images_data': ai_camera_images_data}})
        return True

        
