import requests
from bs4 import BeautifulSoup
import pandas as pd
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.common.exceptions import NoSuchElementException, ElementNotInteractableException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def fetch_professor_details(prof_url, headers):
    response = requests.get(prof_url, headers=headers)
    if response.status_code != 200:
        print(f"Failed to fetch professor details: {response.status_code}")
        return None

    prof_soup = BeautifulSoup(response.content, 'html.parser')

    name_tag = prof_soup.find('div', class_='NameTitle__Name-dowf0z-0')
    name = name_tag.text.strip() if name_tag else 'N/A'

    department_tag = prof_soup.find('div', class_='NameTitle__Title-dowf0z-1')
    department = department_tag.text.strip() if department_tag else 'N/A'

    rating_tag = prof_soup.find('div', class_='RatingValue__Numerator-qw8sqy-2')
    rating = rating_tag.text.strip() if rating_tag else 'N/A'

    would_take_again_tag = prof_soup.find('div', class_='FeedbackItem__FeedbackNumber-uof32n-1')
    would_take_again = would_take_again_tag.text.strip() if would_take_again_tag else 'N/A'

    feedback_tags = prof_soup.find_all('div', class_='FeedbackItem__FeedbackNumber-uof32n-1')
    if len(feedback_tags) >= 2:
        difficulty = feedback_tags[1].text.strip()
    else:
        difficulty = 'N/A'

    reviews_tag = prof_soup.find('div', class_='RatingValue__NumRatings-qw8sqy-0')
    if reviews_tag:
        reviews_text = reviews_tag.text.strip()
        reviews = ''.join(filter(str.isdigit, reviews_text))
    else:
        reviews = 'N/A'

    return {
        'Name': name,
        'Department': department,
        'Rating': rating,
        'Difficulty': difficulty,
        'Number of Reviews': reviews,
        'Would Take Again': would_take_again
    }

def scrape_rmp():
    base_url = 'https://www.ratemyprofessors.com'
    search_url = base_url + '/search/professors/1072?q=*'
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }

    options = Options()
    options.headless = True
    options.add_argument('--disable-extensions')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    driver.get(search_url)
    time.sleep(60)  # Increase initial sleep to ensure page is fully loaded

    output_file = 'uc_berkeley_professors_rmp_cleaned.csv'

    # Initialize the CSV file if it doesn't exist
    if not os.path.isfile(output_file):
        pd.DataFrame(columns=['Name', 'Department', 'Rating', 'Difficulty', 'Number of Reviews', 'Would Take Again']).to_csv(output_file, index=False)

    # Read existing data to avoid duplicates
    existing_data = pd.read_csv(output_file).to_dict('records')
    n = 0
    
    while True:
        existing_data = pd.read_csv(output_file).to_dict('records')
        n += 1
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        prof_cards = soup.find_all('a', {"class": 'TeacherCard__StyledTeacherCard-syjs0d-0'})
        
        if not prof_cards:
            print("No professor cards found.")
            break
        
        new_professors = []

        for prof_card in prof_cards:
            href = prof_card.get('href')
            if not href:
                continue

            prof_url = base_url + href
            print(f"Fetching details for URL: {prof_url}")

            details = fetch_professor_details(prof_url, headers)
            if details and details not in existing_data:
                new_professors.append(details)
                existing_data.append(details)
            else:
                print(f"Skipping duplicate or incomplete entry: {prof_url}")

        if new_professors:
            pd.DataFrame(new_professors).to_csv(output_file, mode='a', header=False, index=False)
        else:
            print(f"All professor details on this page already exist in the CSV file: {n}")
        
        try:
            next_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[contains(@class, "PaginationButton__StyledPaginationButton") and contains(@class, "eUNaBX")]'))
            )
            if next_button:
                driver.execute_script("arguments[0].click();", next_button)
                time.sleep(2)
            else:
                print("No more pages.")
                break
            time.sleep(1)
        except (NoSuchElementException, TimeoutException):
            print("No more pages or next button not found.")
            break
        
    driver.quit()

if __name__ == '__main__':
    scrape_rmp()
