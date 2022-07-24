import http from "../utils/http-client";

class TodoService {

  addTodo(token: string,newTodo: string,todo_list_id: string){
    return new Promise((resolve, reject) => {
      http(token).post(`api/todo/${todo_list_id}/new`,newTodo).then(res => {
        resolve(res.data)
      }).catch(err => reject(err));
    });
  }

  toggleTodo(token: string,todo_id: string){
    return new Promise((resolve, reject) => {
      http(token).patch(`api/todo/${todo_id}/toggle`).then(res => {
        resolve(res.data)
      }).catch(err => reject(err));
    });
  }

  deleteTodo(token: string,todo_id: string){
    return new Promise((resolve, reject) => {
      http(token).delete(`api/todo/${todo_id}/delete`).then(res => {
        resolve(res.data)
      }).catch(err => reject(err));
    });
  }

}

export default new TodoService()