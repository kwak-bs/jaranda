export const IdNumberOrEng = (id) => {
  const regex = /[A-Za-z0-9]+/g;

  if (regex.test(id)) {
    return true;
  }
  return false;
};

export const Id4OrMoreDigits = (id) => {
  if (id.length >= 4) {
    return true;
  }
  return false;
};

export const IdSpecialChar = (id) => {
  const regex = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+/gi;
  if (regex.test(id)) {
    return true;
  }
  return false;
};

export const IdHangul = (id) => {
  const regex = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;
  if (regex.test(id)) {
    return false;
  }
  return true;
};

export const PwEnglish = (pw) => {
  const regex = /[A-Za-z]+/;
  if (regex.test(pw)) {
    return true;
  }
  return false;
};

export const PwNumber = (pw) => {
  const regex = /[0-9]+/;
  if (regex.test(pw)) {
    return true;
  }
  return false;
};

export const PwSpecialChar = (pw) => {
  const regex = /[!@#$%^*+=-]+/;
  if (regex.test(pw)) {
    return true;
  }
  return false;
};

export const Pw8OrMoreDigits = (pw) => {
  if (pw.length >= 8) {
    return true;
  }
  return false;
};
