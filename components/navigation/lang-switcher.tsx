"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Dropdown = ({ items, onSelect, redirectTarget, selectedLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    onSelect(item);
    toggleDropdown();
  };

  return (
    <div className="relative inline-flex">
      <button
        onClick={toggleDropdown}
        className="text-gray-700 py-2 pl-4 rounded inline-flex items-center"
      >
      <span className="px-1">{selectedLanguage === "en-US" ? "🇬🇧" : "🇩🇪"}</span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12.59l-6.3-6.3a1 1 0 0 0-1.4 1.42l7 7a1 1 0 0 0 1.4 0l7-7a1 1 0 1 0-1.4-1.42L10 12.59z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute bg-white border rounded shadow-md mt-2 py-2 px-4 left-0 top-8 w-full">
          {items.map((item, index) => (
            <Link
              key={index}
              onClick={() => handleSelect(item)}
              className="block text-gray-700 hover:bg-gray-200 py-1 px-1 cursor-pointer w-full"
              locale={item}
              href={redirectTarget(item)}
            >
              {item.split("-")[0]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const LangSwitcher = ({ locale }: { locale: string }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(locale);
  const pathname = usePathname();

  const redirectTarget = (item) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = item;
    return segments.slice(0,2).join("/");
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="flex items-center gap-1 font-semibold">
      <Dropdown 
        items={["en-US", "de-DE"]} 
        onSelect={handleLanguageSelect} 
        redirectTarget={redirectTarget} 
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
};

export default LangSwitcher;
