const dictionaries = {
  "en-US": () =>
    import("./../dictionaries/en.json").then((module) => module.default),
  "de-DE": () =>
    import("./../dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!locale || locale === undefined) {
    return dictionaries["en-US"]();
  } else {
    return dictionaries[locale as "en-US" | "de-DE"]();
  }
};
