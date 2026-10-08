
const express = require("express");
const taskRoutes = require('./routes/app.route.js');
const app = express();

app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.use((err,req,res, next) => {
   console.log("error is", err);
   res.status(500).json({success: false, message: "Internal Server Error"});
} );

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})