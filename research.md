# Research Documentation — Adaptive Learning Path (ALP)

> **Working Title:** Real-Time Emotion-Driven Curriculum Adaptation for Neurodiverse Learners Using Facial Action Unit Analysis  
> **Author:** Gayaru Charan  
> **Affiliation:** Keshav Memorial Engineering College (KMEC), Osmania University  
> **Contact:** charangayer7@gmail.com  
> **Status:** Ongoing — open to collaboration and mentorship

---

## 1. Abstract

This project investigates whether real-time facial emotion recognition can be used to dynamically adapt educational content difficulty for neurodiverse learners, reducing the need for manual therapist intervention. A full-stack system was designed and built integrating a computer vision pipeline (MediaPipe + OpenCV + Flask) with a Node.js adaptation engine and MongoDB-backed session storage. Preliminary results suggest that emotion-triggered difficulty adjustments reduce learner disengagement signals compared to static curriculum delivery.

---

## 2. Problem Statement

Traditional adaptive learning systems rely on explicit learner input (quiz scores, button clicks) to adjust content difficulty. For neurodiverse learners — particularly those with autism spectrum conditions or attention-related differences — self-reporting is unreliable or impossible. Therapists currently must manually monitor sessions and intervene, creating a bottleneck that limits scalability.

**Research Question:**  
*Can real-time passive emotion recognition serve as a reliable proxy signal for cognitive load and engagement in neurodiverse learners, enabling fully automated curriculum adaptation without therapist input?*

---

## 3. Related Work

| Paper | Key Contribution | Relevance |
|---|---|---|
| Ekman & Friesen (1978) — *Facial Action Coding System* | Foundational framework for mapping facial muscle movements to emotional states | Basis for MediaPipe landmark interpretation |
| Picard (1997) — *Affective Computing* | Introduced the concept of computers recognizing and responding to human emotions | Theoretical foundation of this project |
| D'Mello et al. (2012) — *Dynamics of Affective States During Complex Learning* | Found that confusion and frustration are predictive of learning outcomes | Justifies using negative affect as adaptation trigger |
| Filntoulis et al. (2020) — *Real-time Facial Expression Recognition in E-Learning* | CNN-based facial expression recognition applied to online education | Closest prior work; ALP extends this to neurodiverse populations |
| Baker et al. (2010) — *Contextual Slip and Affect in Intelligent Tutoring Systems* | Links affective state to learning performance in ITS | Supports adaptation engine design |

> **Gap this project addresses:** Prior work focuses on neurotypical learners in standard e-learning. ALP is specifically designed for neurodiverse learners with therapist-in-the-loop workflows, a largely understudied application domain.

---

## 4. System Architecture

```
┌──────────────────────────────────────────────────────┐
│                     ALP System                        │
│                                                       │
│  ┌─────────────┐     ┌──────────────────────────┐    │
│  │  Webcam     │────▶│  Flask + MediaPipe Module │    │
│  │  Input      │     │  (Facial Landmark + AU    │    │
│  └─────────────┘     │   Detection)              │    │
│                      └────────────┬─────────────┘    │
│                                   │ Emotion JSON       │
│                                   ▼                   │
│                      ┌──────────────────────────┐    │
│                      │  Node.js Adaptation Engine│    │
│                      │  (Difficulty State Machine│    │
│                      │   + Session Manager)      │    │
│                      └────────────┬─────────────┘    │
│                                   │                   │
│              ┌────────────────────┼──────────────┐   │
│              ▼                    ▼               ▼   │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────┐│
│  │  MongoDB Atlas   │  │  React.js    │  │ Therapist ││
│  │  (Session Data)  │  │  Student UI  │  │ Dashboard ││
│  └──────────────────┘  └──────────────┘  └──────────┘│
└──────────────────────────────────────────────────────┘
```

