# SkillCraft Technology - Task 2: Stopwatch Web Application

## ⏱️ Precision Stopwatch with Lap Tracking

This is my submission for **Task 2** of the SkillCraft Technology Web Development Internship. The task required building an interactive and user-friendly stopwatch web application with start, pause, reset functionality, and lap time tracking.

### 🚀 Live Demo
**[View Live Stopwatch](https://tethi04.github.io/SCT_WD_2/)**

### 📌 Task Requirements
- ✅ Create an interactive stopwatch web application
- ✅ Implement start, pause, and reset functions
- ✅ Track and display lap times
- ✅ User-friendly interface with clear visual feedback
- ✅ Responsive design for all devices

### 🛠️ Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Flexbox, Grid, animations, transitions
- **JavaScript (ES6)** - Object-oriented programming
- **Font Awesome** - Icons
- **Local Storage** - Theme persistence

### ✨ Features

#### 🎯 Core Functionality
1. **Precise Time Tracking**
   - Hours, minutes, seconds, and milliseconds
   - Accurate to 1/100th of a second
   - Smooth animation while running

2. **Lap Management**
   - Record unlimited lap times
   - Display fastest, slowest, and average laps
   - Color-coded lap highlighting
   - Clear all laps functionality

3. **Intuitive Controls**
   - Start/Pause/Reset buttons
   - Lap recording button
   - Visual state feedback
   - Keyboard shortcuts support

#### 🎨 User Experience
1. **Multiple Themes**
   - Dark (default)
   - Light
   - Blue
   - Green
   - Theme persistence using Local Storage

2. **Sound Feedback**
   - Toggleable sound effects
   - Different tones for different actions

3. **Responsive Design**
   - Mobile-first approach
   - Optimized for tablets and desktops
   - Touch-friendly buttons

4. **Visual Feedback**
   - Button hover and active states
   - Running animation on time display
   - Smooth transitions
   - Clear visual hierarchy

### ⌨️ Keyboard Shortcuts
- **Spacebar**: Start/Pause stopwatch
- **L**: Record lap time
- **Ctrl + R**: Reset stopwatch
- **Ctrl + C**: Clear all laps

### 📁 Project Structure
    SCT_WD_2/
    │
    ├── index.html # Main HTML structure
    ├── style.css # All styling and animations
    ├── script.js # Stopwatch logic and interactivity
    ├── README.md # Project documentation
    └── assets/ # Optional assets folder

### 🏗️ Technical Implementation

#### Stopwatch Class (Object-Oriented)
The application uses an ES6 class to encapsulate all stopwatch functionality:
- **State Management**: Tracks running state, elapsed time, lap times
- **Animation Loop**: Uses `requestAnimationFrame` for smooth updates
- **Lap Calculations**: Efficient algorithms for lap statistics
- **Event Handling**: Comprehensive user interaction management

#### CSS Features
- **CSS Variables**: For theming and consistent styling
- **Flexbox & Grid**: Modern layout techniques
- **Animations**: Keyframe animations and transitions
- **Responsive Breakpoints**: Mobile (480px), Tablet (768px), Desktop (1024px)

#### JavaScript Features
- **Modular Code**: Organized into logical methods
- **Error Handling**: Graceful degradation
- **Local Storage**: Saves user preferences
- **Audio API**: Web Audio API for sound effects

### 🖥️ How to Use
1. **Starting the Stopwatch**: Click "Start" or press Spacebar
2. **Recording Laps**: Click "Lap" or press 'L' key while running
3. **Pausing**: Click "Pause" or press Spacebar while running
4. **Resetting**: Click "Reset" or press Ctrl+R
5. **Changing Theme**: Use the dropdown menu in features section
6. **Toggling Sound**: Use the toggle switch in features section

### 📱 Browser Compatibility
- Chrome 60+ ✅
- Firefox 55+ ✅
- Safari 12+ ✅
- Edge 79+ ✅
- Mobile browsers ✅

### 🚀 Deployment Instructions
1. Fork or clone this repository
2. Enable GitHub Pages in repository settings
3. Set source to "main" branch
4. Your stopwatch will be live at `https://[username].github.io/SCT_WD_2/`

### 🧪 Testing
- Manual testing on multiple devices
- Cross-browser compatibility checks
- Keyboard shortcut validation
- Theme persistence verification
- Responsive design testing

### 📊 Performance Metrics
- **Load Time**: < 2 seconds
- **Animation**: 60 FPS smooth updates
- **Memory Usage**: Efficient lap management
- **Accessibility**: Keyboard navigable, proper contrast ratios

### 👩‍💻 Author
**Tethi Biswas**  
Web Development Intern, SkillCraft Technology  
- **GitHub**: [@tethi04](https://github.com/tethi04)
- **Repository**: [SCT_WD_2](https://github.com/tethi04/SCT_WD_2)
- **Live Demo**: [Stopwatch Application](https://tethi04.github.io/SCT_WD_2/)

### 📄 License
This project is created as part of the SkillCraft Technology Internship Program. All rights reserved.

---

**Task Details**  
- **Task**: #02 - Stopwatch Web Application  
- **Track**: Web Development (WD)  
- **Offer ID**: SCT/DEC25/0751  
- **Submission Date**: December 2025  

---

⭐ *If you find this project useful, please give it a star on GitHub!*
