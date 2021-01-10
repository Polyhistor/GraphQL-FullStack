// module.exports = {
//   Query: {
//     pets(_, {input}, {models}) {
//       return models.Pet.findMany(input || {})
//     },
//     pet(_, {id}, {models}) {
//       return models.Pet.findOne({id})
//     },
//     user(_, __, {models}) {
//       return models.User.findOne()
//     }
//   },
//   Mutation: {
//     addPet(_, {input}, {models, user}) {
//       const pet = models.Pet.create({...input, user: user.id})
//       return pet
//     }
//   },
//   Pet: {
//     owner(pet, _, {models}) {
//       return models.User.findOne({id: pet.user})
//     },
//     img(pet) {
//       return pet.type === 'DOG'
//         ? 'https://placedog.net/300/300'
//         : 'http://placekitten.com/300/300'
//     }
//   },
//   User: {
//     pets(user, _, {models}) {
//       return models.Pet.findMany({user: user.id})
//     }
//   }
// }

const user = {
  id: 1,
  username: 'yoda@masters.com',
  avatar: 'http://yoda.com',
  shoes: [],
};

const shoes = [
  { brand: 'NIKE', size: 12, sport: 'basketball', user: 1 },
  { brand: 'ADIDAS', size: 14, hasGrip: true, user: 1 },
];

module.exports = {
  Query: {
    pets(_, { input }, context) {
      return context.models.Pet.findMany(input);
    },
    pet(_, { input }, context) {
      console.log('Query => pet');
      return context.models.Pet.findOne(input);
    },
    shoes(_, { input }) {
      return shoes;
      // .filter((shoe) => {
      //   return shoe.brand === input.brand;
      // });
    },
    me() {
      return user;
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
    newPet(_, { input }, context) {
      return context.models.Pet.create(input);
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return 'Sneaker';
      return 'Boot';
    },
  },
  User: {
    shoes(user) {
      return shoes;
    },
    pet(user, __, ctx) {
      console.log(user);
      return ctx.models.Pet.findMany();
    },
  },
  Sneaker: {
    user(shoe) {
      return user;
    },
  },
  Boot: {
    user(shoe) {
      return user;
    },
  },
  Pet: {
    owner(pet, __, ctx) {
      console.log('pet => owner');
      return ctx.models.User.findOne();
    },
  },
  // Mutation: {},
  // Pet: {
  // owner(pet, _, { models }) {
  //   return models.User.findOne({ id: pet.user });
  // },
  // img(pet) {
  //   return pet.type === 'DOG'
  //     ? 'https://placedog.net/300/300'
  //     : 'http://placekitten.com/300/300';
  // },
  // },
};
