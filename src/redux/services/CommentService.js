

import { BaseService } from "./BaseService";

export class CommentService extends BaseService{

    insertComment = (comment) => {
        return this.post('Comment/insertComment', comment);
     }
    getAllComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`)
    }
    editComment = (id, contentComment) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`)
       
    }
    deleteComment = (id) => {
        this.delete(`Comment/deleteComment?idComment=${id}`)
    }
   


}
export const commentService = new CommentService()