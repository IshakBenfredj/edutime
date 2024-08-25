const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require('path');

// Import Routes
const authRoutes = require("./routes/auth-routes.js");
const courseRoutes = require("./routes/course-routes.js");
const commentRoutes = require("./routes/comment-routes.js");
const reservationRoutes = require("./routes/reservation-routes.js");
const userRoutes = require("./routes/user-routes.js");
const blogRoutes = require("./routes/blog-routes.js");
const postRoutes = require("./routes/post-routes.js");
const requestRoutes = require("./routes/request-routes.js");
const conversationRoutes = require("./routes/conversations-routes.js");
const messageRoutes = require("./routes/messages-routes.js");
const notificationRoutes = require("./routes/notification-routes.js");
const pubRoutes = require("./routes/pub-routes.js");
const { sendMailFromUserToTeam } = require("./middlewares/nodemailer.js");

const app = express();
const PORT = process.env.PORT || 8800;

dotenv.config();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

const allowedOrigins = ['https://edutime.click', 'https://www.edutime.click'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use((req,res,next)=>{
const customerHeader = req.headers['x-custom-header'];
if (!customerHeader || customerHeader !== "secretValueForEdutimeWebsiteEducationAliHani" ){
res.status(403).send('Access impossible');
} else {
next();
}
});

// Routes
app.use("/auth", cors(corsOptions), authRoutes);
app.use("/courses", cors(corsOptions), courseRoutes);
app.use("/users", cors(corsOptions), userRoutes);
app.use("/reservations", cors(corsOptions), reservationRoutes);
app.use("/posts", cors(corsOptions), postRoutes);
app.use("/blogs", cors(corsOptions), blogRoutes);
app.use("/comments", cors(corsOptions), commentRoutes);
app.use("/conversations", cors(corsOptions), conversationRoutes);
app.use("/messages", cors(corsOptions), messageRoutes);
app.use("/requests", cors(corsOptions), requestRoutes);
app.use("/notifications", cors(corsOptions), notificationRoutes);
app.use("/pubs", cors(corsOptions), pubRoutes);

app.post("/mail/send", async (req, res) => {
  try {
    const { message } = req.body;
    sendMailFromUserToTeam(message);
    res.status(200).json({ message: "تم إرسال الرسالة بنجاح" });
  } catch (error) {
    res.status(400).json({ error: "Server Error" });
  }
});

mongoose
  .connect("mongodb+srv://edutime19:edutime19@cluster0.arou16u.mongodb.net/edutime?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("connected to db & listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
