// StudyBuddy — Core State and Dynamic Logic Engine

// Constant Initial Datasets
const CAREER_SKILLS_MAP = {
  "AI Engineer": [
    { id: "python-basics", title: "Python Basics", desc: "Loops, functions, and standard data types." },
    { id: "pandas-numpy", title: "Pandas & NumPy", desc: "Data cleaning, arrays, and structural data analysis." },
    { id: "sql-essentials", title: "SQL Database Essentials", desc: "Queries, joins, indexing, and data schemas." },
    { id: "ml-foundations", title: "Machine Learning Foundations", desc: "Supervised learning, regression, and model validation." },
    { id: "git-collaboration", title: "Git & GitHub Collaboration", desc: "Branching, PRs, merge conflict resolution, and portfolios." }
  ],
  "Frontend Developer": [
    { id: "html-css", title: "HTML & CSS Layouts", desc: "Semantic tags, Flexbox, Grid, and responsive queries." },
    { id: "javascript-es6", title: "JavaScript ES6 Core", desc: "DOM manipulation, asynchronous fetch, and modular JS." },
    { id: "react-basics", title: "React Frontend Framework", desc: "Components, hooks state management, and routing." },
    { id: "git-collaboration", title: "Git & GitHub Collaboration", desc: "Branching, PRs, merge conflict resolution, and portfolios." }
  ],
  "Product Designer": [
    { id: "ui-ux-design", title: "UI/UX Design Core", desc: "Wireframing, typography, color theory, and prototyping." },
    { id: "figma-mastery", title: "Figma Advanced Tooling", desc: "Auto-layout, components, variants, and design systems." },
    { id: "user-research", title: "User Research & Testing", desc: "Usability tests, persona creation, and empathy maps." }
  ]
};

const INITIAL_MENTORS = [
  {
    id: "mentor-rahul",
    name: "Rahul",
    role: "Final Year CSE Senior",
    skills: ["Python Basics", "Pandas & NumPy", "Machine Learning Foundations"],
    bio: "AI Researcher at College Labs. Completed 3 internships (Data Science focus). Passionate about helping juniors learn ML without fear.",
    rating: "4.9",
    sessionsCount: 42,
    studentsMentored: 30,
    cost: 20,
    demoCode: `import pandas as pd
import numpy as np

# Quick demo of Pandas DataFrame loading
data = {'Skill': ['Python', 'SQL', 'ML'], 'Demand': [95, 80, 90]}
df = pd.DataFrame(data)
print("Welcome to StudyBuddy! Here is your starting point:")
print(df.describe())`
  },
  {
    id: "mentor-nisha",
    name: "Nisha",
    role: "Pre-Final year IT Senior",
    skills: ["Git & GitHub Collaboration", "HTML & CSS Layouts", "JavaScript ES6 Core"],
    bio: "Open-source contributor. GSoC Alumna. Loves structuring beautiful web pages and teaching git workflows clearly.",
    rating: "4.8",
    sessionsCount: 29,
    studentsMentored: 18,
    cost: 15,
    demoCode: `// Git workflow demo snippet
git checkout -b feature/learner-roadmap
git add .
git commit -m "feat: design new AI Matcher"
git push origin feature/learner-roadmap
console.log("Git branch pushed successfully!");`
  },
  {
    id: "mentor-siddharth",
    name: "Siddharth",
    role: "Final Year CS Senior",
    skills: ["SQL Database Essentials", "JavaScript ES6 Core"],
    bio: "Full Stack developer. Interned at Stripe. Specializes in backend system design, schema optimization, and SQL indexing.",
    rating: "5.0",
    sessionsCount: 56,
    studentsMentored: 45,
    cost: 25,
    demoCode: `-- SQL Query Optimizer demo
SELECT m.name, COUNT(s.id) AS sessions
FROM mentors m
LEFT JOIN sessions s ON m.id = s.mentor_id
WHERE s.status = 'completed'
GROUP BY m.id
ORDER BY sessions DESC;`
  }
];

const INITIAL_PROJECTS = [
  {
    id: "proj-calculator",
    title: "Calculator CLI System",
    desc: "Build a modular console calculator using python functions and control loops.",
    skill: "Python Basics",
    reward: 15,
    status: "open"
  },
  {
    id: "proj-clean-data",
    title: "Student Database Sanitizer",
    desc: "Use pandas to parse a messy student grade CSV, clean missing values, and output statistics.",
    skill: "Pandas & NumPy",
    reward: 20,
    status: "open"
  },
  {
    id: "proj-schema",
    title: "Library Catalog Schema Design",
    desc: "Design and implement SQL tables with correct primary/foreign key relationships for a book lending catalog.",
    skill: "SQL Database Essentials",
    reward: 20,
    status: "open"
  }
];

