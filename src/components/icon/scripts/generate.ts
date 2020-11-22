import fs from 'fs';
import path from 'path';

const ComponentTemplate = `/* generated by ./scripts/generate.ts, do not edit manually */

import React, { ForwardRefRenderFunction, forwardRef } from 'react'
import {{IconName}}SVG from '../svg/{{IconName}}.svg'
import BaseIcon, {BaseIconProps} from './BaseIcon'

interface IconProps extends Omit<BaseIconProps, 'Icon'> {}

const {{IconName}}: ForwardRefRenderFunction<any, IconProps> = (
  props,
  ref
) => {
  return (
    <BaseIcon {...props} ref={ref} Icon={{{IconName}}SVG}/>
  )
}

const {{IconName}}Icon = forwardRef({{IconName}})

export default {{IconName}}Icon
`;

const readSVGFileNames = () => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path.resolve(__dirname, '../svg'), (err, files) => {
      err ? reject(err) : resolve(files);
    });
  });
};

const writeComponent = (fileName: string) => {
  return new Promise((resolve, reject) => {
    const [name] = fileName.split('.');
    const componentPath = path.resolve(__dirname, `../components/${name}.tsx`);
    if (!fs.existsSync(componentPath)) {
      fs.openSync(componentPath, 'w');
    }
    fs.writeFile(componentPath, ComponentTemplate.replace(/{{IconName}}/g, name), 'utf-8', (err) => {
      err ? reject(err) : resolve(1);
    });
  });
};

const writeComponents = (files: string[]) => {
  return new Promise(async (resolve) => {
    for (const file of files) {
      await writeComponent(file);
    }
    resolve(1);
  });
};

const writeExportFile = (files: string[]) => {
  const start = `/* generated by ./scripts/generate.ts, do not edit manually */\n`;
  const content = files.reduce((prevValue, curValue) => {
    const [name] = curValue.split('.');
    return prevValue + `export {default as ${name}} from './${name}' \n`;
  }, start);
  fs.writeFileSync(path.resolve(__dirname, '../components/index.ts'), content, 'utf-8');
};

readSVGFileNames().then(async (files) => {
  await writeComponents(files);
  writeExportFile(files);
});
