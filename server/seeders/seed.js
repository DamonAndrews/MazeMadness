// const db = require('../config/connection');
// const { User} = require('../models');
// const userSeeds = require('./userSeeds.json');

// db.once('open', async () => {
//   try {
//     await User.deleteMany({});

//     await User.create(userSeeds);

//     for (let i = 0; i < scoreSeeds.length; i++) {
//       const { _id, scoreAuthor } = await score.create(scoreSeeds[i]);
//       const user = await User.findOneAndUpdate(
//         { username: scoreAuthor },
//         {
//           $addToSet: {
//             scores: _id,
//           },
//         }
//       );
//     }
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   console.log('all done!');
//   process.exit(0);
// });