// App State Object
let state = {
  currentRole: "learner", // 'learner' or 'mentor'
  currentView: "landing", // landing, onboarding, learner-dashboard, mentor-dashboard, classroom
  currentTab: "roadmap", // roadmap, find-mentor, sessions, projects (for learner) / portfolio, requests, stats (for mentor)
  
  // Learner profile state (Simulating Ananya)
  learnerProfile: {
    name: "Ananya",
    careerPath: "AI Engineer",
    completedSkills: ["Python Basics"],
    roadmap: [], // Array of { id, title, desc, status: 'completed'|'active'|'locked' }
    credits: 100,
    reputation: 15,
    badges: ["First Milestone", "Quick Learner"]
  },

  // Mentor profile state (Simulating Rahul)
  mentorProfile: {
    name: "Rahul",
    credits: 85,
    reputation: 180,
    badges: ["Top Mentor", "Code Guru", "Review King"],
    studentsMentored: 30,
    hoursMentored: 45,
    portfolio: [
      { name: "Three Internships (Data Analyst & ML)", type: "Work Experience", status: "Verified" },
      { name: "Six Python open-source repos", type: "GitHub", status: "Verified" },
      { name: "Machine Learning Stanford Cert", type: "Certification", status: "Verified" },
      { name: "National Hackathon Winner", type: "Achievement", status: "Verified" }
    ]
  },

  mentors: [...INITIAL_MENTORS],
  projects: [...INITIAL_PROJECTS],
  sessions: [
    {
      id: "sess-past-1",
      learnerName: "Ananya",
      mentorName: "Rahul",
      mentorId: "mentor-rahul",
      topic: "Python Basics (Loops & Recursion)",
      date: "Completed yesterday",
      status: "completed",
      credits: 20
    }
  ]
};

// LocalStorage Synchronization
function saveStateToStorage() {
  localStorage.setItem("studybuddy_state", JSON.stringify(state));
}

function loadStateFromStorage() {
  const stored = localStorage.getItem("studybuddy_state");
  if (stored) {
    try {
      state = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to load state", e);
    }
  }
}

// Custom Toast Utility
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = "✓";
  if (type === "info") icon = "ℹ";
  if (type === "warning") icon = "⚠";
  
  toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Navigation & Routing
function navigateTo(viewId) {
  state.currentView = viewId;
  saveStateToStorage();
  
  // Deactivate all views
  document.querySelectorAll(".view-section").forEach(el => el.classList.remove("active"));
  
  // Activate selected view
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add("active");
  }
  
  // Specific view init actions
  if (viewId === "learner-dashboard") {
    renderLearnerDashboard();
  } else if (viewId === "mentor-dashboard") {
    renderMentorDashboard();
  }
  
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Toggle View Tabs inside Dashboards
function selectTab(tabId) {
  state.currentTab = tabId;
  saveStateToStorage();
  
  // Update sidebar menu highlight
  document.querySelectorAll(".menu-item").forEach(el => {
    el.classList.remove("active", "learner", "mentor");
  });
  
  const activeMenu = document.getElementById(`menu-${tabId}`);
  if (activeMenu) {
    activeMenu.classList.add("active", state.currentRole);
  }
  
  // Update panel displays
  document.querySelectorAll(".tab-panel").forEach(el => el.classList.remove("active"));
  const activePanel = document.getElementById(`panel-${tabId}`);
  if (activePanel) {
    activePanel.classList.add("active");
  }
}

