import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { i18n, targetLang } from "@/i18n/setting";
import * as dotenv from "dotenv";
// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

export const translateComponent = async (componentName: string) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "locales",
      i18n.defaultLocale,
      `${componentName}.json`
    );
    const englishFileContent = fs.readFile(filePath, "utf-8");
    const englishData = JSON.parse(await englishFileContent);

    //Define the target languages
    const targetLocales = i18n.locales.filter(
      (locale) => locale !== i18n.defaultLocale
    );

    for (const locale of targetLocales) {
      // Ensure the directory exists
      const localeDir = path.join(process.cwd(), "src", "locales", locale);
      await fs.mkdir(localeDir, { recursive: true });

      // Translate the component data
      const translatedData = await translateObject(englishData, locale);

      const outputFilePath = path.join(localeDir, `${componentName}.json`);
      await fs.writeFile(
        outputFilePath,
        JSON.stringify(translatedData, null, 2),
        "utf-8"
      );
      console.log(
        `Translated ${componentName} to ${locale} and saved to ${outputFilePath}`
      );
    }
  } catch (error) {
    console.error(`Error translating ${componentName}:`, error);
  }
};

const translateObject = async (
  data: any,
  targetLanguage: keyof typeof targetLang
): Promise<any> => {
  if (typeof data === "string") {
    return await translateText(data, targetLanguage);
  }

  if (Array.isArray(data)) {
    const result = [];
    for (const item of data) {
      result.push(await translateObject(item, targetLanguage));
    }
    return result;
  }

  if (typeof data === "object" && data !== null) {
    const result: Record<string, any> = {};
    for (const key in data) {
      result[key] = await translateObject(data[key], targetLanguage);
    }
    return result;
  }

  return data; // Return the data as is if it's not a string, array, or object
};

const translateText = async (
  text: string,
  targetLanguage: keyof typeof targetLang
) => {
  const url = "https://api-free.deepl.com/v2/translate";

  const apiKey = process.env.DEEPL_API_KEY;

  if (!apiKey) {
    throw new Error("DEEPL_API_KEY is not configured");
  }

  try {
    const response = await axios.post(
      url,
      {
        text: [text],
        target_lang: targetLang[targetLanguage],
      },
      {
        headers: {
          Authorization: `DeepL-Auth-Key ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.translations[0].text;
  } catch (error) {
    console.error(
      `Error translating text "${text}" to ${targetLanguage}:`,
      error
    );
    throw error;
  }
};
