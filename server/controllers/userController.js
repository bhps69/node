const { request } = require('express');
const  express  = require('express');
const mysql=require('mysql');
const { connect } = require('../router/user');
const router = express.Router(); 
const pool = mysql.createPool({connectionLimit:100,
    host: "localhost",
    user: "root",
    password: "",
    database: "demo"
});


exports.view = (req,res) =>{ 
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        
            console.log(' connection'+ connection.threadId)
        connection.query('select * from employee',(err,rows)=>{
    
            connection.release();
            if(!err){
                res.render('home',{rows});
            }
            else
                console.log(err);
                console.log('the rows are :\n',rows)
        });
    });
    }

    //query to find a particular user 
    exports.find = (req,res) => {
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            console.log('finding a user', connection.threadId);
           
            
            let searchTerm = req.body.research;
            console.log('searching',searchTerm);
            connection.query("SELECT * FROM employee WHERE employee.first_name LIKE '%"+searchTerm+"%'",(err,rows)=>{
    
                connection.release();
                if(!err){
                    res.render('home',{rows});
                }
                else
                    console.log(err);
                    console.log('the rows are :\n',rows)
            });
            
        });
        
    }

    //query to add a user 
    exports.form = (req,res) => {
     
         res.render('add-user');   
        
    }

    //insert a new user
    exports.create = (req,res)=>{
        console.log('in create');
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            console.log('finding a user', connection.threadId);
           
            const {first_name,last_name,email,phone,comments}=req.body;
            console.log('var');
            console.log(req.body);
            connection.query('INSERT INTO employee SET first_name=?,last_name=?,email=?,phone=?,comments=?',[first_name,last_name,email,phone,comments],(err,rows)=>{
                if(!err)
                res.render('add-user',{alert:'user added successfully.'});
                else
                console.log(err);
                    
                connection.release();
            });
            console.log('rows:',first_name);
        });
    }

    exports.edit=(req,res)=>{
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            
                console.log(' connection'+ connection.threadId)
            connection.query('select * from employee where id=?',[req.params.id],(err,rows)=>{
        
                connection.release();
                if(!err){
                    res.render('edit-user',{rows});
                }
                else
                    console.log(err);
                    console.log('the rows are :\n',rows)
            });
        });
        
      
    }


    exports.update=(req, 
        res)=>{
            console.log("in update");
            pool.getConnection((err,connection)=>{
            if(err) throw err;
            const {id,first_name,last_name,email,phone,comments}=req.body;
            console.log('connection'+connection.threadId);
            console.log("id = ",id,first_name,last_name,email,phone,comments);
            connection.query('UPDATE employee SET first_name=?,last_name=?,email=?,phone=?,comments=? where id=?',[first_name,last_name,email,phone,comments,id],(err,rows)=>{
            connection.release();
            const name=first_name
            // if(!err)
            //     res.render('home',{rows});
            // else
            //     console.log(err);
            pool.getConnection((err,connection)=>{
                if(err) throw err;
                
                    console.log(' connection'+ connection.threadId)
                connection.query('select * from employee',(err,rows)=>{
            
                    connection.release();
                    if(!err){
                        res.render('home',{rows, alert: name+' has been updated'});
                    }
                    else
                        console.log(err);
                        console.log('the rows are :\n',rows)
                });
            });
        
        })
    });
    }

    exports.viewuser = (req,res) => {
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            console.log('view a user', connection.threadId);
           
            
            let id = req.params.id;
            console.log('id',id);
            connection.query("SELECT * FROM employee WHERE id = "+id,(err,rows)=>{
                console.log(rows);
                connection.release();
                if(!err){
                    res.render('view-user',{rows});
                }
                else
                    console.log(err);
                    console.log('the rows are :\n',rows)
            });
            
        });
        
    }

    
    exports.delete=(req,res)=>{
        pool.getConnection((err,connection)=>{
            if(err) throw err;
                console.log('delete');
                console.log(' connection'+ connection.threadId);
                console.log(req.params.id);
            connection.query('delete  from employee where id=?',[req.params.id],(err,rows)=>{
        
                connection.release();
                if(!err){
                    res.redirect('/');
                }
                else
                    console.log(err);
                    console.log('the rows are :\n',rows)
            });
        });
        
      
    }
