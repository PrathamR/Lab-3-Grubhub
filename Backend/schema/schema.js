const graphql = require('graphql');
const encrypt = require('../utils/encrypt');
const queries = require('../utils/queries');

const {GraphQLObjectType,
       GraphQLString,
       GraphQLSchema,
       GraphQLID,
       GraphQLInt,
       GraphQLBoolean,
       GraphQLList,
       GraphQLNonNull
    } = graphql;

var logincheck = 
    {"validPwd" : false}
;

var profileData = {"Sectionname":"","Sectionid":"","Sectionterm":""};

var resultData = {
    success: false,
    duplicateUser: false
}

var resultSectionData = {
    success: false,
    duplicateUser: false
}

var resultcreateData = {
    success: false,
    duplicateUser: false
}

const BuyerLoginType = new GraphQLObjectType({
    name:'Login',
    fields:() => ({
        validPwd: { type: GraphQLBoolean },
    })
});

const SearchType = new GraphQLObjectType({
    name:'search',
    fields:() => ({
        Sectionname:{type:GraphQLString},
        Sectionid:{type:GraphQLString},
        Sectionterm:{type:GraphQLString}
    })
});

const LogoutType = new GraphQLObjectType({
    name:'logout',
});

const RestType = new GraphQLObjectType({
    name:'subjectdetails',
    fields:() => ({
        restid:{type:GraphQLID},
    })
});

const SignUpType = new GraphQLObjectType({
    name:'signup',
    fields:() => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});


const SectionCreationType = new GraphQLObjectType({
    name:'Sectioncreation',
    fields:() => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});



const SectioncreateType = new GraphQLObjectType({
    name:'createowner',
    fields:() => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});