// Switch Role between Learner (Ananya) and Mentor (Rahul)
function switchRole(role) {
  state.currentRole = role;
  saveStateToStorage();
  
  const learnerBtn = document.getElementById("btn-role-learner");
  const mentorBtn = document.getElementById("btn-role-mentor");
  
  if (role === "learner") {
    learnerBtn.classList.add("active", "learner");
    mentorBtn.classList.remove("active", "mentor");
    
    // Update Header Economics
    document.getElementById("pill-credits-value").innerText = state.learnerProfile.credits;
    document.getElementById("pill-reputation-value").innerText = state.learnerProfile.reputation;
    document.getElementById("pill-rep-lbl").innerText = "Reputation";
    
    // Navigate to Learner Dashboard
    navigateTo("learner-dashboard");
    selectTab("roadmap");
    showToast("Switched to Learner Workspace (Ananya)", "info");
  } else {
    mentorBtn.classList.add("active", "mentor");
    learnerBtn.classList.remove("active", "learner");
    
    // Update Header Economics
    document.getElementById("pill-credits-value").innerText = state.mentorProfile.credits;
    document.getElementById("pill-reputation-value").innerText = state.mentorProfile.reputation;
    document.getElementById("pill-rep-lbl").innerText = "Reputation";
    
    // Navigate to Mentor Dashboard
    navigateTo("mentor-dashboard");
    selectTab("requests");
    showToast("Switched to Mentor Workspace (Rahul)", "info");
  }
}

// Roadmap Generation Logic
function initRoadmap(careerPath, selectedCompletedSkills = []) {
  const allSkills = CAREER_SKILLS_MAP[careerPath] || [];
  
  state.learnerProfile.careerPath = careerPath;
  state.learnerProfile.completedSkills = selectedCompletedSkills;
  
  // Build roadmap list
  let foundActive = false;
  state.learnerProfile.roadmap = allSkills.map(skill => {
    let status = "locked";
    if (selectedCompletedSkills.includes(skill.title)) {
      status = "completed";
    } else if (!foundActive) {
      status = "active";
      foundActive = true;
    }
    return { ...skill, status };
  });
  
  // Handle edge case where all are completed
  if (!foundActive && state.learnerProfile.roadmap.length > 0) {
    state.learnerProfile.roadmap[state.learnerProfile.roadmap.length - 1].status = "active";
  }
  
  saveStateToStorage();
}

// Generate Personalized AI Advice Card
function updateAICopilotLearner() {
  const activeNode = state.learnerProfile.roadmap.find(n => n.status === "active");
  const aiText = document.getElementById("learner-ai-text");
  if (!aiText) return;
  
  if (!activeNode) {
    aiText.innerHTML = `<strong>Awesome job, Ananya!</strong> You have finished your roadmap for <strong>${state.learnerProfile.careerPath}</strong>. You are now fully certified to mentor others in these skills! Toggle your role above to start teaching.`;
    return;
  }
  
  // Search for matching mentors for this active node
  const matches = state.mentors.filter(m => m.skills.includes(activeNode.title));
  if (matches.length > 0) {
    aiText.innerHTML = `Analyzing your roadmap... Today you need <strong>${activeNode.title}</strong>. I found <strong>${matches[0].name}</strong>, a ${matches[0].role} who matches your preference. Book a session to resolve gaps.`;
  } else {
    aiText.innerHTML = `You are currently focusing on <strong>${activeNode.title}</strong>. Complete the hands-on project below or search for available mentors to book a quick coaching session.`;
  }
}

function updateAICopilotMentor() {
  const aiText = document.getElementById("mentor-ai-text");
  if (!aiText) return;
  
  const pendingRequests = state.sessions.filter(s => s.status === "pending");
  if (pendingRequests.length > 0) {
    const next = pendingRequests[0];
    aiText.innerHTML = `AI session briefing: Today's learner (<strong>${next.learnerName}</strong>) struggles with <strong>${next.topic}</strong>. Review loops & variable scopes. Suggest the Calculator project after.`;
  } else {
    aiText.innerHTML = `No pending student bookings right now, Rahul. Use this time to verify your certificates, link new GitHub repositories to your portfolio, or review your teaching analytics.`;
  }
}

