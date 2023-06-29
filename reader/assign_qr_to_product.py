import pymongo
from datetime import datetime 

myclient = pymongo.MongoClient("mongodb+srv://cephasSuper:cephas123@testdb.5liil.gcp.mongodb.net/")
mydb = myclient["greenuppdb"]
mycol = mydb["product_qr_mapping"]

def assign_qr_to_product(product_id, qr_code_url):
    mapping = {
        "product_id": product_id,
        "qr_code_url": qr_code_url,
        "dateCreated": datetime.now().isoformat()
    }

    mycol.insert_one(mapping)
