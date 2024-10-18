const PRICE_PER_TON = 500;
const BASE_PRICE = 0.5;
const PRICE_PER_FLOOR = 0.25;
const PRICE_GIPSOKARTON_LIFT_XS = 25;

const PRICE_GIPSOKARTON_XS_PER_FLOOR = 40;
const PRICE_GIPSOKARTON_SM_PER_FLOOR = 55;
const PRICE_GIPSOKORTON_MD_PER_FLOOR = 70;

export const calculateMovingFee = (
  weight: number,
  elevator: string,
  distance: number,
  building: string,
  floor: number,
  liftSizedGipsokarton: number
) => {
  const normalizedWeight = weight * 0.001;
  let movingFee = 0;

  if (weight > 0 && weight < 1000) {
    movingFee = PRICE_PER_TON;
  } else {
    movingFee =
      PRICE_PER_TON * normalizedWeight +
      liftSizedGipsokarton * PRICE_GIPSOKARTON_LIFT_XS -
      liftSizedGipsokarton * 20 * BASE_PRICE;
  }

  if (elevator === 'passenger') {
    movingFee =
      PRICE_PER_TON * normalizedWeight * 1.15 +
      liftSizedGipsokarton * PRICE_GIPSOKARTON_XS_PER_FLOOR -
      liftSizedGipsokarton * 20 * BASE_PRICE * 1.15;
  }

  if (floor > 1) {
    movingFee +=
      building === 'old'
        ? (BASE_PRICE + (PRICE_PER_FLOOR + 0.05) * (floor - 1)) * weight
        : (BASE_PRICE + PRICE_PER_FLOOR * (floor - 1)) * weight;
  }

  if (distance <= 20) {
    movingFee *= 1;
  } else if (distance > 20 && distance < 35) {
    movingFee *= 1.2;
  } else if (distance >= 35 && distance < 45) {
    movingFee *= 1.4;
  } else if (distance >= 45 && distance <= 50) {
    movingFee *= 1.5;
  } else if (distance > 50) {
    movingFee *= 2;
  }
  return movingFee;
};