function response(data, res, err, producer) {
    console.log("after handle", res);
    var payloads = [
      {
        topic: data.replyTo,
        messages: JSON.stringify({
          correlationId: data.correlationId,
          data: res,
          err: err
        }),
        partition: 0
      }
    ];
    producer.send(payloads, function(err, data) {
        if(err){
            console.log("error when producer sending data", err);
        } else {
            console.log("producer send", data);
        }
    });
    return;
  }

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        buyerLogin:{
            type: BuyerLoginType,
            args: {email:{type:GraphQLID},
                   password:{type:GraphQLString}
                  },
            resolve(parent,args){

               console.log("Inside Login Post Request");
               console.log("Req Body : ",args);
           
               queries.getBuyerPasswordByEmail(args.email, row => {
           
                if(row){
                    encrypt.confirmPassword(args.password,row.password, result => {
                        if (result){
                            console.log("Login successful");
                            logincheck.validPwd = true;
                            return logincheck;
                        }else{
                            let errorDetails = {};
                            errorDetails.statusCode = 401;
                            errorDetails.info = {success: false, message: 'Incorrect Password'};
                            return logincheck;
                        }
                        }, err => {
                            let errorDetails = {};
                            errorDetails.statusCode = 500;
                            errorDetails.info = {success: false, message: 'Something wrong with bcrypt'};
                            return logincheck;
                        });
                    }else{
                        let errorDetails = {};
                        errorDetails.statusCode = 401;
                        errorDetails.info = {success: false, message: 'Email does not exists. Please try again'};
                        return logincheck;
                    }
               });
               
               return logincheck;      
            } 
        },
        restaurantmenu:{//view menu
            type: RestType,
            args: {buyerid:{type:GraphQLID}
                  },
            resolve(parent,args){
                    var subjectdetails = {}
               console.log("Inside Subject details get Request");
               console.log("Req Body : ",args);

               createowner.find({
                'buyerid': args.buyerid
             }, (err, user) => {
               if (err) {
                   console.log("Unable to fetch user details.", err);
               }
               else {
                   subjectdetails = user;
                 console.log(user);
                 console.log("User found");
               }
             });

             return subjectdetails;
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
            
            signup:{
            type: SignUpType,
            args:{buyerid:{type:GraphQLString},
                  password:{type:GraphQLString},
                  name:{type:GraphQLString},
                  emailid:{type:GraphQLString},
                  user_flag:{type:GraphQLString},
            },

    resolve: (parent,args) => {

        console.log(args);
        return new Promise(async (resolve, reject) => {
            var successResult = false;
            var duplicateUserResult = false;
            await userDetails.findOne({
                "buyerid": args.buyerid
            }, (err, user) => {
                if (err) {

                }
                else {
                    if (user) {
                        console.log('User Exists!', user);
                             duplicateUserResult = true;
                          
                             
                    userDetails
                     .findOneAndUpdate(
                       { buyerid: args.buyerid },
                       { $name: args.name},
                       { $email: args.emailid},
                         { new: true }
                       )
                           .then(answer => {
                                res.status(200).json({ message: "User Updated successfully" });
                             });
                             resultData = {
                                success: successResult,
                                duplicateUser: duplicateUserResult
                            }
                             resolve(resultData);

                    }
                    else {

                        if (args.isFaculty){
                            console.log("if madhe");
                             var userflag = 'Y';
                         }
                          else{
                            console.log("else madhe");
                             var userflag = 'N';
                          }

                        const hashedPassword = bcrypt.hashSync(args.password);

                        var user = new userDetails({
                            buyerid: args.buyerid,
                            password: hashedPassword,
                            name: args.name,
                            email: args.emailid,
                            user_flag: userflag
                        });
                      
                       user.save().then((doc) => {

                            console.log("User added successfully.", doc);
                            successResult = true;
                      
                             resultData = {
                                success: successResult,
                                duplicateUser: duplicateUserResult
                            }

                        resolve(resultData);
                        });
                    }  
                }
            });
        });
    }
  },
  Sectioncreation:{
    type: SectionCreationType,
    args:{Sectionid:{type:GraphQLString},
         Sectionname:{type:GraphQLString}
    },

    resolve: (parent,args) => {

        return new Promise(async (resolve, reject) => {
            var successResult = false;
            var duplicateUserResult = false;
            Sectioncreation.findOne({
                'Sectionid': args.Sectionid 
            }, (err, user) => {
                
                
                if (err) {
                    console.log("Unable to fetch Section details.", err);       
                }
                else {
            
                    if (user) {
                        console.log('Section Exists!', user);
                            console.log('Duplicate Section');
                            duplicateUserResult = true;
                    }
            
                    else {
            
                         console.log("message is here");
                         var user = new Sectioncreation({
                             Sectionid: args.Sectionid ,
                             Sectionname: args.Sectionname
                         });
                     

                   return  user.save().then((doc) => {
            
                        console.log("Section saved successfully.", doc);
                        successResult = true;
                        resultSectionData = {
                            success: successResult,
                            duplicateUser: duplicateUserResult
                        }

                        resolve(resultSectionData);
                    });
                 }    
                 resolve(resultSectionData);
                }    
            });
        });
      }
    },
    createowner:{

        type: SectioncreateType,
        args:{
             Sectiondept:{type:GraphQLString},
             Sectionname:{type:GraphQLString},
             buyerid:{type:GraphQLString},
             Sectionid:{type:GraphQLString}
        },

        resolve: (parent,args) => {

            return new Promise(async (resolve, reject) => {

                var successResult = false;
                var duplicateUserResult = false;

                console.log("Inside create studnet Post Request");
                var concat = args.buyerid + args.Sectionid;
                console.log(concat);
              
                               var user = new createowner({
                                  buyerSectionid: concat,
                                  Sectiondept: args.Sectiondept,
                                  Sectionname: args.Sectionname,
                                  buyerid: args.buyerid,
                                  Sectionid: args.Sectionid
                               });                 
                  
                           user.save().then((doc) => {
                  
                              console.log("Section createed successfully.", doc);

                              resultcreateData = {
                                success: successResult,
                                duplicateUser: duplicateUserResult
                            }
                              resolve(resultcreateData);
                  
                          }, (err) => {

                              console.log("Unable to save Section details.", err);
                          
                          });
                    })
                }
            }
        })
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})