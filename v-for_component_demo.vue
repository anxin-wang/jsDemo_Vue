<div id="todo-list-example">
    <input v-model="newTodoText" @keyup.enter="addNewTodo" placeholder="Add a todo">
    <ul>
        <li is="todo-item" v-for="(todo, index) in todos" :key="index" :title="todo" @remove="todos.splice(index, 1)"></li>
    </ul>
</div>


<script>
    Vue.component('todo-item', {
        template: '<li>{{ title }}<button v-on:click="$emit(\'remove\')">X</button></li>',
        props: ['title']
    })

    new Vue({
        el: '#todo-list-example',
        data: {
            newTodoText: '',
            todos: [
                'Do the dishes',
                'Take out the trash',
                'Mow the lawn'
            ]
        },
        methods: {
            addNewTodo: function () {
                this.todos.push(this.newTodoText)
                this.newTodoText = ''
            }
        }
    })
</script>
