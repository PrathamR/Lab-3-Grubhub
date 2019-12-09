import {gql} from 'apollo-boost';

const buyerLogin = gql`
query buyerLogin($email: ID, $password: String){
        buyerLogin(email: $email, password: $password){
            validPwd
        }
    }`

const ownerLogin = gql`
query ownerLogin($emailid: ID, $password: String){
        login(emailid: $emailid, password: $password){
            validPwd
        }
    }`

    const search= gql`
    query search($courseInfo: String!){
            search(courseInfo: $courseInfo){
                coursename
                courseid
                courseterm
            }
        }`


        const restaurantmenu = gql`
        query restaurantmenu($restid: ID){
                getmenu(restid: $restid){
                    restaurantmenu
                }
            }`

const buyerProfileDetails = gql`
query buyerProfileDetails($buyerid: ID){
        getProf(buyerid: $buyerid){
            buyerProfileDetails
        }
    }`

const ownerProfileDetails = gql`
query ownerProfileDetails($ownerid: ID){
        login(ownerid: $buyerid){
            ownerProfileDetails
        }
    }`


    const buyerSignupMutation = gql`
    mutation($buyerid:String!,$name:String!,$email:String!,$password:String!){
      signup(buyerid:$buyerid,
              name:$name,
              emailid:$email,
              password:$password){
                success
                duplicateUser
            }
    }
    `

const ownerSignupMutation = gql`
mutation($buyerid:String!,$name:String!,$email:String!,$password:String!){
  signup(buyerid:$buyerid,
          name:$name,
          emailid:$email,
          password:$password){
            success
            duplicateUser
        }
}
`

    const sectionCreationMutation = gql`
    mutation($sectionid:String!,
             $sectionname:String,
           ){
        sectionCreation(
            sectionid:$sectionid,
            sectionname:$sectionname,
             ){
                success
                duplicateUser
              }
    }
    `

const itemCreationMutation = gql`
    mutation($itemid:String!,
             $itemname:String,
           ){
            itemCreation(
                itemid:$itemid,
                itemname:$itemname,
             ){
                success
                duplicateUser
              }
    }
    `
    const profileUpdateMutation = gql`
    mutation($buyerid:String!,
             $name:String,
             $emailid:String,
             $password:String){
          signup(
             buyerid:$buyerid,
             name:$name,
             emailid:$emailid,
             password:$password,){
                success
                duplicateUser
              }
    }
    `

    export {buyerLogin,
            buyerSignupMutation,
            ownerLogin,
            ownerSignupMutation,
            sectionCreationMutation,
            itemCreationMutation,
            profileUpdateMutation,
            restaurantmenu,
            buyerProfileDetails,
            ownerProfileDetails
            };