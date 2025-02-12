const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/auth', require('./routes/auth'));
app.use('/companies', require('./routes/company'));
app.use('/reviews', require('./routes/review'));  

const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

io.on('connection', (socket) => {
  socket.on('joinCompany', async (companyId) => {
    socket.join(companyId); 
    try {
      socket.join(companyId);
      console.log(`Socket ${socket.id} joined room ${companyId}`);

      const company = await sequelize.models.Company.findOne({
        where: { id: companyId },
        include: [
          {
            model: sequelize.models.Review,
            as: 'reviews',
            include: [
              {
                model: sequelize.models.User,
                as: 'user',
              },
            ],
          },
        ],
      });

      if (company) {
        socket.emit('newReviewOnCompany', {
          message: `Welcome to company ${companyId}`,
          data: company,
        });
      } else {
        socket.emit('newReviewOnCompany', {
          message: `Company with ID ${companyId} not found.`,
          data: null,
        });
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
      socket.emit('newReviewOnCompany', {
        message: 'An error occurred while loading the company data.',
        error: error.message,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
