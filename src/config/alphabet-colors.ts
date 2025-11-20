export const avatarAlphabetColors: Record<string, string> = {
  A: "!bg-primary-1000",
  B: "!bg-primary-700",
  C: "!bg-primary-600",
  D: "!bg-primary-500",

  E: "!bg-[#2f7a4e]",
  F: "!bg-[#338a56]",
  G: "!bg-[#37995f]",
  H: "!bg-[#3ca967]",

  I: "!bg-[#1f6fa8]",
  J: "!bg-[#217bb8]",
  K: "!bg-[#2386c8]",
  L: "!bg-[#2491d8]",

  M: "!bg-pastel-d-01",
  N: "!bg-pastel-d-02",
  O: "!bg-pastel-d-03",
  P: "!bg-pastel-d-04",
  Q: "!bg-pastel-d-05",
  R: "!bg-pastel-d-06",

  S: "!bg-[#b77300]",
  T: "!bg-[#c57e00]",
  U: "!bg-[#d18900]",
  V: "!bg-[#de9400]",

  W: "!bg-[#c93c3c]",
  X: "!bg-[#d24a4a]",
  Y: "!bg-[#db5757]",
  Z: "!bg-[#e36464]",
};

export function getAvatarColor(name?: unknown): string {
  let text: string | undefined;
  if (typeof name === "string") text = name;
  else if (typeof name === "number") text = String(name);

  const firstLetter = text?.trim()?.[0]?.toUpperCase();
  return firstLetter && avatarAlphabetColors[firstLetter] ? avatarAlphabetColors[firstLetter] : "!bg-neutral-400";
}
