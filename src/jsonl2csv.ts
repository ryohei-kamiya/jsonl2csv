import fs from 'fs';
import { stringify } from 'csv-stringify/sync';

export const jsonl2csv = (jsonlFilePath: string, csvFilePath: string, fields: string[]): void => {
  // JSON Linesファイルを行ごとに読み込む
  const lines = fs.readFileSync(jsonlFilePath, 'utf-8').split('\n').filter(Boolean);

  // 各行をJSONオブジェクトにパースする
  const jsonObjects = lines.map(line => JSON.parse(line));

  // JSONオブジェクトの配列をCSV形式の文字列に変換する
  const result = stringify(jsonObjects, {columns: fields, header: true});

  // 変換結果をファイルに出力する
  fs.writeFileSync(csvFilePath, result);
};