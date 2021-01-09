import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PetsList from '../components/PetsList';
import NewPetModal from '../components/NewPetModal';
import Loader from '../components/Loader';

// fragment
const PETS_FIELDS = gql`
  fragment PetsFields on Pet {
    name
    id
    type
    img
    vaccinated @client
    owner {
      id
      age @client
    }
  }
`;

const ALL_PETS = gql`
  query AllPets {
    pets {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

const NEW_PET = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { data, loading, error } = useQuery(ALL_PETS);

  const [createPet, newPet] = useMutation(NEW_PET, {
    update(cache, { data: { addPet } }) {
      const data = cache.readQuery({ query: ALL_PETS });
      console.log(data);
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [addPet, ...data.pets] },
      });
    },
  });

  const onSubmit = (input) => {
    console.log('here');
    setModal(false);
    createPet({
      variables: {
        newPet: input,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addPet: {
          __typename: 'Pet!',
          id: Math.floor(Math.random() * 1000 + ''),
          name: 'Pouya',
          type: input.type,
          img: 'https://i.picsum.photos/id/465/200/300.jpg',
        },
      },
    });
  };

  // If you're doing optimistic UI update, avoid using loaders, as utilizing loaderes will defeat the purpose of OUI
  // if (loading || newPet.loading) {
  //   return <Loader />;
  // }

  if (error) {
    console.info(error);
    return <p>oops! an error occured...</p>;
  }

  console.log(data);

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data && data.pets && data.pets} />
      </section>
    </div>
  );
}
