/**
 * To-Do List Application
 * Local Storage Enabled
 * 
 * Features:
 * - Add, complete, and delete tasks
 * - Filter tasks (All, Active, Completed)
 * - Local storage persistence
 * - Real-time statistics
 * - Responsive design
 */

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todos_data';
        
        this.initializeElements();
        this.loadTodos();
        this.attachEventListeners();
        this.render();
    }

    /**
     * Initialize DOM elements
     */
    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.clearAllBtn = document.getElementById('clearAll');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.totalCountEl = document.getElementById('totalCount');
        this.activeCountEl = document.getElementById('activeCount');
        this.completedCountEl = document.getElementById('completedCount');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
    }

    /**
     * Add a new todo
     */
    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (!text) {
            alert('Please enter a task');
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(newTodo);
        this.todoInput.value = '';
        this.todoInput.focus();
        this.saveTodos();
        this.render();
    }

    /**
     * Toggle todo completion status
     */
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    /**
     * Delete a todo
     */
    deleteTodo(id) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
            this.saveTodos();
            this.render();
        }
    }

    /**
     * Clear all completed todos
     */
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            alert('No completed tasks to clear');
            return;
        }

        if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    }

    /**
     * Clear all todos
     */
    clearAll() {
        if (this.todos.length === 0) {
            alert('No tasks to clear');
            return;
        }

        if (confirm(`Are you sure you want to delete all ${this.todos.length} task(s)?`)) {
            this.todos = [];
            this.saveTodos();
            this.render();
        }
    }

    /**
     * Get filtered todos based on current filter
     */
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    /**
     * Update statistics
     */
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;

        this.totalCountEl.textContent = total;
        this.activeCountEl.textContent = active;
        this.completedCountEl.textContent = completed;
    }

    /**
     * Render todos to the DOM
     */
    render() {
        this.updateStats();
        const filteredTodos = this.getFilteredTodos();
        
        this.todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    aria-label="Toggle task completion"
                >
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="delete-btn" aria-label="Delete task">
                    🗑️
                </button>
            `;

            const checkbox = li.querySelector('.checkbox');
            const deleteBtn = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            deleteBtn.addEventListener('click', () => {
                li.classList.add('removing');
                setTimeout(() => this.deleteTodo(todo.id), 300);
            });

            this.todoList.appendChild(li);
        });
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Save todos to local storage
     */
    saveTodos() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
        } catch (error) {
            console.error('Failed to save todos to local storage:', error);
        }
    }

    /**
     * Load todos from local storage
     */
    loadTodos() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.todos = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Failed to load todos from local storage:', error);
            this.todos = [];
        }
    }

    /**
     * Export todos as JSON
     */
    exportTodos() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Import todos from JSON file
     */
    importTodos(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            if (Array.isArray(imported)) {
                this.todos = imported;
                this.saveTodos();
                this.render();
                return true;
            }
        } catch (error) {
            console.error('Failed to import todos:', error);
            return false;
        }
    }
}

/**
 * Initialize the app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});
