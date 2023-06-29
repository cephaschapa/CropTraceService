import pymongo

def connect_to_database(connection_string, database_name, collection_name):
    myclient = pymongo.MongoClient(connection_string)
    mydb = myclient[database_name]
    mycol=mydb[collection_name]

    return mycol
