'use client';

import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('./modal').then((mod) => mod.default), {
  ssr: false,
});

export default Modal;
