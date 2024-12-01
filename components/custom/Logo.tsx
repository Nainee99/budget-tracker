import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Using the modified SVG */}
      <Image
        src="/icons/piggy-bank.svg"
        alt="FinFlow Logo"
        width={32}
        height={32}
      />
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
        FinFlow
      </h1>
    </div>
  );
};

export default Logo;
