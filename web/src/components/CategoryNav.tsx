import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faWrench,
  faPuzzlePiece,
  faBox
} from '@fortawesome/free-solid-svg-icons';

interface Category {
  id: string;
  label: string;
  icon?: string;
}

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

/* ================= Icon Map ================= */

const ICON_MAP: Record<string, any> = {
  gear: faGear,
  wrench: faWrench,
  'puzzle-piece': faPuzzlePiece,
  default: faBox,
};

export default function CategoryNav({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider px-2">
        Categories
      </h3>

      <div className="flex flex-col gap-3 items-center">
        {categories.map((category) => {
          const icon =
            ICON_MAP[category.icon ?? 'default'] || ICON_MAP.default;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              title={category.label}
              className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gray-500/30 shadow-lg shadow-gray-500/10'
                  : 'bg-zinc-800/40 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-gray-500/30'
              }`}
            >
              <FontAwesomeIcon
                icon={icon}
                className="text-xl text-white transition-all duration-300 hover:scale-110"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
