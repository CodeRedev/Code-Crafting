import { useTranslation } from "react-i18next";

interface CraftingHeaderProps {
  level: number;
  xp: number;
  xpPercentage: number;
  stationLabel: string;
}

export default function CraftingHeader({ level, xp, xpPercentage, stationLabel }: CraftingHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-zinc-900/80 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-zinc-800/30 rounded-lg flex items-center justify-center shadow-lg border border-zinc-800/30">
            <svg className="w-8 h-8 text-zinc-100" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">{stationLabel}</h1>
          </div>
        </div>

        {/* XP Progress Bar - Middle */}
        <div className="flex flex-col gap-1.5 flex-1 mx-8">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-zinc-300">{t('experience')}</p>
            <p className="text-xs text-gray-400 font-mono">{xp.toLocaleString()} / 1000 XP</p>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gray-500 to-gray-400 transition-all duration-300 rounded-full shadow-lg shadow-gray-500/50"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>

        <div className="w-14 h-14 bg-zinc-800/30 rounded-lg flex flex-col items-center justify-center shadow-lg border border-zinc-800/30">
          <span className="text-xs font-black text-zinc-100 leading-none">LV</span>
          <span className="text-lg font-black text-zinc-100 leading-none">{level}</span>
        </div>
      </div>
    </div>
  );
}
