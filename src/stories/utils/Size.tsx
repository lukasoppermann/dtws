import React from 'react';
import size from "../../../dist/docs/size.json"
import { cssVarName } from './cssVarName';

export const BaseSize = () => {
  const baseSize = Object.values(size).filter(item => item.name.startsWith('base.size'));
  return <table>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Value</th>
      <th>Description</th>
    </tr>
    {baseSize.map((item) => (
    <tr>
      <td><div className='size-box' style={{width: item.$value, height: item.$value}}></div></td>
      <td>{cssVarName(item.name)}</td>
      <td>{item.$value}</td>
      <td>{item.$description || ''}</td>
    </tr>
  ))}
  </table>
};

export const Padding = () => {
  const baseSize = Object.values(size).filter(item => item.name.startsWith('padding'));
  return <table>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Value</th>
      <th>Description</th>
    </tr>
    {baseSize.map((item) => (
    <tr>
      <td><div className='size-box' style={{width: item.$value, height: item.$value}}></div></td>
      <td>{cssVarName(item.name)}</td>
      <td>{item.$value}</td>
      <td>{item.$description || ''}</td>
    </tr>
  ))}
  </table>
};

export const Margin = () => {
  const baseSize = Object.values(size).filter(item => item.name.startsWith('margin'));
  return <table>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Value</th>
      <th>Description</th>
    </tr>
    {baseSize.map((item) => (
    <tr>
      <td><div className='size-box' style={{width: item.$value, height: item.$value}}></div></td>
      <td>{cssVarName(item.name)}</td>
      <td>{item.$value}</td>
      <td>{item.$description || ''}</td>
    </tr>
  ))}
  </table>
};
