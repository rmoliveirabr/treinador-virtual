import { InformationSingleton } from "@/backend/infra/usecases/information-singleton";
import { ThemeSingleton } from "@/backend/infra/usecases/theme-singleton";

export default async function handler(req: any, res: any) {
  const { themeId } = req.query;

  // get theme from themeId or the active one
  let theme;

  if (themeId) {
    theme = await ThemeSingleton.getInstance().themeUseCases.findById(themeId);
  } else {
    // TODO: remove this, it's a workaround to get only the first active theme (since we'll be able to have multiple themes)
    const themes = await ThemeSingleton.getInstance().themeUseCases.getActive();
    theme = themes[0];
  }

  if (!theme) {
    return res.status(404).json({ error: 'Theme not found' });
  }

  // get history, filter by themeId
  let history = await InformationSingleton.getInstance().informationUseCases.getAll();
  history = history.filter(info => info.themeId === themeId);

  // generate information
  const information = await InformationSingleton.getInstance().informationUseCases.generate(theme, history);

  return res.status(200).json(information);
}