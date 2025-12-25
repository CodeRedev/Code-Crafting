interface CraftItem {
  id: string;
  name: string;
  category: string;
  image: string;
  levelRequired: number;
  craftTime: number;
  materials: { name: string; quantity: number; image: string }[];
}

interface CraftingGridProps {
  items: CraftItem[];
  selectedItemId?: string;
  onSelectItem: (item: CraftItem) => void;
}

export default function CraftingGrid({
  items,
  selectedItemId,
  onSelectItem,
}: CraftingGridProps) {
  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(161, 140, 120, 0.6);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(161, 140, 120, 0.9);
        }
      `}</style>
      <div className="flex flex-col gap-4 overflow-y-auto bg-zinc-800/30 rounded-lg p-4 custom-scrollbar h-full">
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            className={`group relative rounded-lg overflow-hidden transition-all duration-200 ${
              selectedItemId === item.id
                ? 'ring-2 ring-gray-400'
                : ''
            }`}
          >
            <div className="relative h-40 bg-zinc-800 overflow-hidden items-center justify-center flex">
              
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
              />
              

              {/* Level Badge */}
              <div className="absolute top-2 right-2 px-2 py-1 bg-zinc-900/80 backdrop-blur-sm rounded flex items-center gap-1">
                <span className="text-xs font-bold text-gray-400">Lvl</span>
                <span className="text-xs font-bold text-zinc-100">{item.levelRequired}</span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center">
                <div className="text-gray-400 font-semibold text-sm">View Details</div>
              </div>
            </div>

            {/* Item Info */}
            <div className="p-3 bg-zinc-800/50 group-hover:bg-zinc-800 transition-colors">
              <p className="text-sm font-semibold text-zinc-100 truncate">{item.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
    </>
  );
}
