    import pandas as pd
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    from flask import Flask, request, jsonify

    class CourseRecommender:
        def __init__(self):
            self.courses_df = pd.read_csv('uc_berkeley_professors_rmp_cleaned.csv')
            self.courses_df['combined_text'] = self.courses_df['course_name'] + ' ' + self.courses_df['course_description']
            self.vectorizer = TfidfVectorizer(stop_words='english')
            self.course_vectors = self.vectorizer.fit_transform(self.courses_df['combined_text'])

        def recommend_courses(self, interest, major):
            interest_vector = self.vectorizer.transform([interest])
            similarity_scores = cosine_similarity(interest_vector, self.course_vectors).flatten()

            # Filter by major if applicable
            if major:
                major_filtered_df = self.courses_df[self.courses_df['major'] == major]
                major_indices = major_filtered_df.index
                similarity_scores = similarity_scores[major_indices]

            top_indices = similarity_scores.argsort()[-5:][::-1]

            recommendations = []
            for idx in top_indices:
                course = self.courses_df.iloc[idx]
                recommendation = {
                    'course_name': f"{course['course_name']} - {course['course_code']}",
                    'professor_name': course['professor_name'],
                    'class_rating': round(course['class_rating'], 1),
                    'professor_rating': round(course['professor_rating'], 1),
                    'explanation': self.generate_explanation(interest, course)
                }
                recommendations.append(recommendation)

            return recommendations

        def generate_explanation(self, interest, course):
            return f"This course aligns with your interest in {interest} and covers topics in {course['course_name']}."

        def suggest_extracurriculars(self, interest):
            relevant_clubs = self.berkeley_posts_df[self.berkeley_posts_df['post_text'].str.contains(interest, case=False)]
            return relevant_clubs['club_name'].unique().tolist()

    app = Flask(__name__)
    recommender = CourseRecommender()

    @app.route('/recommend', methods=['POST'])
    def recommend():
        data = request.json
        interest = data.get('interest', '')
        major = data.get('major', '')
        recommendations = recommender.recommend_courses(interest, major)
        extracurriculars = recommender.suggest_extracurriculars(interest)

        response = {
            "courses": recommendations,
            "extracurriculars": extracurriculars
        }

        return jsonify(response)

    if __name__ == '__main__':
        app.run(debug=True)
