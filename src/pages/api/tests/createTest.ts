import { TestSingleton } from "@/backend/infra/usecases/test-singleton";
import { ThemeSingleton } from "@/backend/infra/usecases/theme-singleton";
import { InformationSingleton } from "@/backend/infra/usecases/information-singleton";

export default async function handler(req: any, res: any) {
  const { infoId, themeId, type } = req.query;

  // console.log('infoId, themeId, type', infoId, themeId, type);

  // must have infoId OR themeId
  let queriedThemeId = themeId;
  let information;
  if (infoId) {
    // get information, get theme from information
    information = await InformationSingleton.getInstance().informationUseCases.findById(infoId);
    if (!information) {
      console.log('Information not found');
      return res.status(404).json({ error: 'Information not found' });
    } else {
      queriedThemeId = information.themeId;
    }
  }

  const theme = await ThemeSingleton.getInstance().themeUseCases.findById(queriedThemeId);
  if (!theme) {
    console.log('Theme not found');
    return res.status(404).json({ error: 'Theme not found' });
  }

  // create a generated test and save it
  const test = await TestSingleton.getInstance().testUseCases.create(type, theme);

  // set the information's testId and save it
  if (information && infoId && test) {
    information.testId = test.id;
    await InformationSingleton.getInstance().informationUseCases.update(information);
  }

  return res.status(200).json(test);
}