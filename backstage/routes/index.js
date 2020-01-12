var express = require('express');
var mysql = require('./sql');
var router = express.Router();
console.log(mysql)
//注册
router.post('/up', (req, res) => {
	var json = req.data;
	console.log(json)
	mysql.sql({
		sql: 'select user from lsh_register where user=?',
		arr: [json.user],
		data(data) {
			console.log("執行")
			if (data.length) {
				res.send({
					type: 1,
					data: ''
				})
			} else {
				mysql.sql({
					sql: 'insert into lsh_register(user,pass,imgurl) values(?,?,?)',
					arr: [json.user, json.pass, json.imgurl],
					data(data) {
						mysql.sql({
							sql: 'select * from lsh_register where user=?',
							arr: [json.user],
							data(data) {
								res.send({
									type: 2,
									data: data[0]
								})
							}
						})
					}
				})
			}
		}
	})
});

//登录
router.post('/in', (req, res) => {
	var json = req.data;
	mysql.sql({
		sql: 'select * from lsh_register  uid=? and pass=?',
		arr: [json.user, json.pass],
		data(data) {
			if (data.length) {
				console.log(data);
				res.send({
					type: 2,
					data: data[0]
				})
			} else {
				res.send({
					type: 1,
					data: ""
				})
			}
		}
	})
})

//头像获取
router.get('/imgurl', (req, res) => {
  var json = req.data;
  mysql.sql({
    sql: 'select imgurl from lsh_register where tel=? or user=? ',
    arr: [json.user, json.user],
    data(data) {
      if (data.length) {
        console.log(data);
        res.send({ type: 2, data: data[0] })
      } else {
        res.send({ type: 1, data: "" })
      }
    }
  })
})

module.exports = router;
