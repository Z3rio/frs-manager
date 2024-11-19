import { Addon, File } from "../../../utils/types.js";

const files: File[] = [
  {
    name: "fxmanifest.lua",
    content: `shared_scripts({
    "shared/locale.lua",
    "locales/*.lua"
})`,
    comment: "Addon: Locales"
  },
  {
    name: "shared/locale.lua",
    content: `Locales = {}

function Translate(str, ...) -- Translate string
    if not str then
        error(("Resource ^5%s^7 You did not specify a parameter for the Translate function or the value is nil!"):format(GetInvokingResource() or GetCurrentResourceName()))
        return "Given translate function parameter is nil!"
    end
    if Locales[Config.Locale] then
        if Locales[Config.Locale][str] then
            return string.format(Locales[Config.Locale][str], ...)
        elseif Config.Locale ~= "en" and Locales["en"] and Locales["en"][str] then
            return string.format(Locales["en"][str], ...)
        else
            return "Translation [" .. Config.Locale .. "][" .. str .. "] does not exist"
        end
    elseif Config.Locale ~= "en" and Locales["en"] and Locales["en"][str] then
        return string.format(Locales["en"][str], ...)
    else
        return "Locale [" .. Config.Locale .. "] does not exist"
    end
end

function TranslateCap(str, ...) -- Translate string first char uppercase
    return _(str, ...):gsub("^%l", string.upper)
end

_ = Translate
-- luacheck: ignore _U
_U = TranslateCap`
  },
  {
    name: "locales/en.lua",
    content: `Locales["en"] = {

}`
  },
  {
    name: "config.lua",
    content: `Config.Locale = "en"`
  }
];

export default {
  label: "Locales",
  name: "locale",
  files: files,
  checkedByDefault: true
} as Addon;
