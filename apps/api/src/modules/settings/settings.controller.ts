import type { Request, Response } from "express";
import { updateSettingSchema } from "./settings.schemas.js";
import * as settingsService from "./settings.service.js";

export async function listSettingsHandler(_req: Request, res: Response) {
  res.json({ settings: await settingsService.listSettings() });
}

export async function getPublicSettingsHandler(_req: Request, res: Response) {
  res.json(await settingsService.getPublicSettings());
}

export async function updateSettingHandler(req: Request, res: Response) {
  const { value } = updateSettingSchema.parse(req.body);
  const setting = await settingsService.updateSetting(req.params.key!, value);
  res.json({ setting });
}