// Render Learner Dashboard Elements
function renderLearnerDashboard() {
  // Update Profile Metadata
  document.getElementById("learner-profile-name").innerText = state.learnerProfile.name;
  document.getElementById("learner-profile-career").innerText = state.learnerProfile.careerPath;
  document.getElementById("pill-credits-value").innerText = state.learnerProfile.credits;
  document.getElementById("pill-reputation-value").innerText = state.learnerProfile.reputation;
  
  // 1. Render Roadmap Flow
  const roadmapFlow = document.getElementById("roadmap-flow");
  if (roadmapFlow) {
    roadmapFlow.innerHTML = "";
    let completedCount = 0;
    
    state.learnerProfile.roadmap.forEach((node, idx) => {
      if (node.status === "completed") completedCount++;
      
      const nodeEl = document.createElement("div");
      nodeEl.className = `roadmap-node ${node.status}`;
      
      let badgeTag = "Locked";
      if (node.status === "completed") badgeTag = "Completed";
      if (node.status === "active") badgeTag = "In Progress";
      
      nodeEl.innerHTML = `
        <div class="node-icon">${idx + 1}</div>
        <div class="node-details">
          <div class="node-info">
            <h4>${node.title}</h4>
            <p>${node.desc}</p>
          </div>
          <span class="node-tag">${badgeTag}</span>
        </div>
      `;
      roadmapFlow.appendChild(nodeEl);
    });
    
    // Set progress fill percent
    const pct = state.learnerProfile.roadmap.length > 0 
      ? Math.round((completedCount / state.learnerProfile.roadmap.length) * 100) 
      : 0;
    document.getElementById("roadmap-pct-value").innerText = `${pct}%`;
    document.getElementById("roadmap-progress-fill").style.width = `${pct}%`;
  }
  
  // 2. Render Mentors Grid
  const mentorsGrid = document.getElementById("mentors-grid");
  if (mentorsGrid) {
    mentorsGrid.innerHTML = "";
    
    // Suggest mentors teaching active skill first
    const activeNode = state.learnerProfile.roadmap.find(n => n.status === "active");
    const activeSkill = activeNode ? activeNode.title : "";
    
    const sortedMentors = [...state.mentors].sort((a, b) => {
      const aTeaches = a.skills.includes(activeSkill) ? 1 : 0;
      const bTeaches = b.skills.includes(activeSkill) ? 1 : 0;
      return bTeaches - aTeaches;
    });
    
    sortedMentors.forEach(mentor => {
      const card = document.createElement("div");
      card.className = "mentor-card";
      
      const skillTags = mentor.skills.map(s => `<span class="skill-tag">${s}</span>`).join("");
      const isPreferred = mentor.skills.includes(activeSkill) ? '<span class="verified-badge">★ AI Match</span>' : '';
      
      card.innerHTML = `
        <div class="mentor-card-header">
          <div class="mentor-avatar">${mentor.name[0]}</div>
          <div class="mentor-meta">
            <h3>${mentor.name} ${isPreferred}</h3>
            <p>${mentor.role}</p>
          </div>
        </div>
        <div class="mentor-stats">
          <div>
            <div class="mentor-stat-num">${mentor.rating}</div>
            <div class="mentor-stat-lbl">Rating</div>
          </div>
          <div>
            <div class="mentor-stat-num">${mentor.studentsMentored}</div>
            <div class="mentor-stat-lbl">Learners</div>
          </div>
          <div>
            <div class="mentor-stat-num">${mentor.cost}</div>
            <div class="mentor-stat-lbl">Credits</div>
          </div>
        </div>
        <p class="mentor-bio">${mentor.bio}</p>
        <div class="mentor-skills">${skillTags}</div>
        <div class="mentor-actions">
          <button class="btn-sm btn-secondary" onclick="openDemoModal('${mentor.id}')">Demo Video</button>
          <button class="btn-sm btn-learner" onclick="openBookingModal('${mentor.id}')">Book Session</button>
        </div>
      `;
      mentorsGrid.appendChild(card);
    });
  }
  
  // 3. Render Projects Grid
  const projectsGrid = document.getElementById("projects-grid");
  if (projectsGrid) {
    projectsGrid.innerHTML = "";
    
    state.projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";
      
      let statusText = "Available";
      let statusClass = "open";
      let actionBtn = `<button class="btn-sm btn-learner" onclick="submitProject('${project.id}')">Submit Project</button>`;
      
      if (project.status === "completed") {
        statusText = "Completed";
        statusClass = "completed";
        actionBtn = `<button class="btn-sm btn-secondary" disabled>Claimed</button>`;
      }
      
      card.innerHTML = `
        <span class="project-status-tag ${statusClass}">${statusText}</span>
        <h3>${project.title}</h3>
        <p class="mentor-bio">${project.desc}</p>
        <div class="project-reward">
          <span>🪙</span> +${project.reward} credits
        </div>
        <div style="margin-top: auto;">
          ${actionBtn}
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  }
  
  // 4. Render Active Sessions (Learner View)
  const sessionsList = document.getElementById("sessions-list-learner");
  if (sessionsList) {
    sessionsList.innerHTML = "";
    
    const learnerSessions = state.sessions.filter(s => s.learnerName === "Ananya");
    if (learnerSessions.length === 0) {
      sessionsList.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No booked sessions. Go to 'Find Mentor' to schedule one.</p>`;
    } else {
      learnerSessions.forEach(sess => {
        let actionMarkup = "";
        let statusTag = "";
        
        if (sess.status === "pending") {
          statusTag = `<span style="color: var(--credit-color); font-weight: 600;">Pending Confirmation</span>`;
        } else if (sess.status === "approved") {
          statusTag = `<span style="color: var(--learner-color); font-weight: 600;">Confirmed</span>`;
          actionMarkup = `<button class="btn-sm btn-learner" onclick="joinClassroom('${sess.id}')">Join Classroom</button>`;
        } else {
          statusTag = `<span style="color: var(--reputation-color); font-weight: 600;">Completed</span>`;
        }
        
        const item = document.createElement("div");
        item.className = "session-item";
        item.innerHTML = `
          <div class="session-info">
            <div class="session-badge-icon">👨‍🏫</div>
            <div class="session-text">
              <h4>${sess.topic}</h4>
              <p>Mentor: ${sess.mentorName} • ${sess.date}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 1.5rem;">
            ${statusTag}
            ${actionMarkup}
          </div>
        `;
        sessionsList.appendChild(item);
      });
    }
  }
  
  updateAICopilotLearner();
}

