import { EntitySchema } from 'typeorm';
import { Account } from '../../../domain/entity/account';

export const AccountSchema = new EntitySchema<Account>({
  name: 'accounts',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    client: {
      type: 'uuid',
      name: 'client_id',
    },
    balance: {
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
