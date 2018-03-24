<template>
  <div class="container mt-2">
    <h1>{{titulo}}</h1>
      <form class="form">
        <div class="form-group">
          <label>Cadastrar tarefa:</label>
          <input :class="testClass" type="text" v-model="tarefa" />
        </div>
        <button v-if="!editando" class="btn btn-primary" @click="postTarefa()">Cadastrar Tarefa</button>
        <button v-if="editando" class="btn btn-success" @click="putTarefa(itemToEdit, tarefa)">Salvar Tarefa</button>
        <button v-if="editando" class="btn btn-danger" @click="cancelEdit(tarefa)">Cancelar</button>
      </form>

      <table v-show="tarefas.length > 0" class="table mt-3 small table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Concluir</th>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task of tarefas" :key="task['.key']" v-if="itemToEdit != task['.key']">
              <td>
                <input v-model="task.status" type="checkbox" @click="putStatus(task['.key'], task.status)">
              </td>
              <td>{{task.nome}}</td>
              <td>{{task.status ? 'Concluida' : 'Pendente'}}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteTarefa(task['.key'], task.nome)">Deletar</button>
                <button class="btn btn-info btn-sm" @click="edit(task['.key'], task.nome)">Editar</button>
              </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { tarefasRef } from '../../firebase'

export default {
  name: 'Search',
  data () {
    return {
      titulo: 'Controle de tarefas',
      tarefa: '',
      editando: false,
      itemToEdit: ''
    }
  },
  methods: {
    postTarefa () {
      tarefasRef.push({nome: this.tarefa, status: false})
      this.tarefa = ''
    },
    putTarefa (key, tarefa) {
      tarefasRef.child(key).update({ nome: tarefa })
      this.cancelEdit()
    },
    putStatus (key, status) {
      tarefasRef.child(key).update({ status: !status })
    },
    deleteTarefa (key, nome) {
      if (confirm('Deseja mesmo excluir a tarefa ' + nome + ' ?')) {
        tarefasRef.child(key).remove()
      }
    },
    edit (key, tarefa) {
      this.editando = true
      this.tarefa = tarefa
      this.itemToEdit = key
      this.testClass = 'test'
    },
    cancelEdit () {
      this.editando = false
      this.tarefa = ''
      this.itemToEdit = ''
      this.testClass = ''
    }
  },
  firebase: {
    tarefas: tarefasRef
  } /* ,
  request () {
    this.$http
      .get('http://fe2018noite-fronendinfnet.c9users.io:8081/retorno')
      .then(
        function (response) {
          this.retorno = response.data
        },
        function (err) {
          console.log('err', err)
        }
      )
  } */
}
</script>

<style scoped>
  .test {
    border: 2px solid yellowgreen;
  }
</style>
