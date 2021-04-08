import { createAction, props } from '@ngrx/store';
const actionName = (name: string) => `[APP] ${name}`;

export const routerNavigate = createAction(
  actionName('Route Change Request'),
  props<{ uri: string }>()
);
