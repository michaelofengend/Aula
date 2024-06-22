import praw
import pandas as pd
import time

# Replace these with your own credentials
client_id = 'Ie2l0QIki1ZDylT9zsCPPw'
client_secret = '_m3afV-pXKqRn6JPGjdDHc4uxS8T8Q'
user_agent = 'MichaelOfengenden'  # Example: 'myApp by /u/yourusername'

# Initialize the Reddit instance
reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret,
                     user_agent=user_agent)

# Access a public subreddit (e.g., 'Berkeley')
subreddit = reddit.subreddit('Berkeley')

# Function to filter posts based on keywords
def filter_posts(posts, keywords):
    filtered_posts = []
    for post in posts:
        if any(keyword.lower() in post.title.lower() or keyword.lower() in post.selftext.lower() for keyword in keywords):
            filtered_posts.append(post)
    return filtered_posts

# Function to download filtered posts from the past 10 years
def download_filtered_posts_past_10_years(subreddit, keywords, limit=None, sleep_time=1):
    all_posts = []

    for post in subreddit.new(limit=limit):
        if any(keyword.lower() in post.title.lower() or keyword.lower() in post.selftext.lower() for keyword in keywords):
            all_posts.append([post.title, post.score, post.id, post.subreddit, post.url, post.num_comments, post.selftext, post.created_utc])
        
        if len(all_posts) % 100 == 0:
            print(f"Fetched {len(all_posts)} relevant posts.")
            time.sleep(sleep_time)  # To respect rate limits

    # Create a DataFrame
    posts_df = pd.DataFrame(all_posts, columns=['title', 'score', 'id', 'subreddit', 'url', 'num_comments', 'selftext', 'created'])
    return posts_df

# Define keywords related to classes, grades, majors, degree programs, professors, and recommendations
keywords = [
    'class', 'courses', 'prof', 'math', 'eecs', 'cs', 'classes', 'grade', 'grades', 'major', 'majors', 
    'degree program', 'degree programs', 'professor', 'professors', 
    'recommendation', 'recommendations', 'club', 'clubs', 'course', 'courses', 'Rui Wang',
]

# Example usage
subreddit_name = 'berkeley'
posts_df = download_filtered_posts_past_10_years(subreddit, keywords, limit=None)
posts_df.to_csv(f'{subreddit_name}_relevant_posts_last_10_years.csv', index=False)
print(f'Downloaded {len(posts_df)} relevant posts from r/{subreddit_name}')