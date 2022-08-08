import requests
session = requests.Session()
print(session.cookies.get_dict())
{}
response = session.get('http://facebook.com')

s = [
    {'name': c.name, 'value': c.value, 'domain': c.domain, 'path': c.path}
    for c in session.cookies
]

print(s)
print(len(s))
