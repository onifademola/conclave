export const ExtractInitials = (email) => {
  if (!email) return "";
  const indexOfAt = email.indexOf("@");
  const subName = email.slice(indexOfAt + 1);
  return email.charAt(0).concat(subName.charAt(0)).toUpperCase();
};
