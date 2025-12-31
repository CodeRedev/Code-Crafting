import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      level_required: "Level Required",
      too_low: "Too Low",
      craft_time: "Craft Time",
      quantity: "Quantity",
      required_materials: "Required Materials",
      craft_item: "Craft Item",
      insufficient_materials: "Insufficient Materials",
      component: "Component",
    },
  },
  ar: {
    translation: {
      level_required: "المستوى المطلوب",
      too_low: "منخفض جدًا",
      craft_time: "مدة الصنع",
      quantity: "الكمية",
      required_materials: "المواد المطلوبة",
      craft_item: "اصنع العنصر",
      insufficient_materials: "مواد غير كافية",
      component: "مكون",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",           // default language
  fallbackLng: "en",   // fallback
  interpolation: { escapeValue: false },
});

export default i18n;
