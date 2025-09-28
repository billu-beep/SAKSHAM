# train_model.py
import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

print("Starting model training...")

# Load the training data
try:
    data = pd.read_csv('training_data.csv')
except FileNotFoundError:
    print("Error: training_data.csv not found. Please create it first.")
    exit()

# Prepare data for training
X = data[['skill_overlap', 'location_match']]
y = data['target']

# Initialize and train the model
model = LogisticRegression()
model.fit(X, y)

# Save the trained model to a file
joblib.dump(model, 'model.joblib')

print("Model training complete. Saved to model.joblib.")