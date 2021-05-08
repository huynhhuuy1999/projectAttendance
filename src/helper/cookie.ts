export const setCookie = (day: number, value?: string, key?: string, domain?: string) => {
  let now = new Date();
  let time = now.getTime();
  let expireTime = time + day * 86400 * 1000;
  now.setTime(expireTime);

  let domainString;
  if (domain) {
    domainString = `;domain=.${domain}`;
  } else {
    domainString = ``;
  }

  document.cookie = `${key}=${value};expires=${now.toUTCString()}${domainString};path=/`;
};

export const deteletAllCookie = () => {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++)
    setCookie(1, "", cookies[i].split("=")[0]);
};

export const readCookie = (name: any) => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

