require('dotenv').config();
const { sequelize, Club, Event, Membership } = require('../src/models');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('DB synced (force true)');

    const club1 = await Club.create({ name: 'Coding & Algorithms Club', description: 'Practice algorithms and host coding sessions', ownerId: 'user-1', logo: '' });
    const club2 = await Club.create({ name: 'Robotics Club', description: 'Hands-on robotics workshops', ownerId: 'user-2', logo: '' });

    const ev1 = await Event.create({ clubId: club1.id, title: 'Weekly Algo Practice', description: 'Practice DSA', datetime: new Date(Date.now()+3*24*60*60*1000) });
    const ev2 = await Event.create({ clubId: club2.id, title: 'Robotics Workshop', description: 'Intro to microcontrollers', datetime: new Date(Date.now()+7*24*60*60*1000) });

    await Membership.create({ userId: 'user-1', clubId: club1.id });

    console.log('Seed completed');
    process.exit(0);
  } catch (err) { console.error(err); process.exit(1); }
}

seed();