// Render Mentor Dashboard Elements
function renderMentorDashboard() {
  document.getElementById("pill-credits-value").innerText = state.mentorProfile.credits;
  document.getElementById("pill-reputation-value").innerText = state.mentorProfile.reputation;
  
  // Update Stats Counters
  document.getElementById("stats-students-count").innerText = state.mentorProfile.studentsMentored;
  document.getElementById("stats-hours-count").innerText = state.mentorProfile.hoursMentored;
  document.getElementById("stats-reputation-count").innerText = state.mentorProfile.reputation;
  document.getElementById("stats-credits-count").innerText = state.mentorProfile.credits;
  
  // 1. Render Student Requests
  const requestsList = document.getElementById("requests-list");
  if (requestsList) {
    requestsList.innerHTML = "";
    
    const pendingSessions = state.sessions.filter(s => s.mentorId === "mentor-rahul" && s.status !== "completed");
    if (pendingSessions.length === 0) {
      requestsList.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No pending learning requests.</p>`;
    } else {
      pendingSessions.forEach(sess => {
        let actionButtons = "";
        let statusLabel = "";
        
        if (sess.status === "pending") {
          actionButtons = `
            <button class="btn-sm btn-secondary" onclick="rejectSession('${sess.id}')">Reject</button>
            <button class="btn-sm btn-mentor" onclick="approveSession('${sess.id}')">Approve</button>
          `;
        } else if (sess.status === "approved") {
          statusLabel = `<span style="color: var(--mentor-color); font-weight: 600; margin-right: 1rem;">Approved</span>`;
          actionButtons = `<button class="btn-sm btn-mentor" onclick="joinClassroom('${sess.id}')">Enter Classroom</button>`;
        }
        
        const item = document.createElement("div");
        item.className = "session-item";
        item.innerHTML = `
          <div class="session-info">
            <div class="session-badge-icon">🎓</div>
            <div class="session-text">
              <h4>${sess.topic}</h4>
              <p>Learner: ${sess.learnerName} • Cost: ${sess.credits} credits</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            ${statusLabel}
            ${actionButtons}
          </div>
        `;
        requestsList.appendChild(item);
      });
    }
  }
  
  // 2. Render Portfolio Verification List
  const portfolioGrid = document.getElementById("portfolio-list");
  if (portfolioGrid) {
    portfolioGrid.innerHTML = "";
    
    state.mentorProfile.portfolio.forEach(item => {
      const pItem = document.createElement("div");
      pItem.className = "portfolio-item";
      pItem.innerHTML = `
        <div class="portfolio-item-meta">
          <span class="portfolio-icon">📁</span>
          <div>
            <h4 style="font-size: 0.95rem;">${item.name}</h4>
            <p style="font-size: 0.75rem; color: var(--text-secondary);">${item.type}</p>
          </div>
        </div>
        <span class="portfolio-status verified">${item.status}</span>
      `;
      portfolioGrid.appendChild(pItem);
    });
  }
  
  updateAICopilotMentor();
}

// Classroom Simulation Loop
let classroomSessionId = null;

function joinClassroom(sessionId) {
  classroomSessionId = sessionId;
  navigateTo("classroom");
  
  const sess = state.sessions.find(s => s.id === sessionId);
  if (!sess) return;
  
  // Set Header Information
  document.getElementById("classroom-topic").innerText = sess.topic;
  document.getElementById("classroom-user-names").innerText = `Learner: ${sess.learnerName} | Mentor: ${sess.mentorName}`;
  
  // Handle Classroom View depending on Learner vs Mentor role
  const classroomCoach = document.getElementById("classroom-ai-coach-card");
  const editorArea = document.getElementById("classroom-editor");
  const finishBtn = document.getElementById("classroom-finish-btn");
  
  if (state.currentRole === "learner") {
    classroomCoach.className = "classroom-ai-coach learner-mode";
    document.getElementById("classroom-ai-name").innerText = "StudyBuddy AI";
    document.getElementById("classroom-ai-tip").innerText = `Ananya, you are currently learning ${sess.topic}. Use the editor to take notes or code together. Ask Rahul to assign a practice problem when ready.`;
    editorArea.value = `// Welcome to the live coding notepad!\n// ${sess.topic}\n\n`;
    finishBtn.style.display = "none"; // Only Mentor handles finishing to transfer credits
  } else {
    classroomCoach.className = "classroom-ai-coach mentor-mode";
    document.getElementById("classroom-ai-name").innerText = "StudyBuddy Advisor";
    document.getElementById("classroom-ai-tip").innerText = `Rahul, Ananya struggles with loop iterations. Focus on practical exercises like nested loops, and suggest the Calculator CLI Project!`;
    editorArea.value = `// Python loops demo editor\n\nfor i in range(1, 6):\n    print(f"Iteration {i}")\n`;
    finishBtn.style.display = "inline-flex";
  }
  
  // Setup Chat logs
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML = `
    <div class="chat-msg other">Hello! Ready to start the lesson on ${sess.topic}?</div>
  `;
}

// Send Message in Classroom Chat
function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;
  
  const chatMessages = document.getElementById("chat-messages");
  
  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "chat-msg self";
  userMsg.innerText = text;
  chatMessages.appendChild(userMsg);
  
  input.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Trigger AI advice updates dynamically based on keywords
  setTimeout(() => {
    const activeNode = state.learnerProfile.roadmap.find(n => n.status === "active");
    const activeSkill = activeNode ? activeNode.title : "this topic";
    
    let aiTip = "";
    if (text.toLowerCase().includes("error") || text.toLowerCase().includes("fail")) {
      aiTip = "AI Buddy Tip: Review syntax indentation or syntax keywords. Make sure libraries are imported.";
    } else if (text.toLowerCase().includes("project") || text.toLowerCase().includes("homework")) {
      aiTip = `AI Buddy Tip: There is an open project matching ${activeSkill} in the dashboard. Completing it awards extra credits!`;
    }
    
    if (aiTip) {
      document.getElementById("classroom-ai-tip").innerText = aiTip;
      showToast("AI Copilot updated advice card", "info");
    }
  }, 1000);
}

