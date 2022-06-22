import { ref, onValue } from 'firebase/database';
import { db } from '../service/db-manipulations';
export let watch = null;
export let queue = null;

export function getDataFromFirebase(ev) {
  const watched = ref(db, `${ev}` + '/watched');
  const queued = ref(db, `${ev}` + '/queue');
  onValue(watched, snapshot => {
    const data = snapshot.val();
    data ? (watch = Object.values(data)) : (watch = false);
  });
  onValue(queued, snapshot => {
    const data = snapshot.val();
    data ? (queue = Object.values(data)) : (queue = false);
  });
}
