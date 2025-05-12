export const iconWhitelist = {
  phone: "flowbite:phone-solid",
  location: "flowbite:map-pin-alt-solid",
  whatsapp: "flowbite:whatsapp-solid",
  male: "round-male",
  female: "round-female",
  weight: "round-weight",
  height: "round-height",
  calendar: "round-calendar",
  telegram: "brands/telegram",
} as const;

export type IconKey = keyof typeof iconWhitelist;
