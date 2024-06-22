import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up the Selenium webdriver (make sure you have the appropriate driver installed)
driver = webdriver.Chrome()  # Use the appropriate driver for your browser

# URL of the webpage to scrape
url = 'https://www2.eecs.berkeley.edu/Faculty/Lists/faculty.html'

# Load the webpage
driver.get(url)

# Wait for the page to load and the desired elements to be present
wait = WebDriverWait(driver, 10)
professor_entries = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.cc-image-list__item')))

# Open a CSV file for writing
with open('professors.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    
    # Write the header row
    writer.writerow(['Name', 'Research Interests'])
    
    # Iterate over each professor entry
    for entry in professor_entries:
        content = entry.find_element(By.CSS_SELECTOR, '.cc-image-list__item__content')
        
        # Extract the professor's name
        name = content.find_element(By.CSS_SELECTOR, 'h3 a').text.strip()
        
        # Extract the research interests
        research_interests = []
        interests_paragraph = content.find_element(By.CSS_SELECTOR, 'p')
        interests_links = interests_paragraph.find_elements(By.CSS_SELECTOR, 'a[href^="/Research/Areas/"]')
        for link in interests_links:
            research_interests.append(link.text.strip())
        
        # Write the professor's name and research interests to the CSV file
        writer.writerow([name, ', '.join(research_interests)])

# Close the webdriver
driver.quit()

print("Data saved to 'professors.csv'.")