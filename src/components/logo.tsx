import Image from 'next/image';

export const Logo = () => (
  <div className="flex items-center gap-2">
    <Image src="/logo.svg" alt="Daylik" width={36} height={36} />
    <p className="text-xl font-bold">Daylik</p>
  </div>
);
