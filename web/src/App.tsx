import React, { useState, useEffect } from 'react';
import CraftingHeader from './components/CraftingHeader';
import CategoryNav from './components/CategoryNav';
import CraftingGrid from './components/CraftingGrid';
import CraftDetails from './components/CraftDetails';
import i18n from "./store/i18n";

interface CraftItem {
  id: string;
  name: string;
  category: string;
  image: string;
  levelRequired: number;
  craftTime: number;
  materials: { name: string; quantity: number; image: string }[];
}

interface FiveMMaterial {
  [key: string]: number;
}

const isBrowser = !('GetParentResourceName' in window);

const fetchNui = async (event: string, data?: any) => {
  const resource = (window as any).GetParentResourceName?.();
  return fetch(`https://${resource}/${event}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data ?? {}),
  });
};

const DEBUG_DATA = {
  xp: 9300,
  expPerLevel: 1000,
  stationLabel: 'Weapon Workshop',
  userMaterials: {
    iron: 450,
    steel: 200,
    plastic: 80,
  },
  categories: [
    { id: 'weapon', label: 'Weapons' },
    { id: 'tools', label: 'Tools' },
    { id: 'attachments', label: 'Attachments' },
  ],
  items: [
    {
      id: 'weapon_pistol',
      name: 'WEAPON PISTOL',
      category: 'weapon',
      image: 'https://placehold.co/128x128?text=Pistol',
      levelRequired: 1,
      craftTime: 10,
      materials: [
        { name: 'iron', quantity: 100, image: 'https://placehold.co/32?text=Iron' },
        { name: 'steel', quantity: 50, image: 'https://placehold.co/32?text=Steel' },
      ],
    },
    {
      id: 'armor',
      name: 'ARMOR',
      category: 'tools',
      image: 'https://placehold.co/128x128?text=Armor',
      levelRequired: 2,
      craftTime: 15,
      materials: [
        { name: 'iron', quantity: 200, image: 'https://placehold.co/32?text=Iron' },
        { name: 'plastic', quantity: 50, image: 'https://placehold.co/32?text=Plastic' },
      ],
    },
    {
      id: 'clip_attachment',
      name: 'CLIP ATTACHMENT',
      category: 'attachments',
      image: 'https://placehold.co/128x128?text=Clip',
      levelRequired: 3,
      craftTime: 8,
      materials: [
        { name: 'steel', quantity: 80, image: 'https://placehold.co/32?text=Steel' },
        { name: 'plastic', quantity: 30, image: 'https://placehold.co/32?text=Plastic' },
      ],
    },
  ],
};



const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(isBrowser);

  const [craftingXP, setCraftingXP] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<CraftItem | null>(null);
  const [userMaterials, setUserMaterials] = useState<FiveMMaterial>({});
  const [isCrafting, setIsCrafting] = useState(false);
  const [craftProgress, setCraftProgress] = useState(0);
  const [craftQuantity, setCraftQuantity] = useState(1);
  const [expPerLevel, setExpPerLevel] = useState(1000);
  const [craftItems, setCraftItems] = useState<CraftItem[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; label: string }>>([]);
  const [stationLabel, setStationLabel] = useState('');

  useEffect(() => {
  const handler = (event: MessageEvent) => {
    if (event.data?.type === "setTranslations") {
      const translations = event.data.translations;
      i18n.addResourceBundle(i18n.language, "translation", translations, true, true);
      i18n.changeLanguage(i18n.language);
    }
  };
  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
}, []);


  /* ================= FiveM Messages ================= */

  useEffect(() => {
    if (isBrowser) return;

    const handleMessage = (event: MessageEvent) => {
      const { type, data } = event.data;

      switch (type) {
        case 'openCrafting':
          setIsOpen(true);
          break;
        case 'closeCrafting':
          setIsOpen(false);
          break;
        case 'updateUI':
          if (data.items) setCraftItems(data.items);
          if (data.categories) setCategories(data.categories);
          if (data.userMaterials) setUserMaterials(data.userMaterials);
          if (data.xp) setCraftingXP(data.xp);
          if (data.expPerLevel) setExpPerLevel(data.expPerLevel);
          if (data.stationLabel) setStationLabel(data.stationLabel); // new
          break;
        case 'craftingProgress':
          setCraftProgress(data.progress);
          if (data.progress >= 100) {
            setIsCrafting(false);
            setCraftProgress(0);
          }
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
  if (!isBrowser) return;

  setIsOpen(true);
  setCraftingXP(DEBUG_DATA.xp);
  setUserMaterials(DEBUG_DATA.userMaterials);
  setCategories(DEBUG_DATA.categories);
  setCraftItems(DEBUG_DATA.items);
}, []);



  /* ================= ESC Close ================= */

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        fetchNui('craft:close');
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  /* ================= Request Data ================= */
  useEffect(() => {
    if (!isBrowser) {
      fetchNui('craft:requestData');
    }
  }, []);

  /* ================= Craft ================= */
  const handleCraft = () => {
    if (!selectedItem || isCrafting) return;
    setIsCrafting(true);
    setCraftProgress(0);

    fetchNui('craft:start', {
      itemId: selectedItem.id,
      quantity: craftQuantity,
    });
  };

  if (!isOpen) return null;

  const filteredItems =
    selectedCategory === 'all'
      ? craftItems
      : craftItems.filter((i) => i.category === selectedCategory);
      
  const sortedItems = filteredItems.sort((a, b) => {
     if (a.levelRequired !== b.levelRequired) return a.levelRequired - b.levelRequired;
      return a.name.localeCompare(b.name);
  });

  const playerLevel = Math.floor(craftingXP / expPerLevel) + 1;
  const xpIntoLevel = craftingXP % expPerLevel;
  const xpPercentage = (xpIntoLevel / expPerLevel) * 100;


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/80">
      <div className="w-[90vw] max-w-7xl h-[85vh] bg-gradient-to-br bg-zinc-900/80 rounded-2xl overflow-hidden flex flex-col">
        <CraftingHeader level={playerLevel} xp={xpIntoLevel} xpPercentage={xpPercentage} stationLabel={stationLabel} />

        <div className="flex flex-1 gap-6 p-6 overflow-hidden">
          <div className="bg-zinc-800/30 rounded-lg p-2">
            <CategoryNav
              categories={[{ id: 'all', label: 'All Items' }, ...categories]}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className="flex-1 min-w-0">
            <CraftingGrid
              items={sortedItems}
              selectedItemId={selectedItem?.id}
              onSelectItem={(item) => {
                setSelectedItem(item);
                setCraftQuantity(1);
              }}
            />
          </div>

          <div className="w-96">
            {selectedItem && (
              <CraftDetails
                item={selectedItem}
                userMaterials={userMaterials}
                userLevel={playerLevel}
                onCraft={handleCraft}
                isCrafting={isCrafting}
                craftProgress={craftProgress}
                craftQuantity={craftQuantity}
                onQuantityChange={setCraftQuantity}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
