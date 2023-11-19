import { AvatarName } from "constants/avatars";

const animals = [
  "Baleine",
  "Bouquetin",
  "Tardigrade",
  "Chameau",
  "Castor",
  "Furet"
]

const adjectives = [
  "Impavide",
  "DeLaTempeste",
  "Affable",
  "Érotomane",
  "Opinâtre",
  "Amovible"
]

const avatars = Object.values(AvatarName);

const pickOne = (array: any[]) => array.at(Math.floor(Math.random() * array.length));

const getAnimal = () => pickOne(animals);

const getAdjective = () => pickOne(adjectives);

export const getRandomAvatar = () => pickOne(avatars);

export const getRandomName = () => `${getAnimal()}${getAdjective()}`;

