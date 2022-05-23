import { HttpGet } from "./http";

export const ExtractInitials = (email) => {
  if (!email) return "";
  const indexOfStop = email.indexOf(".");
  const indexOfAt = email.indexOf("@");
  const subName = email.slice(
    (indexOfStop >= 0 && indexOfStop < indexOfAt) ? indexOfStop + 1 : indexOfAt + 1
  );
  return email.charAt(0).concat(subName.charAt(0)).toUpperCase();
};

export const isUrlImageValid = (imageUri) => {
  fetch(imageUri).then((res) => {
    return (res.status === 200);
  });
}
