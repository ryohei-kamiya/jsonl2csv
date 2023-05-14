import fs from 'fs';
import { stringify } from 'csv-stringify/sync';
import { program } from 'commander';


const main = (): void => {
  // コマンドラインオプションを解析
  program
    .option('-i, --input <path>', 'Input file path (JSON Lines format)')
    .option('-o, --output <path>', 'Output file path (CSV format)')
    .option('-f, --fields <items>', 'Specify order of fields', (value: string) => value.split(','))
    .parse(process.argv);

  const options = program.opts();

  // 入力ファイルと出力ファイルのパスを取得
  const jsonlFilePath = options.input;
  const csvFilePath = options.output;

  // フィールドの並び順を取得
  const fields = options.fields || [];

  // JSON Linesファイルを行ごとに読み込む
  const lines = fs.readFileSync(jsonlFilePath, 'utf-8').split('\n').filter(Boolean);

  // 各行をJSONオブジェクトにパースする
  const jsonObjects = lines.map(line => JSON.parse(line));

  // JSONオブジェクトの配列をCSV形式の文字列に変換する
  const result = stringify(jsonObjects, {columns: fields, header: true});

  // 変換結果をファイルに出力する
  fs.writeFileSync(csvFilePath, result);
};

main();

