from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time

def search_reddit(keyword):
    # Initialize the WebDriver (Ensure you have the correct path to your WebDriver)
    driver = webdriver.Chrome()  # or `webdriver.Firefox()` if you use Firefox
    wait = WebDriverWait(driver, 10)

    # Navigate to the subreddit
    driver.get("https://www.reddit.com/r/berkeley/")

    # Perform the search
    search_box = wait.until(EC.presence_of_element_located((By.NAME, "q")))
    search_box.send_keys(keyword)
    search_box.send_keys(Keys.RETURN)

    # Wait for search results to load
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div._1oQyIsiPHYt6nx7VOmd1sz")))

    # Scrape post titles and links
    posts = []
    post_elements = driver.find_elements(By.CSS_SELECTOR, "a.SQnoC3ObvgnGjWt90zD9Z")

    for post in post_elements:
        title = post.text
        link = post.get_attribute('href')
        posts.append((title, link))

    all_text_data = []

    # Visit each post and scrape text from post and comments
    for title, link in posts:
        driver.get(link)
        time.sleep(2)  # wait for the page to load

        # Scrape post text
        try:
            post_text = driver.find_element(By.CSS_SELECTOR, "div._1qeIAgB0cPwnLhDF9XSiJM").text
        except:
            post_text = ""

        # Scrape comments
        comments = driver.find_elements(By.CSS_SELECTOR, "div._292iotee39Lmt0MkQZ2hPV")
        comments_text = [comment.text for comment in comments]

        all_text_data.append({
            'title': title,
            'post_text': post_text,
            'comments': "\n".join(comments_text)
        })

    driver.quit()

    # Save to CSV
    df = pd.DataFrame(all_text_data)
    df.to_csv('reddit_posts.csv', index=False)

# Example usage
search_reddit("housing")
