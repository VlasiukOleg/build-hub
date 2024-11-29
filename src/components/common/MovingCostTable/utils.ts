import { MOVING_LIST_TABLE_KEYS_MAP } from './constans';
import data from '@/data/common.json';

export const getMovingTableLabels = () => {
  const BASE_PATH = data.moving.columnLabels;
  return {
    [MOVING_LIST_TABLE_KEYS_MAP.TYPE]: BASE_PATH.type,
    [MOVING_LIST_TABLE_KEYS_MAP.MEASURE]: BASE_PATH.measure,
    [MOVING_LIST_TABLE_KEYS_MAP.QUANTITY]: BASE_PATH.quantity,
    [MOVING_LIST_TABLE_KEYS_MAP.PRICE]: BASE_PATH.price,
    [MOVING_LIST_TABLE_KEYS_MAP.TOTAL_PRICE]: BASE_PATH.totalPrice,
  };
};
