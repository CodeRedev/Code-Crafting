
interface Category {
  id: string;
  label: string;
  icon?: string; // example: "fa-solid fa-gear"
}

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

/* ================= Icon Map ================= */


const DEFAULT_ICON = 'fa-solid fa-box';


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
          const icon = category.icon ?? DEFAULT_ICON;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              title={category.label}
              className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-zinc-100/30 shadow-lg shadow-gray-500/10'
                  : 'bg-zinc-800/40 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-gray-500/30'
              }`}
            >
              <i
                className={`${icon} text-xl text-white transition-all duration-300 hover:scale-110`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

