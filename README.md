
# Navya's Progress Tracker

A simple, interactive web app to track my daily **GATE**, **SDE**, and **Communication** tasks, see completion progress, and build consistent study habits.

Live demo: https://navyanuthalapati.github.io/navya-progress-tracker/

---

## Features

- Add tasks separately for:
  - GATE
  - SDE
  - Communication
- Mark tasks as **completed** with a click (visual badge + animation).
- Overall **progress bar** that shows total completion percentage.
- **Category progress bars** for GATE, SDE, and Communication.
- **Daily motivational quote** (random on each reload).
- **Streak counter**:
  - Tracks how many days in a row I completed at least one task (stored in `localStorage`).
- **Light / Dark mode** toggle with an icon button (🌙 / ☀).
- Smooth animations for cards, tasks, and progress bars.

---

## Tech Stack

- **HTML5** – structure
- **CSS3** – layout, themes, animations
- **JavaScript (vanilla)** – task logic, progress calculation, streaks, theme toggle

No frameworks or build tools; this is a static front‑end project.

---

## File Structure

```text
navya-progress-tracker/
├── index.html    # Main HTML page (root of the app and GitHub Pages entry point)
├── style.css     # All styling: layout, light/dark theme, animations, progress bars
└── app.js        # App logic: tasks, progress, streaks, quotes, theme toggle
```

### index.html

- Defines the main layout:
  - Header with title, subtitle, quote, and theme toggle button.
  - Overall Progress section with a progress bar and percentage text.
  - Three task sections:
    - GATE
    - SDE
    - Communication
    - Each section has:
      - An input field and **Add** button.
      - A task list (`<ul>`) rendered by JavaScript.
  - Category Progress section:
    - Shows individual bars for GATE, SDE, and Communication.
  - Footer:
    - Credits text.
    - Streak display (`Streak: X days`).

### style.css

- Global styles (fonts, background gradients).
- **Light / Dark themes** using `body.light` and `body.dark`.
- Header styling and theme toggle button (round icon button).
- Card (`section`) styling with soft shadows and fade‑in animations.
- Task list styling:
  - Hover effects.
  - Completed state (badge, check icon, color changes, animation).
- Overall and category progress bars:
  - Different gradient colors for each category.
  - Smooth transitions when progress changes.
- Footer and streak text styling.

### app.js

1. **Task data**
   - `gateTasks`, `sdeTasks`, `commTasks` start as empty arrays.
   - Tasks are added dynamically via input + Add button.

2. **DOM selection**
   - Grabs all necessary elements:
     - Task lists (`gate-list`, `sde-list`, `comm-list`).
     - Progress bar elements.
     - Input fields and buttons.
     - Category bar elements.
     - Quote text, streak text, theme toggle button.

3. **Theme toggle**
   - Adds `light` class to `body` by default.
   - Toggles between `light` and `dark` on button click.

4. **Rendering and logic**
   - `renderTasks(...)`:
     - Clears list.
     - Creates `<li>` for each task with label and optional "Completed" badge.
     - Adds click handler to toggle `completed` and re‑render.
   - `calculateProgress()` / `updateProgressBar()`:
     - Compute overall completion percentage across all tasks.
     - Update main progress bar and text.
     - Show an alert when 100% is reached (celebration).
   - `calculateCategoryPercent(...)` / `updateCategoryBars()`:
     - Compute and update individual category bars and percentage texts.

5. **Daily quote**
   - `quotes` array with motivational lines.
   - `getRandomQuote()` picks one and displays it in the header on each load.

6. **Streak logic**
   - `updateStreak()`:
     - Uses `localStorage` to remember `lastCompletedDate` and `streak`.
     - If at least one task is completed today and the date has changed:
       - Continues the streak if yesterday was also a completion day.
       - Otherwise resets to 1.
     - Updates the streak text in the footer.

7. **Master render**
   - `renderAll()`:
     - Renders task lists, updates main and category progress bars.
     - Updates streak display.

8. **Event listeners**
   - `gateAddBtn`, `sdeAddBtn`, `commAddBtn`:
     - Read trimmed input.
     - Ignore empty strings.
     - Push a new task object `{ text, completed: false }` into the corresponding array.
     - Clear input and call `renderAll()`.

---

## How to Run Locally

1. Clone or download the repo:
   ```bash
   git clone https://github.com/NavyaNuthalapati/navya-progress-tracker.git
   ```
2. Open `index.html` in your browser (double‑click or use “Open with browser”).

No build step or server required.

---

## Live Deployment

This project is deployed using **GitHub Pages**:

- Branch: `main`
- Folder: root (`/`)

Live link:  
https://navyanuthalapati.github.io/navya-progress-tracker/

---

## Future Improvements

- Persist tasks in `localStorage` so they remain after refresh.
- Add “Edit” and “Delete” options for tasks.
- Add filters: show All / Completed / Pending tasks.
- Add a “Day Timeline” view to track time blocks (4:00–22:00) visually.
