import { program } from 'commander';
import { jsonl2csv } from './jsonl2csv';

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

  jsonl2csv(jsonlFilePath, csvFilePath, fields);
};

main();

