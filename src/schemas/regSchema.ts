export const emailRegex =
  /^(?!.*\.\.)(?!^\.)[a-zA-Z0-9!#%*+=’_-]{1,}(?:\.[a-zA-Z0-9!#%*+=’_-]+)*[a-zA-Z0-9!#%*+=’_-]@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

export const emailRuByRegex = /(?<!\.ru|\.by)$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=\S)[A-Za-z\d!@#$%^&*]{8,}$/;

export const textContactUsRegex =
  /^(?!.*[ЁёЫыЭэЪъ])(?!(?:.*?[<>"'`\/\\|]){5,})[\wа-яА-ЯіІїЇєЄґҐ\s,.!?;:()\[\]{}@#$%^&*+=~\-]+$/;

// export const nameRegex =
//   /^(?!.*[ЁёЫыЭэЪъ`])([A-Za-zА-Яа-яІі’']+(-[A-Za-zА-Яа-яІі’']+)*\s?)*[A-Za-zА-Яа-яІі’']+(-[A-Za-zА-Яа-яІі’']+)*$/;
export const nameContactUsRegex =
  /^(?!.*[ЁёЫыЭэЪъ`])(?=[^’'])([A-Za-zА-Яа-яІі’']+(-[A-Za-zА-Яа-яІі’']+)*\s?)*[A-Za-zА-Яа-яІі’']+(-[A-Za-zА-Яа-яІі’']+)*(?<![’'])$/;

export const nameNoteRegex = /^(?!.*[ЁёЫыЭэЪъ])[\s\S]+$/u;
