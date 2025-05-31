export const iconWhitelist = {
  phone: "flowbite:phone-solid",
  location: "flowbite:map-pin-alt-solid",
  whatsapp: "flowbite:whatsapp-solid",
  male: "round-male",
  female: "round-female",
  weight: "round-weight",
  height: "flowbite:arrow-up-down-solid",
  length: "flowbite:arrow-right-arrow-left-solid",
  calendar: "round-calendar",
  telegram: "brands/telegram",
  email: "flowbite:envelope-solid",
  message: "flowbite:messages-solid"
} as const

export type IconKey = keyof typeof iconWhitelist
