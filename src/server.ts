import { app } from './app';
import { seedAdmin } from './utils/seedAdmin';

const PORT = process.env.PORT || 5000;


const startServer = async () => {
  await seedAdmin(); 

  app.listen(PORT, () => console.log(`App running on port ${PORT}`));
};

startServer();