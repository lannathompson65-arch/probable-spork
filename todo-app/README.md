# To-Do List Application

A modern, fully-featured to-do list application with local storage functionality.

## 📋 Features

### Core Functionality
- ✅ **Add Tasks** — Easily add new tasks to your list
- ✏️ **Mark Complete** — Check off tasks as you complete them
- 🗑️ **Delete Tasks** — Remove individual tasks or clear all
- 💾 **Local Storage** — All data persists automatically in your browser
- 🔄 **Export/Import** — Save and load your tasks as JSON files

### Filtering & Organization
- 🎯 **Smart Filters** — View All, Active, or Completed tasks
- 📊 **Real-time Statistics** — Track total, active, and completed counts
- 🔍 **Search-ready** — Easy to scan and organize your tasks

### User Experience
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- ⚡ **Smooth Animations** — Delightful interactions and transitions
- ♿ **Accessibility** — ARIA labels and keyboard support
- 🎨 **Modern UI** — Beautiful gradient design with intuitive controls

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or dependencies required!

### How to Use

1. **Open the application**
   ```bash
   # Simply open index.html in your browser
   open todo-app/index.html
   ```

2. **Add a Task**
   - Type your task in the input field
   - Press Enter or click "Add Task"
   - Your task appears in the list

3. **Manage Tasks**
   - ✓ Click the checkbox to mark as complete
   - 🗑️ Click the trash icon to delete
   - Filter by status using the filter buttons

4. **Clear Tasks**
   - "Clear Completed" — Remove all completed tasks
   - "Clear All" — Delete the entire list (with confirmation)

## 💾 Local Storage

Your tasks are automatically saved to your browser's local storage:

```javascript
// Data structure
{
  id: timestamp,
  text: "Task description",
  completed: false,
  createdAt: "ISO date string"
}
```

- ✅ Persists across browser sessions
- ✅ No server required
- ✅ Secure (data stays in your browser)
- ⚠️ Limited to ~5MB per domain
- ⚠️ Cleared if browser data is deleted

## 📁 File Structure

```
todo-app/
├── index.html       # HTML markup
├── styles.css       # Styling and animations
├── script.js        # Application logic
└── README.md        # This file
```

## 🎨 Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Modern styling with gradients and animations
- **Vanilla JavaScript** — No frameworks, pure JS
- **LocalStorage API** — Browser data persistence

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Add new task |
| Click checkbox | Toggle completion |
| Click trash | Delete task |

## 🔒 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Edge | ✅ Full support |
| IE 11 | ⚠️ Limited support |

## 💡 Pro Tips

1. **Export Your Data** — Use the export feature to backup tasks
2. **Clear Space** — Delete completed tasks to keep list manageable
3. **Filter Smartly** — Use filters to focus on what needs attention
4. **Keyboard Friendly** — Use Enter key for faster adding

## 🐛 Known Limitations

- Max ~5MB storage in browser (usually 500+ tasks)
- Data is device/browser specific (not synced)
- No automatic backup to cloud
- No task prioritization or categories (v1 feature)

## 🚀 Future Enhancements

- ☐ Task categories/projects
- ☐ Due dates and reminders
- ☐ Task priority levels
- ☐ Cloud sync
- ☐ Dark mode toggle
- ☐ Recurring tasks
- ☐ Task search
- ☐ Collaborative editing

## 📝 Code Examples

### Add a Task Programmatically
```javascript
const app = window.todoApp;
app.todos.push({
    id: Date.now(),
    text: "My new task",
    completed: false,
    createdAt: new Date().toISOString()
});
app.saveTodos();
app.render();
```

### Export Tasks
```javascript
window.todoApp.exportTodos();
// Downloads as todos-2024-01-15.json
```

### Get Statistics
```javascript
const app = window.todoApp;
console.log('Total:', app.todos.length);
console.log('Completed:', app.todos.filter(t => t.completed).length);
console.log('Active:', app.todos.filter(t => !t.completed).length);
```

## 📄 License

This project is part of `probable-spork` and is licensed under Apache 2.0.

## 🤝 Contributing

Found a bug or have an idea? Visit the [main repository](https://github.com/lannathompson65-arch/probable-spork) to contribute!

---

**Enjoy organizing your tasks!** ✨
