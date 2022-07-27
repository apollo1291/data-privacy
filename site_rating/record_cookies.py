from selenium import webdriver
from datetime import datetime
from datetime import date
from cookies_rating import *
from get_site_data import sites
import psycopg2

    
list_of_websites = ['https://github.com', 'https://www.youtube.com/']
# collect all the data from websites 
data = sites(list_of_websites)
ratings = []
# rate all websites data
for d in data:
    ratings.append(rate_site(d))

website_data = []
cookie_data = []
Id = 0
for i in range(len(ratings)):
    Id += 1
    website_data.append({'id': Id, 'url': list_of_websites[i], 'rating': ratings[i]})

    # !IMPORTANT assign the id relating the cookie to the website it came from
    for cookie in data[i]['cookies']:
        cookie['url_id'] = Id
        cookie_data.append(cookie)

# open connection to datalink_api database to insert the webscraped data
with psycopg2.connect(database="datalink_api", user='datalink', password='data', host='localhost', port= '5432') as conn:

    cursor = conn.cursor()
    # id here needs to match the website relational id 
    for site in website_data:
        cursor.execute("INSERT INTO websites (id, url, rating) VALUES(%s, %s, %s)", [site['id'], site['url'], site['rating']])

    cursor.execute("SELECT * FROM websites")
    print(cursor.fetchall())

    # cookie primary key in postgres db
    i = 1 

    # changes cookie['expires'] from unix epoch time to human readable time format
    for cookie in cookie_data:
        expires = cookie['expires']
        if (expires):
            cookie['expires'] = str(datetime.fromtimestamp(expires))
        else:
            cookie['expires'] = 'never'
        cursor.execute("INSERT INTO cookies (id, name, secure, expires, httpOnly, website_id) VALUES(%s, %s, %s, %s, %s, %s)", [i, cookie['name'], cookie['secure'], cookie['expires'], cookie['httpOnly'], cookie['url_id']])
        i += 1
    cursor.execute("SELECT * FROM cookies")
    print(cursor.fetchall())

conn.close()

