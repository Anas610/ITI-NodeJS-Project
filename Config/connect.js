const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/NursingBackend').then(function(data)
{
    // mongodb+srv://mahmoudelsawy048:<password>@cluster0.3br3x35.mongodb.net/
    console.log('server is connected');
}).catch(err=>{
    console.log(err);
    console.log('server not connected');
})