interface RoleCardProps {
  role: string;
  description: string;
  imagePath: string;
  hoverColor: string;
  bgColor: string;
  onClick: () => void;
}

const RoleCard = ({
  role,
  description,
  imagePath,
  hoverColor,
  bgColor,
  onClick,
}: RoleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-${hoverColor} active:scale-[0.98] overflow-hidden cursor-pointer`}
    >
      <div className={`${bgColor} flex items-center justify-center p-6`}>
        <img
          src={imagePath}
          alt={`${role} illustration`}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="py-6">
        <p
          className={`text-2xl font-bold text-textColor group-hover:text-${hoverColor} transition-colors`}
        >
          {role}
        </p>
        <p className="text-sm text-secondarytext mt-1 px-4">{description}</p>
      </div>
    </button>
  );
};

export default RoleCard;
