import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configuration for WebDriver
chrome_driver_path = '/path/to/chromedriver'  # Update this path
service = Service(chrome_driver_path)
driver = webdriver.Chrome(service=service)

# URL of the UC Berkeley classes page
url = "https://classes.berkeley.edu/search/class/?f%5B0%5D=im_field_term_name%3A3151"
driver.get(url)

# Wait for the page to load dynamically
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.view-display-id-page')))

# List to hold class data
classes = []

# Scrape the class titles and descriptions
elements = driver.find_elements(By.CSS_SELECTOR, '.search-result')
for element in elements:
    title = element.find_element(By.CSS_SELECTOR, 'h3.course-title').text
    description = element.find_element(By.CSS_SELECTOR, 'p.course-description').text if element.find_elements(By.CSS_SELECTOR, 'p.course-description') else 'No description available'
    classes.append({'Title': title, 'Description': description})

# Convert to DataFrame
df = pd.DataFrame(classes)

# Save to CSV
df.to_csv('UC_Berkeley_Classes_Fall_2024.csv', index=False)

# Close the driver
driver.quit()

print("Data scraped and saved to UC_Berkeley_Classes_Fall_2024.csv")
