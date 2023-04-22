const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { append } = require("express/lib/response");

mailchimp.setConfig({
    apiKey:"ef9a68a10820db7afc49305a90241e35-us21",
    server:"us21",

});

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req, res){
    res.sendFile(__dirname +"/signup.html");

})

app.post("/", function(req,res){

    const listId = "3e9c7c2709";
    const subscribingUser = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
    };
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName,
          }

          
        });
      
        console.log(
          `Successfully added contact as an audience member. The contact's id is ${
            response.id
          }.`
        );

        console.log(response.statusCode);

        

      }
      
      run();

      
      

    var firstName = req.body.firstName;
    var lastName = req.body.secondName;
    var email = req.body.email;

    

    console.log(firstName, lastName, email);
})

app.listen(process.env.PORT || 3000, function(){
    console.log("SServer is running on port 3000");
})

//api key

//ef9a68a10820db7afc49305a90241e35-us21

//list id
//3e9c7c2709