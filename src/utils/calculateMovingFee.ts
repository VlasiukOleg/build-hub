const PRICE_PER_FLOOR = 250;
const PRICE_GIPSOKARTON_SM = 25;
const PRICE_GIPSOKARTON_MD = 35;
const PRICE_GIPSOKARTON_LG = 40;
const PRICE_PROF_LG = 2;
const PRICE_PROF_XL = 3;

const PRICE_GIPSOKARTON_SM_PER_FLOOR = 15;
const PRICE_GIPSOKARTON_MD_PER_FLOOR = 20;
const PRICE_GIPSOKARTON_LG_PER_FLOOR = 30;
const PRICE_PROF_LG_PER_FLOOR = 1;
const PRICE_PROF_XL_PER_FLOOR = 2;

import { PRICE_PER_TON } from '@/constants/constants';

const getDistanceMultiplier = (distance: number) => {
  if (distance <= 20) return 1;
  if (distance > 20 && distance < 35) return 1.2;
  if (distance >= 35 && distance < 45) return 1.4;
  if (distance >= 45 && distance <= 50) return 1.5;
  return 2;
};

export const calculateMovingFee = (
  weight: number,
  elevator: string,
  distance: number,
  building: string,
  floor: number,
  gipsSmCalculateQuantity: number,
  gipsMdCalculateQuantity: number,
  gipsLgCalculateQuantity: number,
  profLgCalculateQuantity: number,
  profXlCalculateQuantity: number
) => {
  let weightTypeMovingFee = 0;
  let gipsSmMovingFee = 0;
  let gipsMdMovingFee = 0;
  let gipsLgMovingFee = 0;
  let profLgMovingFee = 0;
  let profXlMovingFee = 0;

  if (
    weight > 0 &&
    weight < 1000 &&
    gipsSmCalculateQuantity === 0 &&
    gipsMdCalculateQuantity === 0 &&
    gipsLgCalculateQuantity === 0 &&
    profLgCalculateQuantity === 0 &&
    profXlCalculateQuantity === 0
  ) {
    weightTypeMovingFee = PRICE_PER_TON;
  } else {
    weightTypeMovingFee = PRICE_PER_TON;
    gipsSmMovingFee = PRICE_GIPSOKARTON_SM;
    gipsMdMovingFee = PRICE_GIPSOKARTON_MD;
    gipsLgMovingFee = PRICE_GIPSOKARTON_LG;
    profLgMovingFee = PRICE_PROF_LG;
    profXlMovingFee = PRICE_PROF_XL;
  }

  if (elevator === 'passenger') {
    weightTypeMovingFee *= 1.15;
    gipsSmMovingFee *= 1.15;
    profLgMovingFee *= 1.2;
  }

  if (
    (floor > 1 && elevator === 'cargo') ||
    (floor > 1 && elevator === 'passenger')
  ) {
    gipsMdMovingFee += PRICE_GIPSOKARTON_MD_PER_FLOOR * (floor - 1);
    gipsLgMovingFee += PRICE_GIPSOKARTON_LG_PER_FLOOR * (floor - 1);
    profXlMovingFee += PRICE_PROF_XL_PER_FLOOR * (floor - 1);
  }

  const distanceMultiplier = getDistanceMultiplier(distance);

  weightTypeMovingFee *= distanceMultiplier;
  gipsSmMovingFee *= distanceMultiplier;
  gipsMdMovingFee = PRICE_GIPSOKARTON_MD * distanceMultiplier;
  gipsLgMovingFee = PRICE_GIPSOKARTON_LG * distanceMultiplier;
  profLgMovingFee *= distanceMultiplier;
  profXlMovingFee = PRICE_PROF_XL * distanceMultiplier;

  if (floor > 1) {
    gipsMdMovingFee += PRICE_GIPSOKARTON_MD_PER_FLOOR * (floor - 1);
    gipsLgMovingFee += PRICE_GIPSOKARTON_LG_PER_FLOOR * (floor - 1);
    weightTypeMovingFee +=
      building === 'old'
        ? (PRICE_PER_FLOOR + 50) * (floor - 1)
        : PRICE_PER_FLOOR * (floor - 1);
    gipsSmMovingFee += PRICE_GIPSOKARTON_SM_PER_FLOOR * (floor - 1);
    profLgMovingFee += PRICE_PROF_LG_PER_FLOOR * (floor - 1);
    profXlMovingFee += PRICE_PROF_LG_PER_FLOOR * (floor - 1);
  }

  return {
    weightTypeMovingFee,
    gipsSmMovingFee,
    gipsMdMovingFee,
    gipsLgMovingFee,
    profLgMovingFee,
    profXlMovingFee,
  };
};
