export const getChangeLog = (content: string, version: string, prettier: boolean): string[] => {
  const lines = content.split('\n');
  const changeLog = [];
  const changeLogPre = [];
  const startPattern = new RegExp(`^## ${version}`);
  const stopPattern = /^## /; // 前一个版本
  const skipPattern = /^`/; // 日期

  let begin = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (begin && stopPattern.test(line)) {
      break;
    }
    if (begin && line && !skipPattern.test(line)) {
      let l = line;
      if (prettier) {
        if (line.startsWith('-')) l = `${line.replace('-', '◆')}\n`;
        if (line.startsWith('  -')) l = `${line.replace('  -', '\xa0\xa0\xa0\xa0◇')}\n`;
        l = `${l}\n`;
      }
      changeLogPre.push(l);
      changeLog.push(line);
    }
    if (!begin) {
      begin = startPattern.test(line);
    }
  }

  return [changeLog.join('\n'), changeLogPre.join('\n')];
};
