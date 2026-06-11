/**
 * Digital Clock - Multiple Time Zones
 * Real-time clock display across different time zones
 * 
 * Features:
 * - Multiple time zones
 * - 12/24 hour format
 * - Date display
 * - Local storage persistence
 * - Preset configurations
 */

class DigitalClock {
    constructor() {
        this.clocks = [];
        this.selectedTimezones = [];
        this.use24Hour = true;
        this.showSeconds = true;
        this.showDate = true;
        this.storageKey = 'digital_clocks_data';
        this.updateInterval = null;

        // All available timezones
        this.allTimezones = this.getTimezoneList();

        this.initializeElements();
        this.loadSettings();
        this.populateTimezoneSelect();
        this.attachEventListeners();
        this.loadClocks();
        this.startClock();
    }

    /**
     * Get comprehensive list of timezones with flags and major cities
     */
    getTimezoneList() {
        return [
            { tz: 'America/New_York', city: 'New York', flag: '🇺��', offset: 'UTC-5' },
            { tz: 'America/Chicago', city: 'Chicago', flag: '🇺🇸', offset: 'UTC-6' },
            { tz: 'America/Denver', city: 'Denver', flag: '🇺🇸', offset: 'UTC-7' },
            { tz: 'America/Los_Angeles', city: 'Los Angeles', flag: '🇺🇸', offset: 'UTC-8' },
            { tz: 'America/Anchorage', city: 'Anchorage', flag: '🇺🇸', offset: 'UTC-9' },
            { tz: 'Pacific/Honolulu', city: 'Honolulu', flag: '🇺🇸', offset: 'UTC-10' },
            { tz: 'Europe/London', city: 'London', flag: '🇬🇧', offset: 'UTC+0' },
            { tz: 'Europe/Paris', city: 'Paris', flag: '🇫🇷', offset: 'UTC+1' },
            { tz: 'Europe/Berlin', city: 'Berlin', flag: '🇩🇪', offset: 'UTC+1' },
            { tz: 'Europe/Moscow', city: 'Moscow', flag: '🇷🇺', offset: 'UTC+3' },
            { tz: 'Asia/Dubai', city: 'Dubai', flag: '🇦🇪', offset: 'UTC+4' },
            { tz: 'Asia/Kolkata', city: 'Mumbai', flag: '🇮🇳', offset: 'UTC+5:30' },
            { tz: 'Asia/Bangkok', city: 'Bangkok', flag: '🇹🇭', offset: 'UTC+7' },
            { tz: 'Asia/Shanghai', city: 'Shanghai', flag: '🇨🇳', offset: 'UTC+8' },
            { tz: 'Asia/Hong_Kong', city: 'Hong Kong', flag: '🇭🇰', offset: 'UTC+8' },
            { tz: 'Asia/Singapore', city: 'Singapore', flag: '🇸🇬', offset: 'UTC+8' },
            { tz: 'Asia/Tokyo', city: 'Tokyo', flag: '🇯🇵', offset: 'UTC+9' },
            { tz: 'Asia/Seoul', city: 'Seoul', flag: '🇰🇷', offset: 'UTC+9' },
            { tz: 'Australia/Sydney', city: 'Sydney', flag: '🇦🇺', offset: 'UTC+10' },
            { tz: 'Australia/Melbourne', city: 'Melbourne', flag: '🇦🇺', offset: 'UTC+10' },
            { tz: 'Pacific/Auckland', city: 'Auckland', flag: '🇳🇿', offset: 'UTC+12' },
            { tz: 'UTC', city: 'UTC (Coordinated)', flag: '⏰', offset: 'UTC' },
            { tz: 'America/Toronto', city: 'Toronto', flag: '🇨🇦', offset: 'UTC-5' },
            { tz: 'America/Vancouver', city: 'Vancouver', flag: '🇨🇦', offset: 'UTC-8' },
            { tz: 'America/Mexico_City', city: 'Mexico City', flag: '🇲🇽', offset: 'UTC-6' },
            { tz: 'America/Sao_Paulo', city: 'São Paulo', flag: '🇧🇷', offset: 'UTC-3' },
            { tz: 'America/Buenos_Aires', city: 'Buenos Aires', flag: '🇦🇷', offset: 'UTC-3' },
            { tz: 'Europe/Istanbul', city: 'Istanbul', flag: '🇹🇷', offset: 'UTC+3' },
            { tz: 'Africa/Cairo', city: 'Cairo', flag: '🇪🇬', offset: 'UTC+2' },
            { tz: 'Africa/Johannesburg', city: 'Johannesburg', flag: '🇿🇦', offset: 'UTC+2' },
            { tz: 'Asia/Manila', city: 'Manila', flag: '🇵🇭', offset: 'UTC+8' },
            { tz: 'Asia/Jakarta', city: 'Jakarta', flag: '🇮🇩', offset: 'UTC+7' },
        ];
    }

