import { EntitySchema } from 'typeorm';
import { Transaction } from '../../../domain/entity/transaction';

export const TransactionSchema = new EntitySchema<Transaction>({
  name: 'transactions',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    accountFrom: {
      type: 'uuid',
      name: 'account_from_id',
    },
    accountTo: {
      type: 'uuid',
      name: 'account_to_id',
    },
    amount: {
      type: 'decimal',
      precision: 15,
      scale: 2,
    },
    createdAt: {
      type: Date,
      name: 'created_at',
      createDate: true,
    },
    updatedAt: {
      type: Date,
      name: 'updated_at',
      updateDate: true,
    },
  },
});
