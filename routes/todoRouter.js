const exp = require('express')
const router = exp.Router();
const {addTodo,getTodo,getspecficTodo,updateSpecficTodo, deletespecficTodo} = require("../Controller/todoCon")

router.post('/addTodo',addTodo)
router.post('/getTodo',getTodo)
router.post('/getspecfic',getspecficTodo)
router.post('/updateSpecficTodo',updateSpecficTodo)
router.post('/deleteSpecficTodo',deletespecficTodo)

module.exports = router;