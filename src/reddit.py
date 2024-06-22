import praw
import csv

# Initialize the Reddit API client
reddit = praw.Reddit(client_id='your_client_id',
                     client_secret='your_client_secret',
                     user_agent='your_user_agent')

# Specify the subreddit
subreddit_name = 'berkeley'
subreddit = reddit.subreddit(subreddit_name)

# Retrieve posts from the subreddit
posts = []
for post in subreddit.new(limit=None):
    posts.append([post.title, post.score, post.id, post.subreddit, post.url, post.num_comments, post.selftext, post.created])

# Sort the posts by score in descending order
posts = sorted(posts, key=lambda x: x[1], reverse=True)

# Specify the CSV file path
csv_file = 'berkeley_posts.csv'

# Write the sorted posts to the CSV file
with open(csv_file, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['Title', 'Score', 'ID', 'Subreddit', 'URL', 'Number of Comments', 'Text', 'Created'])
    writer.writerows(posts)

print(f"Posts from r/{subreddit_name} have been sorted and saved to {csv_file}.")