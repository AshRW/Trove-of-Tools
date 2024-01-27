const TOOLS_BASE_PATH = "tools";
const TOOLS_LIST: {
  name: string;
  link: string;
  underConstruction?: boolean;
}[] = [
  {
    name: "CSV To JSON Converter",
    link: `${TOOLS_BASE_PATH}/csv-to-json`,
  },
  {
    name: "Guitar Tuner",
    link: `${TOOLS_BASE_PATH}/guitar-tuner`,
  },
  {
    name: "Lorem Ipsum Generator",
    link: `${TOOLS_BASE_PATH}/lorem-ipsum-generator`,
  },
  {
    name: "DNS Resolver",
    link: `${TOOLS_BASE_PATH}/dns-resolver`,
  },
  {
    name: "IP Checker",
    link: `${TOOLS_BASE_PATH}/ip-checker`,
  },
  {
    name: "MailMan Client",
    link: `${TOOLS_BASE_PATH}/mailman`,
    underConstruction: true,
  },
  // {
  //   name: "<Tests&Trials>",
  //   link: `/trials`,
  //   underConstruction: true,
  // },
];

export { TOOLS_LIST };
