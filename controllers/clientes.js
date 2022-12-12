var validator = require("validator");
const clientes = require("../models/clientes");
const Clientes = require("../models/clientes");

var controller = {
    probando: function(req,res){
        return res.status(200).send({
            message: "Entramos a la función probando"
        })
    },
 
    testeando: function(req,res){
        return res.status(200).send({
            message:"Este es el metodo testeando"
        })
    },

    save:function(req, res){
        var params = req.body;
        console.log(params);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_age = !validator.isEmpty(params.edad);
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validate_pass = !validator.isEmpty(params.pass);
        console.log(validate_pass);
           if(validate_name && validate_age && validate_email && validate_pass){
            var clientes = new Clientes();
            clientes.name = params.nombre;
            clientes.age = params.edad;
            clientes.email = params.email;
            clientes.pass = params.pass;
            console.log(clientes);
            clientes.save((err, userStored) =>{
              return res.status(200).send({
                 message:"Usuario guardado",
                 clientes: userStored
                 
              })  
           })
          }else{
            return res.status(200).send({
                message:"Ingresa todos los datos, y asegurate de que el correo sea valido",
                params
            })
          }
    },

    login:function(req,res){
        return res.status(200).send({
            message:"Metodo Login"
        })
    },

    update:function(req,res){
        var params = req.body;
        console.log(params);
        var clientesId = req.params.id;
        console.log(clientesId);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_age = !validator.isEmpty(params.edad);
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validate_pass = !validator.isEmpty(params.pass);
        if(validate_name && validate_age && validate_email && validate_pass){
            var update = {
                name:params.nombre,
                age:params.edad,
                email:params.email,
                pass:params.pass
            }
            clientes.findOneAndUpdate({clientesId},update,{new:true},(err,userUpdate) => {
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }
                if(!userUpdate){
                    return res.status(404).send({
                        message:"No se pudo actualizar",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Se actualizó correctamente",
                    userUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"ActualizarValidación de los datos invalida"
            })

        }
        
    },

    delete:function(req,res){
        var clientesId = req.params.id;
        clientes.findOneAndDelete({_id:clientesId},(err,userRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                })
            }

            if(!userRemoved){
                return res.status(404).send({
                    message:"No se pudo eliminar",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Cliente Eliminado",
                status:userRemoved
            });
            
        })

    },

    listarClientes:function(req,res){
        clientes.find(function(err,doc){
            console.log(doc);
        return res.status(200).send({
            message:"Listado de Clientes",
            doc
        });
    })
},

verClientes:function(req,res){
    var clientesId = req.params.id;

    clientes.findById(clientesId)
            .exec((err, clientes)=>{
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    })
                }
    
                if(!clientes){
                    return res.status(404).send({
                        message:"No se encontró el cliente",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "cliente encontrado",
                    clientes
                });
            })

}
}
module.exports = controller;