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
    modify(data: NotesArr_i['data'][0]) {
      const isDataExists = store.data().some((item) => item.id === data.id);
      const newValue = isDataExists
        ? store.data().map((item) => (item.id === data.id ? data : item)) // Update if found
        : [data, ...store.data()]; // Prepend new address if not found
      patchState(store, () => ({ data: newValue, count: 1 }));
    },
  }))
);