    /**
     * Initialize DOM elements
     */
    initializeElements() {
        this.clocksContainer = document.getElementById('clocksContainer');
        this.emptyState = document.getElementById('emptyState');
        this.timezoneSelect = document.getElementById('timezoneSelect');
        this.addBtn = document.getElementById('addBtn');
        this.formatSelect = document.getElementById('formatSelect');
        this.use24HourCheckbox = document.getElementById('use24Hour');
        this.showSecondsCheckbox = document.getElementById('showSeconds');
        this.showDateCheckbox = document.getElementById('showDate');
        this.presetBtns = document.querySelectorAll('.preset-btn');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTimezone());
        this.timezoneSelect.addEventListener('change', (e) => {
            if (e.target.value) this.addTimezone();
        });
        this.use24HourCheckbox.addEventListener('change', (e) => {
            this.use24Hour = e.target.checked;
            this.saveSettings();
            this.render();
        });
        this.showSecondsCheckbox.addEventListener('change', (e) => {
            this.showSeconds = e.target.checked;
            this.saveSettings();
            this.render();
        });
        this.showDateCheckbox.addEventListener('change', (e) => {
            this.showDate = e.target.checked;
            this.saveSettings();
            this.render();
        });

        this.presetBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handlePreset(btn.dataset.preset));
        });
    }

    /**
     * Populate timezone select dropdown
     */
    populateTimezoneSelect() {
        this.allTimezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.tz;
            option.textContent = `${tz.flag} ${tz.city} (${tz.offset})`;
            this.timezoneSelect.appendChild(option);
        });
    }

    /**
     * Add a timezone to the active list
     */
    addTimezone() {
        const tz = this.timezoneSelect.value;
        
        if (!tz) {
            alert('Please select a timezone');
            return;
        }

        if (this.selectedTimezones.includes(tz)) {
            alert('This timezone is already added');
            return;
        }

        this.selectedTimezones.push(tz);
        this.timezoneSelect.value = '';
        this.saveClocks();
        this.render();
    }

    /**
     * Remove a timezone from active list
     */
    removeTimezone(tz) {
        this.selectedTimezones = this.selectedTimezones.filter(t => t !== tz);
        this.saveClocks();
        this.render();
    }

    /**
     * Handle preset buttons
     */
    handlePreset(preset) {
        switch (preset) {
            case 'major-cities':
                this.selectedTimezones = [
                    'America/New_York',
                    'Europe/London',
                    'Asia/Tokyo',
                    'Australia/Sydney'
                ];
                break;
            case 'business-hubs':
                this.selectedTimezones = [
                    'America/New_York',
                    'Europe/London',
                    'Asia/Hong_Kong',
                    'Asia/Singapore'
                ];
                break;
            case 'clear':
                this.selectedTimezones = [];
                break;
        }
        this.saveClocks();
        this.render();
    }

    /**
     * Get timezone info object
     */
    getTimezoneInfo(tz) {
        return this.allTimezones.find(t => t.tz === tz) || { 
            tz, 
            city: tz, 
            flag: '🌍', 
            offset: 'UTC' 
        };
    }

    /**
     * Format time based on settings
     */
    formatTime(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        let timeStr = '';

        if (this.use24Hour) {
            timeStr = `${hours}:${minutes}`;
            if (this.showSeconds) timeStr += `:${seconds}`;
        } else {
            let hour12 = date.getHours() % 12 || 12;
            const period = date.getHours() >= 12 ? 'PM' : 'AM';
            timeStr = `${String(hour12).padStart(2, '0')}:${minutes}`;
            if (this.showSeconds) timeStr += `:${seconds}`;
        }

        return timeStr;
    }

    /**
     * Get period (AM/PM) for 12-hour format
     */
    getPeriod(date) {
        return date.getHours() >= 12 ? 'PM' : 'AM';
    }

    /**
     * Format date
     */
    formatDate(date) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    /**
     * Render all clocks
     */
    render() {
        this.clocksContainer.innerHTML = '';

        if (this.selectedTimezones.length === 0) {
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');

        this.selectedTimezones.forEach(tz => {
            const date = new Date().toLocaleString('en-US', { timeZone: tz });
            const localDate = new Date(date);
            const tzInfo = this.getTimezoneInfo(tz);
            const isLocal = tz === Intl.DateTimeFormat().resolvedOptions().timeZone;

            const card = document.createElement('div');
            card.className = `clock-card ${isLocal ? 'current' : ''}`;

            const timeStr = this.formatTime(localDate);
            const periodStr = this.use24Hour ? '' : this.getPeriod(localDate);
            const dateStr = this.showDate ? this.formatDate(localDate) : '';

            card.innerHTML = `
                <div class="clock-timezone">
                    <div>
                        <span class="clock-flag">${tzInfo.flag}</span>
                        ${tzInfo.city}
                    </div>
                    <button class="btn btn-remove" aria-label="Remove timezone">×</button>
                </div>
                <div class="clock-time">${timeStr}</div>
                ${!this.use24Hour ? `<div class="clock-period">${periodStr}</div>` : ''}
                ${this.showDate ? `<div class="clock-date">${dateStr}</div>` : ''}
                <div class="clock-offset">${tzInfo.offset}</div>
            `;

            const removeBtn = card.querySelector('.btn-remove');
            removeBtn.addEventListener('click', () => this.removeTimezone(tz));

            this.clocksContainer.appendChild(card);
        });
    }

    /**
     * Start the clock update interval
     */
    startClock() {
        this.render();
        this.updateInterval = setInterval(() => this.render(), 1000);
    }

    /**
     * Stop the clock update interval
     */
    stopClock() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    /**
     * Save clocks to localStorage
     */
    saveClocks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.selectedTimezones));
        } catch (error) {
            console.error('Failed to save clocks:', error);
        }
    }

    /**
     * Load clocks from localStorage
     */
    loadClocks() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.selectedTimezones = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Failed to load clocks:', error);
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            const settings = {
                use24Hour: this.use24Hour,
                showSeconds: this.showSeconds,
                showDate: this.showDate
            };
            localStorage.setItem('digital_clock_settings', JSON.stringify(settings));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const stored = localStorage.getItem('digital_clock_settings');
            if (stored) {
                const settings = JSON.parse(stored);
                this.use24Hour = settings.use24Hour !== false;
                this.showSeconds = settings.showSeconds !== false;
                this.showDate = settings.showDate !== false;

                // Update checkboxes
                this.use24HourCheckbox.checked = this.use24Hour;
                this.showSecondsCheckbox.checked = this.showSeconds;
                this.showDateCheckbox.checked = this.showDate;
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    }

    /**
     * Destroy the clock (cleanup)
     */
    destroy() {
        this.stopClock();
    }
}

/**
 * Initialize the app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    window.digitalClock = new DigitalClock();
});

/**
 * Cleanup on page unload
 */
window.addEventListener('unload', () => {
    if (window.digitalClock) {
        window.digitalClock.destroy();
    }
});
