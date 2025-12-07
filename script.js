// ===== STOPWATCH CLASS =====
class Stopwatch {
    constructor() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.lapTimes = [];
        this.currentLapStart = 0;
        this.animationId = null;
        this.soundEnabled = true;
        
        // DOM Elements
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.millisecondsElement = document.getElementById('milliseconds');
        this.displayElement = document.getElementById('display');
        
        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.clearLapsBtn = document.getElementById('clearLapsBtn');
        
        // Lap display
        this.lapTimesElement = document.getElementById('lapTimes');
        this.fastestLapElement = document.getElementById('fastestLap');
        this.slowestLapElement = document.getElementById('slowestLap');
        this.averageLapElement = document.getElementById('averageLap');
        
        // Features
        this.themeSelect = document.getElementById('themeSelect');
        this.soundToggle = document.getElementById('soundToggle');
        
        this.init();
    }
    
    init() {
        // Set initial time display
        this.updateDisplay();
        
        // Event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());
        this.clearLapsBtn.addEventListener('click', () => this.clearLaps());
        
        // Feature controls
        this.themeSelect.addEventListener('change', (e) => this.changeTheme(e.target.value));
        this.soundToggle.addEventListener('change', (e) => {
            this.soundEnabled = e.target.checked;
            this.playSound('click');
        });
        
        // Initialize current date/time
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
        
        // Load saved theme if exists
        const savedTheme = localStorage.getItem('stopwatchTheme') || 'dark';
        this.themeSelect.value = savedTheme;
        this.changeTheme(savedTheme);
        
        console.log('Stopwatch initialized successfully!');
    }
    
    // ===== CORE FUNCTIONS =====
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.currentLapStart = Date.now() - (this.lapTimes.reduce((sum, lap) => sum + lap.lapTime, 0));
            
            this.animate();
            this.updateButtonStates();
            this.playSound('start');
            
            // Add running animation to display
            this.displayElement.classList.add('running');
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            cancelAnimationFrame(this.animationId);
            this.updateButtonStates();
            this.playSound('pause');
            
            // Remove running animation
            this.displayElement.classList.remove('running');
        }
    }
    
    reset() {
        this.isRunning = false;
        this.elapsedTime = 0;
        this.lapTimes = [];
        this.currentLapStart = 0;
        
        cancelAnimationFrame(this.animationId);
        this.updateDisplay();
        this.updateButtonStates();
        this.updateLapDisplay();
        this.updateLapStats();
        this.playSound('reset');
        
        // Remove running animation
        this.displayElement.classList.remove('running');
    }
    
    recordLap() {
        if (this.isRunning || this.elapsedTime > 0) {
            const now = Date.now();
            const totalTime = this.elapsedTime;
            const lapTime = now - this.currentLapStart;
            this.currentLapStart = now;
            
            this.lapTimes.push({
                lapNumber: this.lapTimes.length + 1,
                lapTime: lapTime,
                totalTime: totalTime
            });
            
            this.updateLapDisplay();
            this.updateLapStats();
            this.playSound('lap');
        }
    }
    
    clearLaps() {
        if (this.lapTimes.length > 0) {
            this.lapTimes = [];
            this.currentLapStart = this.isRunning ? Date.now() : 0;
            this.updateLapDisplay();
            this.updateLapStats();
            this.playSound('click');
        }
    }
    
    // ===== DISPLAY FUNCTIONS =====
    animate() {
        if (this.isRunning) {
            this.elapsedTime = Date.now() - this.startTime;
            this.updateDisplay();
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
    
    updateDisplay() {
        const totalSeconds = this.elapsedTime / 1000;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const milliseconds = Math.floor((this.elapsedTime % 1000) / 10);
        
        this.hoursElement.textContent = hours.toString().padStart(2, '0');
        this.minutesElement.textContent = minutes.toString().padStart(2, '0');
        this.secondsElement.textContent = seconds.toString().padStart(2, '0');
        this.millisecondsElement.textContent = milliseconds.toString().padStart(2, '0');
    }
    
    updateButtonStates() {
        this.startBtn.disabled = this.isRunning;
        this.pauseBtn.disabled = !this.isRunning;
        this.lapBtn.disabled = !this.isRunning && this.elapsedTime === 0;
        
        // Update button text/icons based on state
        if (this.isRunning) {
            this.startBtn.innerHTML = '<i class="fas fa-play"></i> Running';
        } else {
            this.startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        }
    }
    
    // ===== LAP MANAGEMENT =====
    updateLapDisplay() {
        this.lapTimesElement.innerHTML = '';
        
        if (this.lapTimes.length === 0) {
            this.lapTimesElement.innerHTML = '<div class="empty-laps">No lap times recorded yet</div>';
            return;
        }
        
        // Add current lap if stopwatch is running
        if (this.isRunning) {
            const currentLapTime = Date.now() - this.currentLapStart;
            const currentLapItem = this.createLapItem(
                this.lapTimes.length + 1,
                currentLapTime,
                this.elapsedTime,
                true
            );
            this.lapTimesElement.appendChild(currentLapItem);
        }
        
        // Add recorded laps in reverse order (newest first)
        [...this.lapTimes].reverse().forEach(lap => {
            const lapItem = this.createLapItem(
                lap.lapNumber,
                lap.lapTime,
                lap.totalTime,
                false
            );
            this.lapTimesElement.appendChild(lapItem);
        });
    }
    
    createLapItem(lapNumber, lapTime, totalTime, isCurrent) {
        const lapItem = document.createElement('div');
        lapItem.className = `lap-item ${isCurrent ? 'current-lap' : ''}`;
        
        const lapTimeFormatted = this.formatTime(lapTime);
        const totalTimeFormatted = this.formatTime(totalTime);
        
        lapItem.innerHTML = `
            <span class="lap-number">${lapNumber}</span>
            <span class="lap-time">${lapTimeFormatted}</span>
            <span class="total-time">${totalTimeFormatted}</span>
        `;
        
        // Highlight fastest and slowest laps
        if (!isCurrent) {
            const fastest = this.getFastestLap();
            const slowest = this.getSlowestLap();
            
            if (fastest && lapTime === fastest.lapTime) {
                lapItem.style.borderLeftColor = '#4ade80';
                lapItem.querySelector('.lap-time').style.color = '#4ade80';
            } else if (slowest && lapTime === slowest.lapTime) {
                lapItem.style.borderLeftColor = '#f72585';
                lapItem.querySelector('.lap-time').style.color = '#f72585';
            }
        }
        
        return lapItem;
    }
    
    updateLapStats() {
        if (this.lapTimes.length === 0) {
            this.fastestLapElement.textContent = '--:--:--.--';
            this.slowestLapElement.textContent = '--:--:--.--';
            this.averageLapElement.textContent = '--:--:--.--';
            return;
        }
        
        const fastest = this.getFastestLap();
        const slowest = this.getSlowestLap();
        const average = this.getAverageLap();
        
        this.fastestLapElement.textContent = fastest ? this.formatTime(fastest.lapTime) : '--:--:--.--';
        this.slowestLapElement.textContent = slowest ? this.formatTime(slowest.lapTime) : '--:--:--.--';
        this.averageLapElement.textContent = average ? this.formatTime(average) : '--:--:--.--';
    }
    
    getFastestLap() {
        if (this.lapTimes.length === 0) return null;
        return this.lapTimes.reduce((fastest, lap) => 
            lap.lapTime < fastest.lapTime ? lap : fastest
        );
    }
    
    getSlowestLap() {
        if (this.lapTimes.length === 0) return null;
        return this.lapTimes.reduce((slowest, lap) => 
            lap.lapTime > slowest.lapTime ? lap : slowest
        );
    }
    
    getAverageLap() {
        if (this.lapTimes.length === 0) return null;
        const total = this.lapTimes.reduce((sum, lap) => sum + lap.lapTime, 0);
        return total / this.lapTimes.length;
    }
    
    // ===== UTILITY FUNCTIONS =====
    formatTime(milliseconds) {
        const totalSeconds = milliseconds / 1000;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        }
    }
    
    changeTheme(theme) {
        document.body.className = `${theme}-theme`;
        localStorage.setItem('stopwatchTheme', theme);
        this.playSound('click');
    }
    
    playSound(type) {
        if (!this.soundEnabled) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different sounds for different actions
            switch(type) {
                case 'start':
                    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                    break;
                case 'pause':
                    oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4
                    break;
                case 'lap':
                    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
                    break;
                case 'reset':
                    oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime); // F4
                    break;
                default:
                    oscillator.frequency.setValueAtTime(440.00, audioContext.currentTime); // A4
            }
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.log('Audio not supported');
        }
    }
    
    updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }) + ' | ' + now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const dateTimeElement = document.getElementById('currentDateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = dateTimeString;
        }
    }
}

// ===== INITIALIZE STOPWATCH =====
document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if (stopwatch.isRunning) {
                    stopwatch.pause();
                } else {
                    stopwatch.start();
                }
                break;
            case 'KeyL':
                if (!e.ctrlKey) {
                    stopwatch.recordLap();
                }
                break;
            case 'KeyR':
                if (e.ctrlKey) {
                    stopwatch.reset();
                }
                break;
            case 'KeyC':
                if (e.ctrlKey) {
                    stopwatch.clearLaps();
                }
                break;
        }
    });
    
    // Display keyboard shortcuts
    console.log(`
    ===== KEYBOARD SHORTCUTS =====
    Spacebar: Start/Pause
    L: Record Lap
    Ctrl + R: Reset
    Ctrl + C: Clear All Laps
    ==============================
    `);
});
