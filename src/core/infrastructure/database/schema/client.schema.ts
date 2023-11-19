import { EntitySchema } from 'typeorm';
import { Client } from '../../../domain/entity/client';

export const ClientSchema = new EntitySchema<Client>({
  name: 'clients',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
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
