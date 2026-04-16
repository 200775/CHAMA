const express=require('express');
const  cors=require('cors');
const routes=require('./routes/routes');
require('dotenv').config();
const connectDB=require('./config/db');
const app=express();
connectDB();
app.use(cors());
app.use(express.json());
app.get("/members", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});
app.get('/',(req,res)=>{
    res.send('API running');
});
app.use(express.static('Frontend'));
//app.use('/api/user',routes);
app.use('/users',         require('./routes/users'))
app.use('/members',       require('./routes/members'))
app.use('/contributions', require('./routes/contributions'))
app.use('/loans',         require('./routes/loans'))
//start server
const PORT=process.env.PORT||7000;
app.listen(PORT,()=>
    console.log(`Server is running on port:${PORT}`)
);



