import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Initialize the Flask application
app = Flask(__name__)
CORS(app)
# --- LOAD THE TRAINED ML MODEL ---
try:
    ml_model = joblib.load('model.joblib')
    print("Successfully loaded ML model.")
except FileNotFoundError:
    print("Warning: model.joblib not found. ML scoring will be disabled.")
    ml_model = None

# --- LOAD DATA FROM CSV ---
try:
    df = pd.read_csv('internships.csv')
    # Convert the 'required_skills' string into a list of strings
    df['required_skills'] = df['required_skills'].str.split('|')
    # Convert the DataFrame to a list of dictionaries
    internships = df.to_dict('records')
    print(f"Successfully loaded {len(internships)} internships from CSV.")
except FileNotFoundError:
    print("Error: internships.csv not found. Please create the file.")
    internships = []

# A simple mapping for education levels for comparison
education_levels = {
    'diploma': 1,
    'bachelor': 2,
    'master': 3
}

# Helper function to create features for the model
def create_features(user_data, internship):
    user_skills = set(user_data.get('skills', []))
    internship_skills = set(internship.get('required_skills', []))
    
    # Calculate skill overlap score
    if not internship_skills:
        skill_overlap = 0.0
    else:
        # Calculate the ratio of matching skills to required skills
        skill_overlap = len(user_skills.intersection(internship_skills)) / len(internship_skills)
        
    # Calculate location match
    location_match = 1 if user_data.get('location', '').lower() == internship.get('location', '').lower() else 0
    
    return [skill_overlap, location_match]

# --- API ENDPOINT ---
@app.route('/ans', methods=['POST'])
def recommend():
    # 1. Capture basic candidate inputs
    user_data = request.get_json()
    user_education = user_data.get('education')
    user_skills = user_data.get('skills')
    
    # --- RULE-BASED PASS (The Filter) ---
    eligible_internships = []
    user_education_level = education_levels.get(user_education, 0)

    for internship in internships:
        internship_education_level = education_levels.get(internship['min_education'], 0)

        # Hard filter: education
        if user_education_level < internship_education_level:
            continue

        # Hard filter: mandatory skills
        if not any(skill in user_skills for skill in internship['required_skills']):
            continue

        eligible_internships.append(internship)

    # --- ML-Light SCORER (The Ranker) ---
    # If the model is loaded, score and rank the internships
    if ml_model:
        scored_internships = []
        # Score ALL eligible internships, not just the first few
        for internship in eligible_internships:
            features = create_features(user_data, internship)
            # Predict the probability of a good match (score is the prob of class '1')
            score = ml_model.predict_proba([features])[0][1]
            internship['score'] = score
            scored_internships.append(internship)
        
        # Sort the scored internships in descending order
        sorted_internships = sorted(scored_internships, key=lambda x: x['score'], reverse=True)
        
        # Return the top 5 from the sorted list
        return jsonify(sorted_internships[:5])

    # Fallback if the model is not loaded: return the first 5 eligible internships
    return jsonify(eligible_internships[:5])

# A simple route to check if the server is running
@app.route('/')
def index():
    return "SAKSHAM Backend is running!"

if __name__ == '__main__':
    app.run(debug=True)