// Complete Classroom Session
function finishClassroomSession() {
  if (!classroomSessionId) return;
  
  const index = state.sessions.findIndex(s => s.id === classroomSessionId);
  if (index === -1) return;
  
  const sess = state.sessions[index];
  sess.status = "completed";
  
  if (state.currentRole === "mentor") {
    // Reward Mentor
    state.mentorProfile.credits += sess.credits;
    state.mentorProfile.reputation += 10;
    state.mentorProfile.hoursMentored += 1;
    
    // Advance Learner Roadmap
    const activeNodeIndex = state.learnerProfile.roadmap.findIndex(n => n.status === "active");
    if (activeNodeIndex !== -1) {
      state.learnerProfile.roadmap[activeNodeIndex].status = "completed";
      
      // Update completedSkills list
      const skillTitle = state.learnerProfile.roadmap[activeNodeIndex].title;
      if (!state.learnerProfile.completedSkills.includes(skillTitle)) {
        state.learnerProfile.completedSkills.push(skillTitle);
      }
      
      // Set next locked node to active
      const nextNode = state.learnerProfile.roadmap.find((n, i) => i > activeNodeIndex && n.status === "locked");
      if (nextNode) {
        nextNode.status = "active";
      }
    }
    
    saveStateToStorage();
    showToast(`Session Completed! Transferred +${sess.credits} credits. Reputation increased!`, "success");
    navigateTo("mentor-dashboard");
  }
}

