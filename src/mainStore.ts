import { atom } from "nanostores";

export const activeListItem = atom(-1);

export const materialFilter = atom({
  Alb: false,
  Nrm: false,
  Spm: false,
  Emc: false,
  Emm: false,
  EmmMsk: false,
  Gn0: false,
  Gn1: false,
  Gn2: false,
  Gn3: false,
  Gn4: false,
  Gn5: false,
  AO: false,
  Ind: false,
});