**Emotion Detection Pipeline:**
1. Webcam frames captured at 15fps
2. MediaPipe FaceMesh extracts 468 facial landmarks per frame
3. Landmark distances mapped to 6 primary emotion states: neutral, happy, confused, frustrated, engaged, disengaged
4. Emotion confidence scores averaged over a 3-second sliding window to reduce noise
5. Confidence score + current difficulty level fed into the adaptation engine

**Adaptation Logic:**
- `frustrated` or `disengaged` for >5 consecutive seconds → reduce difficulty by 1 level
- `engaged` or `happy` sustained for >10 seconds → increase difficulty by 1 level
- `confused` → trigger hint overlay without changing difficulty
- All transitions logged to MongoDB with timestamp and session ID

---

## 5. Methodology

### 5.1 Dataset / Participants
- Pilot testing conducted with a small sample of users (n=8) during development
- Sessions recorded with informed consent for system validation only
- Ground truth emotion labels collected via self-report immediately after sessions

### 5.2 Evaluation Metrics
| Metric | Description | Current Status |
|---|---|---|
| Emotion Detection Accuracy | % of frames correctly classified vs. self-report | ~71% (pilot) |
| Adaptation Trigger Precision | % of difficulty changes that matched user-reported need | ~65% (pilot) |
| Session Engagement Duration | Average time before disengagement signal | Baseline established |
| Therapist Intervention Rate | Manual overrides per session | Reduced vs. control |

### 5.3 Limitations (Current)
- Small pilot sample — not statistically significant
- Self-report ground truth is imprecise for neurodiverse users
- Lighting conditions significantly affect MediaPipe accuracy
- 6-emotion model may be too coarse for nuanced neurodiverse affect

---

## 6. Novel Contributions

1. **Cross-service real-time pipeline** — Emotion inference (Python/Flask) and curriculum logic (Node.js) are decoupled microservices communicating via REST, allowing either module to be swapped independently.
2. **Sliding window smoothing** — 3-second averaging reduces false adaptation triggers from momentary expressions, a problem not addressed in most prior real-time systems.
3. **Therapist-in-the-loop dashboard** — Session replays with emotion timeline allow therapists to review and override system decisions, maintaining human oversight.
4. **Neurodiverse-specific focus** — Unlike prior e-learning affect systems designed for neurotypical users, ALP's adaptation thresholds and hint mechanisms are calibrated for users who may display atypical or muted facial expressions.

---

## 7. Future Work

- [ ] Expand pilot to n=30+ with formal IRB/ethics approval
- [ ] Replace rule-based adaptation engine with a reinforcement learning policy trained on session outcome data
- [ ] Incorporate multimodal signals (gaze tracking, keystroke dynamics) alongside facial affect
- [ ] Evaluate on standardized neurodiverse learning datasets (if/when available)
- [ ] Submit findings to a student research workshop (target: AAAI Undergraduate Consortium or AIED conference)
- [ ] Explore transfer learning from AffectNet / RAF-DB to improve detection accuracy for atypical expressions

---

## 8. How to Reproduce

```bash
# Clone the repo
git clone https://github.com/Cheirun/alp

# Backend (Node.js)
cd backend
npm install
npm start

# Emotion detection module (Python)
cd emotion-service
pip install -r requirements.txt
python app.py

# Frontend (React)
cd frontend
npm install
npm start
```

Full setup instructions in [README.md](./README.md).

---

## 9. Collaboration & Contact

I am actively looking for:
- **Faculty mentorship** from researchers in Affective Computing, HCI, or AI in Education
- **Collaborators** interested in extending this system or contributing to a formal study
- **Feedback** on methodology, evaluation design, or related literature

If you are a researcher or student interested in this work, please reach out:  
📧 charangayer7@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/charan-gayaru) | [GitHub](https://github.com/Cheirun)

---

## 10. Citation

If you reference this work, please cite as:

```
Gayaru, C. (2025). Adaptive Learning Path: Real-Time Emotion-Driven Curriculum 
Adaptation for Neurodiverse Learners. KMEC, Osmania University. 
GitHub: https://github.com/Cheirun/alp
```

---

*Last updated: May 2026*
