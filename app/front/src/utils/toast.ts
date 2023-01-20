import { Position, Toaster } from '@blueprintjs/core';

const toast = Toaster.create({
   position: Position.TOP_RIGHT,
   maxToasts: 3,
});

export default toast;

