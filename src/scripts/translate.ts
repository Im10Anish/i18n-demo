import { translateComponent } from "@/app/utils/translate";

async function main() {
  const components = ["Home", "Features", "LanguageSelector"];

  for (const component of components) {
    await translateComponent(component);
    console.log(`Translation for ${component} completed.`);
  }
  console.log("Translation completed for all components.");
}

main().catch((error) => {
  console.error("Error during translation:", error);
});
