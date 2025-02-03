// export const emailRegex =
//   /^(?!.*\.\.)(?!.*\.$)(?!.*\.$)([a-zA-Z0-9!#%*+=’_-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})$/;

export const emailRegex =
  /^(?!.*\.\.)(?!^\.)[a-zA-Z0-9!#%*+=’_-]{1,}(?:\.[a-zA-Z0-9!#%*+=’_-]+)*[a-zA-Z0-9!#%*+=’_-]@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

export const emailRuByRegex = /(?<!\.ru|\.by)$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=\S)[A-Za-z\d!@#$%^&*]{8,14}$/;

export const textContactUsRegex =
  /^(?!.*[ЁёЫыЭэЪъ])(?!(?:.*?[<>"'`/\\|]){5,})[\wа-яА-Я\s,.!?;:()\[\]{}@#$%^&*+=~\-]{10,4000}$/;

export const nameRegex = /^(?!.*[ЁёЫыЭэЪъ])[A-Za-zА-Яа-я’`’\-\s]{2,30}$/;
