from selenium import webdriver
from datetime import datetime
from datetime import date
from cookies_rating import *
from get_site_data import sites
from db_connection import connection
from Top_sites import undone
import psycopg2

WEBSITES_LOGGED = 88
COOKIES_LOGGED = 1297
# imported from Top_sites.py
list_of_websites = undone

# collect all the data from websites 
data = sites(list_of_websites)
ratings = []
# rate all websites data
for d in data:
    ratings.append(rate_site(d))
# open connection to datalink_api database to insert the webscraped data
with psycopg2.connect(database=connection['database'], user=connection['user'], password=connection['password'], host=connection['host'], port= connection['port']) as conn:

    cursor = conn.cursor()
    website_data = []
    cookie_data = []
    # get the next id to assign to the website
    cursor.execute('select max(id) from websites')
    Id = cursor.fetchone()[0]
    for i in range(len(ratings)):
        Id += 1
        website_data.append({'id': Id, 'url': list_of_websites[i], 'rating': ratings[i]})

     # !IMPORTANT assign the id relating the cookie to the website it came from
        for cookie in data[i]['cookies']:
            cookie['url_id'] = Id
            cookie_data.append(cookie)


    # id here needs to match the website relational id 
    for site in website_data:
        cursor.execute("INSERT INTO websites (id, url, rating) VALUES(%s, %s, %s)", [site['id'], site['url'], site['rating']])

    # get the cookie primary key in postgres db to assign to the next cookie
    cursor.execute('select max(id) from cookies')
    i = cursor.fetchone()[0]
    # changes cookie['expires'] from unix epoch time to human readable time format
    for cookie in cookie_data:
        i += 1
        if len(cookie['name']) > 40:
            cookie['name'] = cookie['name'][:40]
        expires = cookie['expires']
        if (expires):
            try:
                cookie['expires'] = str(datetime.fromtimestamp(expires))
            except OSError:
                cookie['expires'] = 'unknown'
        else:
            cookie['expires'] = 'never'
        cursor.execute("INSERT INTO cookies (id, name, secure, expires, httpOnly, website_id) VALUES(%s, %s, %s, %s, %s, %s)", [i, cookie['name'][:41], cookie['secure'], cookie['expires'], cookie['httpOnly'], cookie['url_id']])
        

conn.close()

