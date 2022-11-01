import { atom } from 'recoil';

export const countState = atom({ key: 'count', default: 0 });
export const hoverState = atom({ key: 'hover', default: true });
