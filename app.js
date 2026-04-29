// ---------- 1. Task data ----------

let gateTasks = [];
let sdeTasks = [];
let commTasks = [];

let hasCelebrated = false;

// ---------- 2. Get DOM elements ----------

const gateList  = document.getElementById("gate-list");
const sdeList   = document.getElementById("sde-list");
const commList  = document.getElementById("comm-list");

const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");

const gateInput = document.getElementById("gate-input");
const gateAddBtn = document.getElementById("gate-add-btn");

const sdeInput  = document.getElementById("sde-input");
const sdeAddBtn = document.getElementById("sde-add-btn");

const commInput  = document.getElementById("comm-input");
const commAddBtn = document.getElementById("comm-add-btn");

// category progress elements
const gateBar = document.getElementById("gate-progress");
const sdeBar  = document.getElementById("sde-progress");
const commBar = document.getElementById("comm-progress");

const gatePercentText = document.getElementById("gate-percent-text");
const sdePercentText  = document.getElementById("sde-percent-text");
const commPercentText = document.getElementById("comm-percent-text");

// streak + quote + theme
const quoteText  = document.getElementById("quote-text");
const streakText = document.getElementById("streak-text");
const themeToggle = document.getElementById("theme-toggle");

// ---------- 3. Theme toggle ----------

document.body.classList.add("light");

themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
});

// ---------- 4. Render functions ----------

function renderTasks(taskArray, listElement) {
  listElement.innerHTML = ""; // clear old items

  taskArray.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const spanText = document.createElement("span");
    spanText.textContent = task.text;
    spanText.classList.add("task-label");

    li.appendChild(spanText);

    if (task.completed) {
      const badge = document.createElement("span");
      badge.textContent = "Completed";
      badge.classList.add("completed-badge");
      li.appendChild(badge);
    }

    // when you click, toggle completed
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      renderAll(); // re-render everything
    });

    listElement.appendChild(li);
  });
}

function calculateProgress() {
  const allTasks = [...gateTasks, ...sdeTasks, ...commTasks];
  const total = allTasks.length;
  const done = allTasks.filter(task => task.completed).length;

  if (total === 0) return 0;

  return Math.round((done / total) * 100);
}

function updateProgressBar() {
  const percent = calculateProgress();
  progressFill.style.width = percent + "%";
  progressText.textContent = percent + "% completed";

  if (percent === 100 && !hasCelebrated) {
    hasCelebrated = true;
    alert("🎉 Great job, Navya! You completed all tasks for today!");
  }
  if (percent < 100) {
    hasCelebrated = false;
  }
}

// ---- category bars ----

function calculateCategoryPercent(tasks) {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

function updateCategoryBars() {
  const gatePercent = calculateCategoryPercent(gateTasks);
  const sdePercent  = calculateCategoryPercent(sdeTasks);
  const commPercent = calculateCategoryPercent(commTasks);

  gateBar.style.width = gatePercent + "%";
  sdeBar.style.width  = sdePercent + "%";
  commBar.style.width = commPercent + "%";

  gatePercentText.textContent = gatePercent + "%";
  sdePercentText.textContent  = sdePercent + "%";
  commPercentText.textContent = commPercent + "%";
}

// ----- Daily quote ----- //

const quotes = [
  "Small steps every day lead to big results.",
  "Trust the process, not the speed.",
  "Code, revise, repeat. You’re improving.",
  "GATE + SDE: You’re building a strong future.",
  "Focus 1 hour deeply. That’s enough to win today."
];

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

quoteText.textContent = getRandomQuote();

// ----- Streak logic ----- //

function updateStreak() {
  const today = new Date().toDateString(); // e.g., "Wed Apr 29 2026"
  const allTasks = [...gateTasks, ...sdeTasks, ...commTasks];
  const done = allTasks.filter(task => task.completed).length;

  const lastDate = localStorage.getItem("lastCompletedDate");
  let streak = Number(localStorage.getItem("streak") || "0");

  if (done > 0) {
    if (lastDate !== today) {
      // new day with completed tasks
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate === yesterday.toDateString()) {
        streak += 1; // continue streak
      } else {
        streak = 1; // restart streak
      }

      localStorage.setItem("lastCompletedDate", today);
      localStorage.setItem("streak", String(streak));
    }
  }

  return streak;
}

// ---------- 5. Master render ----------

function renderAll() {
  renderTasks(gateTasks, gateList);
  renderTasks(sdeTasks, sdeList);
  renderTasks(commTasks, commList);
  updateProgressBar();
  updateCategoryBars();

  const streak = updateStreak();
  streakText.textContent = "Streak: " + streak + " day" + (streak === 1 ? "" : "s");
}

// ---------- 6. Initial render ----------

renderAll();

// ---------- 7. Add new tasks ----------

gateAddBtn.addEventListener("click", () => {
  const text = gateInput.value.trim();
  if (text === "") return;

  gateTasks.push({ text, completed: false });
  gateInput.value = "";
  renderAll();
});

sdeAddBtn.addEventListener("click", () => {
  const text = sdeInput.value.trim();
  if (text === "") return;

  sdeTasks.push({ text, completed: false });
  sdeInput.value = "";
  renderAll();
});

commAddBtn.addEventListener("click", () => {
  const text = commInput.value.trim();
  if (text === "") return;

  commTasks.push({ text, completed: false });
  commInput.value = "";
  renderAll();
});





