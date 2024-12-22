import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { NotesArr_i } from './table.component';

const initialState: NotesArr_i = {
  data: [],
  count: 0,
};

export const TableStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    init(data: NotesArr_i) {
      patchState(store, () => data);
    },
    modify(
      action: 'create' | 'update' | 'delete',
      data: NotesArr_i['data'][0]
    ) {
      switch (action) {
        case 'create':
          patchState(store, (state) => ({
            data: [data, ...state.data],
            count: state.count + 1,
          }));
          break;

        case 'update':
          const updatedData = store
            .data()
            .map((item) => (item.id === data.id ? { ...item, ...data } : item));
          patchState(store, () => ({
            data: updatedData,
          }));
          break;

        case 'delete':
          const dataAfterDelete = store
            .data()
            .filter((item) => item.id !== data.id);
          patchState(store, (state) => ({
            data: dataAfterDelete,
            count: state.count > 0 ? state.count - 1 : 0, // Ensure count doesn't go below 0
          }));
          break;
      }
    },
  }))
);
