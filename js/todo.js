angular.module('todoApp', [])
	.controller('TodoListController', function() {
	var todoList = this;

	todoList.todos = [
		{text: 'Learn Angular JS', done: false},
		{text: 'Build an app', done: false}
	];

	todoList.remaining = function() {
		var count = 0;
		angular.forEach(todoList.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};

	todoList.addTodo = function() {
		todoList.todos.push({text:todoList.todoText, done:false});
		todoList.todoText = '';
	}

	todoList.archive = function() {
		var oldTodos = todoList.todos;
		todoList.todos = [];
		angular.forEach(oldTodos, function(todo) {
			if (!todo.done) todoList.todos.push(todo);
		});
	};
});