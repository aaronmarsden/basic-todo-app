$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos)

    $("#todoInput").keypress(function(event) {
        if (event.which == 13) {
            postTodo();
        }
    })

    $(".todoList").on("click", "li", function() {
        completeTodo($(this));
    });

    $(".todoList").on("click", "span", function(e) {
        e.stopPropagation();
        deleteTodo($(this).parent());
    });
})

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if (todo.completed) {
        newTodo.addClass("done");
    }
    $(".todoList").append(newTodo);
}

function postTodo() {
    var inputVal = $("#todoInput").val();
    $.post("/api/todos", {name: inputVal})
    .then(function(todo) {
        addTodo(todo);
    })
    .catch(function(err) {
        console.log(err);
    })
    $("#todoInput").val("");
}

function deleteTodo(todo) {
    $.ajax({
        method: "DELETE",
        url: "/api/todos/" + todo.data("id")
    })
    .then(function(data) {
        console.log(data);
        todo.remove();
    })
    .catch(function(err) {
        console.log(err);
    })
}

function completeTodo(todo){
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    $.ajax({
      method: 'PUT',
      url: updateUrl,
      data: updateData
    })
    .then(function(updatedTodo){
      todo.toggleClass("done");
      todo.data('completed', isDone);
    })
    .catch(function(err) {
        console.log(err);
    })
  }
