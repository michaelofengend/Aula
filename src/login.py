import requests
from bs4 import BeautifulSoup
import csv
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Berkeley login page URL
login_url = "https://auth.berkeley.edu/cas/login"

# Login credentials
username = "your_username"
password = "your_password"

# Create a session
session = requests.Session()

# Send a GET request to the login page to retrieve the login form
response = session.get(login_url)
soup = BeautifulSoup(response.text, "html.parser")

# Find the login form and extract the necessary fields
form = soup.find("form", id="fm1")
lt = form.find("input", {"name": "lt"})["value"]
execution = form.find("input", {"name": "execution"})["value"]
_eventId = form.find("input", {"name": "_eventId"})["value"]

# Create the payload for login
payload = {
    "username": username,
    "password": password,
    "lt": lt,
    "execution": execution,
    "_eventId": _eventId,
    "submit": "LOGIN"
}

# Send a POST request to the login form to authenticate
response = session.post(login_url, data=payload)

# Check if the login was successful
if "Welcome" in response.text:
    print("Login successful!")
else:
    print("Login failed.")

# Assume there are CSV files containing user-item ratings
user_item_ratings = []

# Read the CSV files and populate the user_item_ratings list
with open("ratings1.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        user_item_ratings.append(row)

with open("ratings2.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        user_item_ratings.append(row)

# Convert user-item ratings to a numpy array
user_item_matrix = np.array(user_item_ratings, dtype=float)

# Calculate the cosine similarity matrix
similarity_matrix = cosine_similarity(user_item_matrix)

# Function to get recommended items for a user
def get_recommendations(user_id, top_n=5):
    user_index = user_id - 1
    item_scores = list(enumerate(similarity_matrix[user_index]))
    item_scores = sorted(item_scores, key=lambda x: x[1], reverse=True)
    top_items = item_scores[1:top_n+1]
    recommended_items = [item[0] + 1 for item in top_items]
    return recommended_items

# Example usage
user_id = 1
recommended_items = get_recommendations(user_id)
print(f"Recommended items for User {user_id}: {recommended_items}")