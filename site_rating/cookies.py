import requests

session = requests.Session()
print(session.cookies.get_dict('https://www.youtube.com/'))

response = session.get('https://www.youtube.com/')

#the c.expires is returned in seconds since Unix epoch
print([
    {'name': c.name, 'secure': c.secure, 'expires': c.expires, 'value': c.value, 'domain': c.domain, 'path': c.path}
    for c in session.cookies

])

  
