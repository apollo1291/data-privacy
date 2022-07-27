from selenium import webdriver

options = webdriver.ChromeOptions()
options.add_argument('--headless')

def sites(SiteList):
    # open chrome automated, automatically close browser after with block
    with webdriver.Chrome(r'C:\Users\hemph\Downloads\chromedriver_win32\chromedriver.exe') as browser:
        data = []

        for site in SiteList:
            browser.get(site)
            c = browser.get_cookies()
            # scrape all of the cookies into a usable format
            cookie_info = [{'name': c['name'], 'secure': c['secure'], 'expires': c.get('expiry', False), 'httpOnly': c['httpOnly']} for c in c]
            
            site_info = {
                'url': site,
                'NumOfCookies': len(cookie_info),
                'nameOfCookies': [x['name'] for x in cookie_info],
                'cookies': cookie_info
            }
            data.append(site_info)
    return data