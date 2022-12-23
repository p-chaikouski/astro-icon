import { promises as fs} from 'fs';
import { locate } from '@iconify/json';
import { getIconData, iconToSVG } from '@iconify/utils'

const packAliases = new Map([
  ["logo", "fa-brands"],
  ["radix", "radix-icons"],
]);

export default async function get(pack: string, name: string) { 
  if (packAliases.has(pack)) {
    pack = packAliases.get(pack)!;
  }

  // Locate icons
  const filename = locate(pack);

  // Load icon set
  const icons = JSON.parse(await fs.readFile(filename, 'utf8'));

  const iconData = getIconData(icons, name)
  if (!iconData) {
    throw new Error(`"${name}" does not exist`)
  }

  const renderData = iconToSVG(iconData)

  const svgAttributes: Record<string, string> = {
    'xmlns': 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    ...renderData.attributes,
 };
 const svgAttributesStr = Object.keys(svgAttributes)
    .map(
        (attr) =>
            // No need to check attributes for special characters, such as quotes,
            // they cannot contain anything that needs escaping.
            `${attr}="${svgAttributes[attr as keyof typeof svgAttributes]}"`
    )
    .join(' ');
 
 // Generate SVG
 return `<svg ${svgAttributesStr}>${renderData.body}</svg>`;
}