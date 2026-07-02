# 🎓 SAKSHAM — Intern Matching Platform

**SAKSHAM** is a full-stack platform that connects students with internship opportunities based on **skill fit, not just keyword search**. Students build profiles, companies post listings, and the platform surfaces relevant matches for both sides.

---

## 🛠️ Tech Stack

**Frontend** — React, TypeScript, Tailwind CSS, shadcn-ui, Vite  
**Backend** — Python, Flask

---

## 📁 Project Structure

SAKSHAM/
├── saksham-intern-match-main/    # React frontend
├── SAKSHAM-backend/              # Python backend
└── .gitignore

---

## 🚀 Getting Started

### 💻 Frontend
```bash
cd saksham-intern-match-main
npm install
npm run dev
```
➡️ Runs at **http://localhost:5173**

### ⚙️ Backend
```bash
cd SAKSHAM-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```
➡️ Runs at **http://localhost:8000**

> **Prerequisites:** Node.js v18+ and Python 3.9+

---

## 🔑 Environment Variables

Create a `.env` file inside `SAKSHAM-backend/` if needed for API keys or config:

```env
FLASK_ENV=development
SECRET_KEY=your_secret_key
```


---

## 🗄️ Data Storage

SAKSHAM currently uses **pandas** for data handling (CSV/JSON-based) — no database setup required.

Data and model files are stored directly in `SAKSHAM-backend/`:
- `internships.csv` — internship listings data
- `training_data.csv` — training data for the matching model
- `model.joblib` — trained scikit-learn model used for match scoring

---

## 🤝 Contributing

```bash
git checkout -b feat/your-feature
git commit -m "feat: what you changed"
git push origin feat/your-feature
```
Then open a **Pull Request** 🎉

### 🌱 Good first contributions
- 🎯 Improve match scoring logic
- 🔐 Add student/company authentication
- 🧪 Write backend API tests
- 📱 Improve mobile responsiveness

---

## 🔮 What's Next
- 📄 Resume parsing to auto-fill student profiles
- 🔔 Real-time match notifications
- 📊 Company analytics dashboard

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.