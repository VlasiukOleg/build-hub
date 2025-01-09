import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react';

import { getMovingTableLabels } from './utils';
import { MOVING_LIST_TABLE_KEYS_MAP } from './constans';

const createColumns = () => {
  const labels = getMovingTableLabels();

  const columns = Object.values(MOVING_LIST_TABLE_KEYS_MAP).map(key => ({
    key,
    label: labels[key],
  }));

  return columns;
};

const columns = createColumns();

interface IMovingCostTableProps {
  rows:
    | {
        key: string;
        type: string;
        measure: string;
        quantity: number;
        price: string;
        totalPrice: string;
      }[]
    | [];
}

const MovingCOstTable: React.FunctionComponent<IMovingCostTableProps> = ({
  rows,
}) => {
  return (
    <Table aria-label="Moving Cost Table">
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {item => (
          <TableRow key={item.key}>
            {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MovingCOstTable;
