import { InformationSingleton } from '@/backend/infra/usecases/information-singleton';

export default async function handler(req: any, res: any) {
  const { themeId } = req.query;
  console.log('getInformation', themeId);

  const information = await InformationSingleton.getInstance().informationUseCases.findByTheme(themeId);
  res.status(200).json(information);
}