// Session Requests actions
function approveSession(sessId) {
  const sess = state.sessions.find(s => s.id === sessId);
  if (sess) {
    sess.status = "approved";
    saveStateToStorage();
    showToast("Session Approved! Classroom is now open.", "success");
    renderMentorDashboard();
  }
}

function rejectSession(sessId) {
  const index = state.sessions.findIndex(s => s.id === sessId);
  if (index !== -1) {
    // Refund credits to learner
    const sess = state.sessions[index];
    state.learnerProfile.credits += sess.credits;
    state.sessions.splice(index, 1);
    saveStateToStorage();
    showToast("Session booking rejected and refunded.", "warning");
    renderMentorDashboard();
  }
}

// Project Submission Flow
function submitProject(projId) {
  const proj = state.projects.find(p => p.id === projId);
  if (!proj || proj.status === "completed") return;
  
  proj.status = "completed";
  state.learnerProfile.credits += proj.reward;
  
  // Also check if this completes the active roadmap skill
  const activeNodeIndex = state.learnerProfile.roadmap.findIndex(n => n.title === proj.skill && n.status === "active");
  if (activeNodeIndex !== -1) {
    state.learnerProfile.roadmap[activeNodeIndex].status = "completed";
    
    if (!state.learnerProfile.completedSkills.includes(proj.skill)) {
      state.learnerProfile.completedSkills.push(proj.skill);
    }
    
    const nextNode = state.learnerProfile.roadmap.find((n, i) => i > activeNodeIndex && n.status === "locked");
    if (nextNode) {
      nextNode.status = "active";
    }
  }
  
  saveStateToStorage();
  showToast(`Project Submitted! Earning +${proj.reward} credits. Skill checked off!`, "success");
  renderLearnerDashboard();
}

// Booking Modal Actions
let targetMentorId = null;

function openBookingModal(mentorId) {
  const mentor = state.mentors.find(m => m.id === mentorId);
  if (!mentor) return;
  
  targetMentorId = mentorId;
  
  const activeNode = state.learnerProfile.roadmap.find(n => n.status === "active");
  const topicInput = document.getElementById("booking-topic");
  if (topicInput && activeNode) {
    topicInput.value = activeNode.title;
  }
  
  document.getElementById("booking-mentor-name").innerText = mentor.name;
  document.getElementById("booking-credits-cost").innerText = mentor.cost;
  document.getElementById("booking-modal").classList.add("active");
}

function closeBookingModal() {
  document.getElementById("booking-modal").classList.remove("active");
}

function confirmBooking() {
  if (!targetMentorId) return;
  
  const mentor = state.mentors.find(m => m.id === targetMentorId);
  if (!mentor) return;
  
  const topic = document.getElementById("booking-topic").value.trim() || "General Study Session";
  
  if (state.learnerProfile.credits < mentor.cost) {
    showToast("Insufficient credits! Submit projects to earn credits.", "warning");
    closeBookingModal();
    return;
  }
  
  // Deduct credits and book session
  state.learnerProfile.credits -= mentor.cost;
  
  const newSession = {
    id: `sess-${Date.now()}`,
    learnerName: "Ananya",
    mentorName: mentor.name,
    mentorId: mentor.id,
    topic: topic,
    date: "Scheduled (Join now)",
    status: "pending",
    credits: mentor.cost
  };
  
  state.sessions.push(newSession);
  saveStateToStorage();
  
  showToast(`Booked session with ${mentor.name}! Pending mentor confirmation.`, "success");
  closeBookingModal();
  renderLearnerDashboard();
}

// Video Player Demo Modal Actions
let demoVideoInterval = null;

function openDemoModal(mentorId) {
  const mentor = state.mentors.find(m => m.id === mentorId);
  if (!mentor) return;
  
  document.getElementById("demo-mentor-name").innerText = mentor.name;
  
  const container = document.getElementById("video-container");
  container.classList.remove("playing");
  
  const progressFill = document.getElementById("video-progress-fill");
  progressFill.style.width = "0%";
  
  const codeLines = document.getElementById("video-code-lines");
  codeLines.innerHTML = `// Click Play to watch ${mentor.name}'s coding tutorial`;
  
  document.getElementById("demo-modal").classList.add("active");
}

