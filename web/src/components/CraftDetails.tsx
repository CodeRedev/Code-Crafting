import { useTranslation } from "react-i18next";

interface Material {
  name: string;
  quantity: number;
  image: string;
}

interface CraftItem {
  id: string;
  name: string;
  category: string;
  image: string;
  levelRequired: number;
  craftTime: number;
  materials: Material[];
}

interface CraftDetailsProps {
  item: CraftItem;
  userMaterials: Record<string, number>;
  userLevel: number;
  onCraft: () => void;
  isCrafting?: boolean;
  craftProgress?: number;
  craftQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

export default function CraftDetails({
  item,
  userMaterials,
  userLevel,
  onCraft,
  isCrafting = false,
  craftProgress = 0,
  craftQuantity = 1,
  onQuantityChange = () => {},
}: CraftDetailsProps) {
  const { t } = useTranslation();

  const canCraft =
    userLevel >= item.levelRequired &&
    item.materials.every(
      (mat) => (userMaterials[mat.name] || 0) >= mat.quantity * craftQuantity
    );

  const hasLevel = userLevel >= item.levelRequired;

  return (
    <div className="flex flex-col gap-4 h-full bg-zinc-800/30 rounded-lg p-5 overflow-y-auto custom-scrollbar" >
      {/* Item Header */}
      <div className="flex flex-col gap-3">
        <div className="relative h-32 rounded-lg overflow-hidden bg-zinc-800/60 flex items-center justify-center">
          <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-zinc-100">{item.name}</h3>
        </div>
      </div>

      {/* Level Requirement */}
      <div className="px-3 py-2 bg-zinc-900/40 rounded flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-300">{t('level_required')}</span>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${hasLevel ? 'text-gray-400' : 'text-red-400'}`}>
            {item.levelRequired}
          </span>
          {!hasLevel && <span className="text-xs text-red-400 font-semibold">{t('too_low')}</span>}
        </div>
      </div>

      {/* Craft Time */}
      <div className="px-3 py-2 bg-zinc-900/40 rounded flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-300">{t('craft_time')}</span>
        <span className="text-sm font-mono text-gray-400">{item.craftTime * craftQuantity}s</span>
      </div>

      {/* Quantity */}
      <div className="px-3 py-2 bg-zinc-900/40 rounded flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-300">{t('quantity')}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(Math.max(1, craftQuantity - 1))}
            disabled={isCrafting}
            className="w-6 h-6 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 rounded text-xs text-gray-300 flex items-center justify-center"
          >
            −
          </button>
          <span className="text-sm font-mono text-gray-400 w-8 text-center">{craftQuantity}</span>
          <button
            onClick={() => onQuantityChange(craftQuantity + 1)}
            disabled={isCrafting}
            className="w-6 h-6 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 rounded text-xs text-gray-300 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Materials Section */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">{t('required_materials')}</h4>
        <div className="flex flex-col gap-2">
          {item.materials.map((material) => {
            const owned = userMaterials[material.name] || 0;
            const required = material.quantity * craftQuantity;
            const hasEnough = owned >= required;

            return (
              <div key={material.name} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded overflow-hidden bg-zinc-800 flex-shrink-0">
                  <img src={material.image} alt={material.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-200 truncate">{material.name}</p>
                  <p className={`text-xs font-mono mt-0.5 ${hasEnough ? 'text-gray-400' : 'text-red-400'}`}>
                    {owned}/{required}
                  </p>
                </div>

                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: hasEnough ? '#9ca3af' : '#ef4444',
                    boxShadow: hasEnough ? '0 0 8px #9ca3af' : '0 0 8px #ef4444',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Craft Button / Progress Bar */}
      {isCrafting ? (
        <div className="flex flex-col gap-2 mt-auto">
          <div className="w-full bg-zinc-700 rounded-lg h-8 overflow-hidden border border-zinc-600">
            <div
              className="h-full bg-gradient-to-r from-gray-600 to-gray-500 transition-all duration-100"
              style={{ width: `${craftProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 text-center font-mono">{Math.round(craftProgress)}%</p>
        </div>
      ) : (
        <button
          onClick={onCraft}
          disabled={!canCraft}
          className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-200 mt-auto ${
            canCraft
              ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-lg shadow-gray-500/50 hover:shadow-xl hover:shadow-gray-500/70 hover:from-gray-500 hover:to-gray-400 active:scale-95'
              : 'bg-zinc-700/50 text-zinc-500 cursor-not-allowed'
          }`}
        >
          {!hasLevel
            ? `${t('level_required')} ${item.levelRequired}`
            : !item.materials.every((mat) => (userMaterials[mat.name] || 0) >= mat.quantity * craftQuantity)
            ? t('insufficient_materials')
            : t('craft_item')}
        </button>
      )}
    </div>
  );
}
