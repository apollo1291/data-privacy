from datetime import datetime
from datetime import date

def cookie_num_rating(num):
    '''
        rates site based on the number of cookies 
        num: (int) the number of cookies on a site
        return: (int) the rating (0-33) corresponding to the number of cookies 
    '''
    if num == 0:
        return 33
    if num > 16:
        return 0
    
    return 33 - num * 2

def cookie_expiration_rating(num):
    '''
        rates a cookie based on its expiration date, the closer it is the better

        num: (int) a unix epoch representation of the date
        return: (int) a rating (0-33) on the expiration date
    '''
    if (not num):
        return 0
    try:
        dt = str(datetime.fromtimestamp(num)).split(" ")[0]
    except OSError:
        print(num)
        
        dt = str(datetime.fromtimestamp(num/1000)).split(" ")[0]
    today = str(date.today())

    d1 = datetime.strptime(dt, "%Y-%m-%d")
    d2 = datetime.strptime(today, "%Y-%m-%d")

    diff =  d1 - d2
    diff = int(diff.days)

    if diff > 7:
        
        return 33
    if diff < 30:
        
        return 30
    if diff < 90:
        
        return 20
    if diff < 180:
        
        return 10
      
    return 0

def cookie_security_rating(list):
    '''
        rates a cookie based on its security protocols 

        list: (list) containing the (bool) security as its first argument and (bool) httpOnly as its second
        returns: (int) rating (0-33) based on how secure the cookie is
    '''
    dict ={
        True: 33,
        False: 0
    }
    secure = list[0]
    httpOnly = list[1]

    return int((dict[secure] + dict[httpOnly]) / 2)

def rate_site(site_info):
    # rate 0-100
    number_of_cookies = site_info['NumOfCookies']
    if number_of_cookies == 0:
        return 100
    cookie_expiration = 0
    cookie_security = 0

    # categories each worth 33
    cookie_number = cookie_num_rating(number_of_cookies)

    for cookie in site_info['cookies']:
        cookie_expiration += cookie_expiration_rating(cookie['expires'])
    for cookie in site_info['cookies']:
        cookie_security += cookie_security_rating([cookie['secure'], cookie['httpOnly']])
    
    exp = cookie_expiration / number_of_cookies
    sec = cookie_security / number_of_cookies
    
    rating = int(cookie_number + exp + sec)
    
    return rating   




































'''import urllib
import http.cookiejar

URL = 'https://google.com'

def extract_cookies():
    cookie_jar = http.cookiejar.CookieJar()

    url_opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookie_jar))
    url_opener.open(URL)

    for cookie in cookie_jar:
        print("[Cookie Name = %s] -- [Cookie Value = %s]" %(cookie.name, cookie.value))

if __name__ == '__main__':
    extract_cookies()'''