function closeDemoModal() {
  document.getElementById("demo-modal").classList.remove("active");
  if (demoVideoInterval) clearInterval(demoVideoInterval);
}

function playMockVideo(mentorId) {
  const mentor = state.mentors.find(m => m.id === mentorId) || state.mentors[0];
  const container = document.getElementById("video-container");
  
  if (container.classList.contains("playing")) {
    container.classList.remove("playing");
    if (demoVideoInterval) clearInterval(demoVideoInterval);
    return;
  }
  
  container.classList.add("playing");
  
  const progressFill = document.getElementById("video-progress-fill");
  const codeLines = document.getElementById("video-code-lines");
  
  const codeString = mentor.demoCode;
  const lines = codeString.split("\n");
  let currentLine = 0;
  
  codeLines.innerHTML = "";
  
  demoVideoInterval = setInterval(() => {
    if (currentLine < lines.length) {
      const pre = document.createElement("pre");
      pre.innerText = lines[currentLine];
      codeLines.appendChild(pre);
      
      currentLine++;
      
      const percent = Math.round((currentLine / lines.length) * 100);
      progressFill.style.width = `${percent}%`;
    } else {
      clearInterval(demoVideoInterval);
      showToast("Demo video finished playing!", "info");
      container.classList.remove("playing");
    }
  }, 1200);
}

// Onboarding Multi-Step Controller
let onboardingStep = 1;

function nextOnboardingStep() {
  if (onboardingStep === 1) {
    const careerSelect = document.querySelector(".select-card.selected");
    if (!careerSelect) {
      showToast("Please choose a career path first", "warning");
      return;
    }
    
    // Render dynamic checklist based on choice
    const career = careerSelect.dataset.career;
    const checklistContainer = document.getElementById("onboarding-checklist-container");
    checklistContainer.innerHTML = "";
    
    const skills = CAREER_SKILLS_MAP[career] || [];
    skills.forEach(skill => {
      const label = document.createElement("label");
      label.className = "checkbox-tag";
      label.innerHTML = `
        <input type="checkbox" name="completed-skill" value="${skill.title}">
        <span class="tag-label">${skill.title}</span>
      `;
      checklistContainer.appendChild(label);
    });
  }
  
  if (onboardingStep < 3) {
    document.getElementById(`step-${onboardingStep}`).classList.remove("active");
    document.getElementById(`dot-${onboardingStep}`).classList.remove("active");
    
    onboardingStep++;
    
    document.getElementById(`step-${onboardingStep}`).classList.add("active");
    document.getElementById(`dot-${onboardingStep}`).classList.add("active");
  } else {
    // Complete Onboarding
    const career = document.querySelector(".select-card.selected").dataset.career;
    const selectedCheckboxes = document.querySelectorAll("input[name='completed-skill']:checked");
    const completedList = Array.from(selectedCheckboxes).map(cb => cb.value);
    
    initRoadmap(career, completedList);
    navigateTo("learner-dashboard");
    selectTab("roadmap");
    showToast("Roadmap successfully created by StudyBuddy AI!", "success");
  }
}

function prevOnboardingStep() {
  if (onboardingStep > 1) {
    document.getElementById(`step-${onboardingStep}`).classList.remove("active");
    document.getElementById(`dot-${onboardingStep}`).classList.remove("active");
    
    onboardingStep--;
    
    document.getElementById(`step-${onboardingStep}`).classList.add("active");
    document.getElementById(`dot-${onboardingStep}`).classList.add("active");
  }
}

function selectCareerOption(element) {
  document.querySelectorAll(".select-card").forEach(el => el.classList.remove("selected"));
  element.classList.add("selected");
}

// Global App Initialization
document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  
  // Attach role switcher events
  document.getElementById("btn-role-learner").addEventListener("click", () => switchRole("learner"));
  document.getElementById("btn-role-mentor").addEventListener("click", () => switchRole("mentor"));
  
  // Pre-load default state views
  if (state.currentRole === "learner" && state.currentView === "landing") {
    navigateTo("landing");
  } else {
    navigateTo(state.currentView);
    selectTab(state.currentTab);
  }
  
  // Handle logo click to return to landing
  document.getElementById("navbar-logo").addEventListener("click", () => {
    navigateTo("landing");
  });
});
